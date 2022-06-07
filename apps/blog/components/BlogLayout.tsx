import Image from 'next/image';
import Container from '../components/Container';
import BlogSeo from './BlogSeo';
import Link from 'next/link';
import { IArticleDetail } from '../pages/type';
import dayjs from 'dayjs';
import { PropsWithChildren } from 'react';

// prettier-ignore
const editUrl = (slug) =>`https://github.com/codebyzack/blog/edit/master/data/blog/${slug}.mdx`;
const onLineEditUrl = (slug, type) => `/data/${type}/${slug}.mdx`;

interface IProps {
  post: IArticleDetail;
  type: 'blog' | 'life';
}

const BlogLayout = (props: PropsWithChildren<IProps>) => {
  const { post, type, children } = props;

  return (
    <Container>
      <BlogSeo
        url={`https://zackdk.com/${type}/${post.slug}`}
        image=""
        {...post}
      />
      <article className="heti heti--classic flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2 mb-8">
          <div className="flex items-center">
            <Image
              alt="行者、空山"
              height={24}
              width={24}
              src="/avatar.jpg"
              className="rounded-full"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 ml-2">
              {'行者、空山 / '}
              {dayjs(post.publishedAt).format('YYYY-MM-DD')}
            </span>
          </div>
          <span className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
            {post.readingTime.text}
            {/* {` • `} */}
            {/* <ViewCounter slug={frontMatter.slug} /> */}
          </span>
        </div>
        <div className="max-w-none w-full mb-6">{children}</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          纠正错误 {` • `}
          <a
            href={editUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'在GitHub编辑'}
          </a>
          {` • `}
          <Link
            href={{
              pathname: '/modify_article',
              query: { path: onLineEditUrl(post.slug, type) },
            }}
          >
            <a>在线编辑</a>
          </Link>
        </div>
      </article>
    </Container>
  );
};

export default BlogLayout;
