import React, { useEffect, useRef, useState } from 'react';
import { KEditor } from 'ui';
import { evaluateMdx } from 'utils';
import { MoreVertical } from '@geist-ui/icons';
import {
  Avatar,
  Text,
  Button,
  Display,
  useToasts,
  Loading,
  Popover,
  Code,
  Spacer,
} from '@geist-ui/core';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import useDebounceFn from '../hooks/useDebounceFn';
import MDXPreview from '../components/MDXPreview';
import * as runtime from 'react/jsx-runtime';
import * as provider from '@mdx-js/react';
import { MDXContent } from 'mdx/types';
import { Splitter } from '../components/WrapperSplitter';
import matter from 'gray-matter';
import { IArticleDetail } from '../type';
import { signIn, useSession } from 'next-auth/react';
import readingTime from '../utils/read-time';
import repoUtil from 'utils/github-utils';
import { Monaco, OnMount } from '@monaco-editor/react';
import { registerAutoCompletion } from '../utils/configEditor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import showNewPostModal from '../components/NewPostModal';
import dayjs from 'dayjs';

interface IProps {}

const templateValue = (data) => `---
title: '${data.title}'
publishedAt: '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'
updatedAt: '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'
summary: '${data.desc}'
---`;

const BlogEditor = (props: IProps) => {
  const valueRef = useRef('');
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const { setToast: showToast } = useToasts({ placement: 'topRight' });
  const dataHolder = useRef<{
    editPost: any;
    editor: monaco.editor.IStandaloneCodeEditor;
    monaco: Monaco;
  }>({
    editPost: {},
    editor: null,
    monaco: null,
  });
  const [mdxComp, setMdxComp] = useState<{
    comp: MDXContent;
    postInfo: Partial<IArticleDetail>;
  }>({
    comp: null,
    postInfo: {},
  });

  const router = useRouter();
  const { query } = router;
  const { path } = query;

  useEffect(() => {
    if (!editorReady) return;
    if (!session?.accessToken) return;
    repoUtil.init(session.accessToken as string);
    if (path) {
      editPost(path as string);
    } else {
      newAdd();
    }
  }, [path, session?.accessToken, editorReady]);

  console.log(router);

  const handleChange = useDebounceFn(async (v: string) => {
    const { data, content } = matter(v);
    console.log({ data, content });
    let comp = null;
    if (content) {
      comp = await evaluateMdx(content, {
        ...runtime,
        ...provider,
      } as any);
    }
    setMdxComp({
      comp: comp?.default,
      postInfo: { ...data, readingTime: readingTime(content) },
    });

    // /**
    //  * ??????????????????
    //  * 1. ???????????????mdx???
    //  * 2. ???????????????????????????????????????html
    //  * 3. ???html???????????? script module ?????? react react-dom ?????????????????????
    //  * 4. mdx????????????????????????????????????script module????????????
    //  * 5. ???????????????????????? ?????????????????????????????????script module???????????????????????????????????????????????????????????????????????????
    //  * */
    // const mdxStr = await compileMdx(valueRef.current);
    // const htmlContent = createHtml({ mdxStr });
    // console.log({ mdxStr, htmlContent });
    // setSrcDoc(htmlContent);
  }, 1000);

  const handleEditorMount: OnMount = (editor, monaco) => {
    dataHolder.current.editor = editor;
    dataHolder.current.monaco = monaco;
    // ??????????????????
    registerAutoCompletion(monaco);
    setEditorReady(true);
  };
  const newAdd = async () => {
    const info: any = await showNewPostModal({});
    const content = templateValue({
      title: info.title,
      desc: info.desc,
    });
    dataHolder.current.editor.setValue(content);
    dataHolder.current.editPost = {
      path: info.path,
      content,
    };
  };

  const editPost = async (filePath: string) => {
    try {
      setLoading(true);
      const res = await repoUtil.getRepoFile(filePath);
      dataHolder.current.editPost = res;
      dataHolder.current.editor.setValue(res.content);
    } catch (error) {
      showToast({ text: JSON.stringify(error), type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const savePost = async () => {
    const { path, sha } = dataHolder.current.editPost;
    try {
      setLoading(true);
      const res = await repoUtil.updateRepoFile({
        path,
        sha: sha || undefined,
        content: valueRef.current,
      });
      dataHolder.current.editPost.sha = res.data.content.sha;
      setLoading(false);
      showToast({ text: '???????????????' });
    } catch (error) {
      showToast({ text: JSON.stringify(error), type: 'error' });
    }
  };

  return (
    <>
      <NextSeo title={`??????????????? ??? ???????????????`} description={'???????????????'} />
      <div className="w-screen h-screen bg-[#1e1e1e] overflow-hidden">
        <div className="h-full">
          <div className="flex items-center justify-between h-[38px] b-y-1 b-[#404040] p-1 box-border">
            <div className="flex items-center">
              <Avatar w="25px" h="25px" text="K" mr="8px" />
              <Text margin={0} font="1rem" b>
                Blog Editor
                <Spacer inline w={1} />
                <Code>{`path : ${dataHolder.current.editPost.path}`}</Code>
              </Text>
            </div>
            <Popover
              placement="bottomEnd"
              content={
                <div style={{ width: 80 }}>
                  <Popover.Item>
                    <div
                      onClick={() => {
                        savePost();
                      }}
                      className="w-full cursor-pointer text-center"
                    >
                      ??????
                    </div>
                  </Popover.Item>
                  <Popover.Item line />
                  <Popover.Item>
                    <div className="w-full cursor-pointer text-center">
                      ??????
                    </div>
                  </Popover.Item>
                </div>
              }
            >
              <Button type="abort" icon={<MoreVertical />} auto />
            </Popover>
          </div>
          <div style={{ height: 'calc(100% - 38px)' }}>
            <Splitter>
              <div className="h-full w-full">
                <KEditor
                  onChange={(v) => {
                    valueRef.current = v;
                    handleChange(v);
                  }}
                  onMount={handleEditorMount}
                />
              </div>
              <div className="h-full w-full overflow-auto">
                <MDXPreview MdxComp={mdxComp} />
              </div>
            </Splitter>
          </div>
        </div>
      </div>
      {(loading || !editorReady) && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-60 bg-black flex justify-center items-center">
          <Loading>?????????</Loading>
        </div>
      )}
      {!session && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-60 bg-black flex justify-center items-center">
          <Display shadow caption="??????????????????????????????github???">
            <Button onClick={() => signIn()}>??????</Button>
          </Display>
        </div>
      )}
    </>
  );
};
export default BlogEditor;
