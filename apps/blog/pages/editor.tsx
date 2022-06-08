import React, { useRef, useState } from 'react';
import { KEditor, KPreview } from 'ui';
// import { KPreview } from 'ui/KPreview';

import { compileMdx, createHtml, evaluateMdx } from 'utils';
import { MoreVertical, Sidebar } from '@geist-ui/icons';
import repoUtil from 'utils/github-utils';
import {
  GeistProvider,
  CssBaseline,
  Avatar,
  Tree,
  Tabs,
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

interface IProps {}

const BlogEditor = (props: IProps) => {
  const valueRef = useRef('');
  // const [srcDoc, setSrcDoc] = useState('');
  const [mdxComp, setMdxComp] = useState<{ comp: MDXContent }>({
    comp: undefined,
  });

  const router = useRouter();
  console.log(router);

  // const debounceSet = useDebounceFn(setMdxComp);

  const handleChange = async (v: string) => {
    valueRef.current = v;
    // setSrcDoc(v);
    const res = await evaluateMdx(v, { ...runtime, ...provider } as any);
    setMdxComp({ comp: res.default });

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
  };

  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <NextSeo title={`博客编辑器 – 行者、空山`} description={'博客编辑器'} />
      <div className="w-screen h-screen bg-[#1e1e1e] overflow-hidden">
        {/* <Splitter initialSizes={[15, 100]} minWidths={[180, 1000]}>
          <div className="h-full">
            <div className="flex items-center justify-between h-[38px] b-y-1 b-[#404040] p-1 box-border">
              <div className="flex items-center">
                <Avatar w="25px" h="25px" text="K" mr="8px" />
                <Text margin={0} font="1rem" b>
                  Blog Editor
                </Text>
              </div>
              <Button
                type="abort"
                icon={<Sidebar />}
                auto
                onClick={async () => {
                  const mdxStr = await compileMdx(valueRef.current);
                  const htmlContent = createHtml({ mdxStr });
                  console.log({ mdxStr });
                  setSrcDoc(htmlContent);
                }}
              />
            </div>
            <Tree>
              <Tree.File name="package.json" />
              <Tree.Folder name="components">
                <Tree.File name="layout.js" />
                <Tree.Folder name="footer">
                  <Tree.File name="footer.js" />
                  <Tree.File name="footer-text.js" />
                  <Tree.File name="footer-license.js" />
                </Tree.Folder>
                <Tree.File name="header.js" />
              </Tree.Folder>
              <Tree.File name="readme.md" />
            </Tree>
          </div> */}
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
          <div style={{ height : 'calc(100% - 38px)' }}>
            <Splitter>
              <div className="h-full w-full">
                <KEditor onChange={handleChange} />
              </div>
              <div className="h-full w-full overflow-auto">
                {/* <KPreview srcDoc={srcDoc} /> */}
                <MDXPreview MdxComp={mdxComp.comp} />
              </div>
            </Splitter>
          </div>
        </div>
        {/* </Splitter> */}
      </div>
    </GeistProvider>
  );
};
export default BlogEditor;
