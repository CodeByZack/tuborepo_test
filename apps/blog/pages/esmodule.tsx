import React, { useRef, useState } from 'react';
import { Button, KEditor, KPreview } from 'ui';
import { compileMdx, createHtml } from 'utils';
import Container from '../components/Container';

interface IProps {}

const BlogEditor = (props: IProps) => {
  const valueRef = useRef('');
  const [srcDoc, setSrcDoc] = useState('');

  return (
    <Container>
      <div>
        <Button
          text="trigger"
          onClick={async () => {
            const mdxStr = await compileMdx(valueRef.current);
            const htmlContent = createHtml({ mdxStr });
            console.log({ mdxStr });
            setSrcDoc(htmlContent);
          }}
        />
        <div className="h-xl w-full">
          <KEditor onChange={(v) => (valueRef.current = v)} />
        </div>
        <div className="h-xl w-full">
          <KPreview srcDoc={srcDoc} />
        </div>
      </div>
    </Container>
  );
};
export default BlogEditor;
