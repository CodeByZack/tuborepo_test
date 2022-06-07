import ArticleEnter from '../components/ArticleEnter';
import Container from '../components/Container';
import { getAllFilesFrontMatter } from '../utils/mdx';
import { IArticleFrontMatter } from '../type';

interface IProps {
  posts: IArticleFrontMatter[];
}

const Index = (props: IProps) => {
  const { posts } = props;

  return (
    <Container>
      <div className="custom-div">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          行者、空山的网站
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          习惯了无话，习惯了自己的世界，习惯了音乐和雨，习惯了就是这样一个自己，安静的回忆，安静的看着回忆也渐渐远离，那有你的情绪，在我的心里，终遁成了冬季。。。
        </h2>
        {posts.map((p) => {
          return <ArticleEnter key={p.slug} data={p} />;
        })}
      </div>
    </Container>
  );
};

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');
  console.log(posts);
  return { props: { posts } };
}

export default Index;
