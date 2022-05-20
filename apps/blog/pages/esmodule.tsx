import React, { useRef, useState } from 'react';
import {
  Text,
  CssBaseline,
  GeistProvider,
  KEditor,
  KPreview,
  Tree,
  Avatar,
  Button,
  Tabs,
  Tooltip,
} from 'ui';
import { compileMdx, createHtml } from 'utils';
import Splitter, { SplitDirection } from '@devbookhq/splitter';
import { MoreVertical, Sidebar } from '@geist-ui/icons';
import repoUtil from 'utils/github-utils';

interface IProps {}

const BlogEditor = (props: IProps) => {
  const valueRef = useRef('');
  const [srcDoc, setSrcDoc] = useState('');

  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <div className="w-screen h-screen bg-[#1e1e1e]">
        <Splitter initialSizes={[15, 100]} minWidths={[180,1000]}>
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
          </div>
          <div className="h-full">
            <div className="flex items-center justify-between h-[38px] b-y-1 b-[#404040] p-1 box-border">
              <Tabs height="38px" initialValue="html" hideDivider hideBorder>
                <Tabs.Item label="HTML" value="html"></Tabs.Item>
                <Tabs.Item label="CSS" value="css"></Tabs.Item>
              </Tabs>
              <Tooltip portalClassName="w-[100px!important]" trigger="click" placement="bottomEnd" text={"目录"}>
                <Button
                  type="abort"
                  icon={<MoreVertical />}
                  auto
                  onClick={()=>{
                    repoUtil.init();
                    repoUtil.getRepo();

                  }}
                />
              </Tooltip>
            </div>
            <Splitter>
              <div className="h-full w-full">
                <KEditor onChange={(v) => (valueRef.current = v)} />
              </div>
              <div className="h-full w-full pointer-events-none">
                <KPreview srcDoc={srcDoc} />
              </div>
            </Splitter>
          </div>
        </Splitter>
      </div>
    </GeistProvider>
  );
};
export default BlogEditor;
