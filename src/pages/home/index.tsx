import { Button } from 'antd';
import { useHomeStore } from './store';
import { useEffect } from 'react';
// import Map from './map.svg';

// 打印环境变量
console.log(import.meta.env);

const Home = () => {
  const setName = useHomeStore((state) => state.setName);
  const name = useHomeStore((state) => state.name);

  useEffect(() => {
    setTimeout(() => {
      setName('xiaoming');
    }, 1000);
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Button>button</Button>
      <div className="h-10 w-10 bg-black" />
      <div>my name is {name}</div>
    </div>
  );
};

export default Home;
