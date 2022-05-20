import React, { useRef, useState } from 'react';
import { Button, KEditor, KPreview } from 'ui';
import { compileMdx, createHtml } from 'utils';
import Splitter, { SplitDirection } from '@devbookhq/splitter';

interface IProps {}

const BlogEditor = (props: IProps) => {
  const valueRef = useRef('');
  const [srcDoc, setSrcDoc] = useState('');

  return (
    <div className="w-screen h-screen">
      <Splitter initialSizes={[15, 100]} minWidths={[180]}>
        <div className="h-full bg-[#1e1e1e]">
          <Button
            onClick={async () => {
              const mdxStr = await compileMdx(valueRef.current);
              const htmlContent = createHtml({ mdxStr });
              console.log({ mdxStr });
              setSrcDoc(htmlContent);
            }}
          >
            trigger
          </Button>
        </div>
        <Splitter>
          <div className="h-full w-full">
            <KEditor onChange={(v) => (valueRef.current = v)} />
          </div>
          <div className="h-full w-full pointer-events-none">
            <KPreview srcDoc={srcDoc} />
          </div>
        </Splitter>
      </Splitter>
    </div>
  );
};
export default BlogEditor;
