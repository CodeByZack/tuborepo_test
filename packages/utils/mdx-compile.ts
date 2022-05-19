import { compile } from '@mdx-js/mdx';
//@ts-ignore
import mdxPrism from 'mdx-prism';
//@ts-ignore
import remarkCodeTitles from 'remark-code-titles';
import remarkSlug from 'remark-slug';
import remarkGfm from 'remark-gfm';
import remarkAutolinkHeadings from 'remark-autolink-headings';

export const compileMdx = async (content: string) => {
  try {
    const res = await compile(content, {
      remarkPlugins: [remarkAutolinkHeadings, remarkSlug, remarkCodeTitles, remarkGfm],
      jsxRuntime: 'classic',
      rehypePlugins: [mdxPrism],
      
    });
    return res.value as string;
  } catch (error) {
    console.log(error);
    throw new Error(error as any);
  }
};
