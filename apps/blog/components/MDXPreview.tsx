import React from 'react';
import { MDXContent } from 'mdx/types';
import { IArticleDetail, IArticleFrontMatter } from '../type';
import { BlogTitle } from './BlogLayout';
interface IProps {
  MdxComp: { comp: MDXContent; postInfo: Partial<IArticleDetail> };
}

const MDXPreview = (props: IProps) => {
  const { MdxComp } = props;
  const { comp, postInfo } = MdxComp;
  return (
    <article className="heti heti--serif flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
      <BlogTitle post={postInfo} />
      {typeof comp === 'function' ? comp({}) : ''}
    </article>
  );
};

export default MDXPreview;
