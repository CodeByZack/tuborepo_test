import React from 'react';
import { IArticle } from '../pages/type';

interface IProps {
  data: IArticle;
}

const ArticleEnter = (props: IProps) => {
  const { data } = props;

  return (
    <a className="w-full cursor-pointer" href={data.path}>
      <div className="mb-8 w-full">
        <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
          {data.title}
        </h4>
        <p className="text-gray-600 dark:text-gray-400">{data.desc}</p>
      </div>
    </a>
  );
};
export default ArticleEnter;
