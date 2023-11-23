import { Button } from 'antd';
import { StepForwardOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useHomeStore } from './store';
// import Map from './map.svg';

// 打印环境变量
console.log(import.meta.env);

const Demo = () => {
  const setName = useHomeStore((state) => state.setName);
  const name = useHomeStore((state) => state.name);

  useEffect(() => {
    setTimeout(() => {
      setName('xiaoming');
    }, 1000);
  }, []);

  return (
    <div>
      <h1>Demo</h1>
      <hr />
      <h2>antd</h2>
      <Button type="primary" icon={<StepForwardOutlined />}>
        button
      </Button>
      <h2>tailwindcss</h2>
      <div className="h-10 w-10 bg-black" />
      <h2>zustand</h2>
      <div>my name is {name}</div>
    </div>
  );
};

export default Demo;
