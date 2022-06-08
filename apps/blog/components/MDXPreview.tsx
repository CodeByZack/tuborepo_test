import React from 'react';
import { MDXContent } from 'mdx/types';
interface IProps {
  MdxComp: MDXContent;
}

const MDXPreview = (props: IProps) => {
  const { MdxComp } = props;
  return <div className="heti heti--serif m-auto">{typeof MdxComp === 'function' ? MdxComp({}) : ''} </div>;
};

export default MDXPreview;
