import { useRef, useState } from 'react';
import Container from '../components/Container';

const Index = () => {
  const valueRef = useRef('');
  const [srcDoc, setSrcDoc] = useState('');

  return (
    <Container>
      <div>
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          行者、空山的网站
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          习惯了无话，习惯了自己的世界，习惯了音乐和雨，习惯了就是这样一个自己，安静的回忆，安静的看着回忆也渐渐远离，那有你的情绪，在我的心里，终遁成了冬季。。。
        </h2>
      </div>
    </Container>
  );
};

export default Index;
