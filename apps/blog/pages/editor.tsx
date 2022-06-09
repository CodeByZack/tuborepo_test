import React, { useRef, useState } from 'react';
import { KEditor } from 'ui';
import { evaluateMdx } from 'utils';
import { MoreVertical } from '@geist-ui/icons';
import {
  GeistProvider,
  CssBaseline,
  Avatar,
  Tooltip,
  Text,
  Button,
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
import readingTime from '../utils/read-time';

interface IProps {}

const BlogEditor = (props: IProps) => {
  const valueRef = useRef('');
  const [mdxComp, setMdxComp] = useState<{
    comp: MDXContent;
    postInfo: Partial<IArticleDetail>;
  }>({
    comp: undefined,
    postInfo: {},
  });

  const router = useRouter();
  console.log(router);

  const handleChange = useDebounceFn(
    async (v: string) => {
      valueRef.current = v;
      const { data, content } = matter(v);
      const res = await evaluateMdx(content, {
        ...runtime,
        ...provider,
      } as any);
      setMdxComp({ comp: res.default, postInfo: { ...data, readingTime : readingTime(content) } });

      // /**
      //  * 下面这种方式
      //  * 1. 运行时编译mdx。
      //  * 2. 拿上一步的结果，拼凑完整的html
      //  * 3. 在html里，使用 script module 引入 react react-dom 等库，以及样式
      //  * 4. mdx中所使用的组件也需要通过script module形式引入
      //  * 5. 上一步的难点在于 现在很多组件库都不支持script module引入，就算支持也很麻烦，如果没有依赖纯手写还可以。
      //  * */
      // const mdxStr = await compileMdx(valueRef.current);
      // const htmlContent = createHtml({ mdxStr });
      // console.log({ mdxStr, htmlContent });
      // setSrcDoc(htmlContent);
    },
    1000,
    true,
  );

  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <NextSeo title={`博客编辑器 – 行者、空山`} description={'博客编辑器'} />
      <div className="w-screen h-screen bg-[#1e1e1e] overflow-hidden">
        <div className="h-full">
          <div className="flex items-center justify-between h-[38px] b-y-1 b-[#404040] p-1 box-border">
            <div className="flex items-center">
              <Avatar w="25px" h="25px" text="K" mr="8px" />
              <Text margin={0} font="1rem" b>
                Blog Editor
              </Text>
            </div>
            <Tooltip
              portalClassName="w-[100px!important]"
              trigger="click"
              placement="bottomEnd"
              text={'目录'}
            >
              <Button
                type="abort"
                icon={<MoreVertical />}
                auto
                onClick={() => {
                  // repoUtil.init();
                  // repoUtil.getRepo();
                }}
              />
            </Tooltip>
          </div>
          <div style={{ height: 'calc(100% - 38px)' }}>
            <Splitter>
              <div className="h-full w-full">
                <KEditor onChange={handleChange} />
              </div>
              <div className="h-full w-full overflow-auto">
                <MDXPreview MdxComp={mdxComp} />
              </div>
            </Splitter>
          </div>
        </div>
      </div>
    </GeistProvider>
  );
};
export default BlogEditor;
