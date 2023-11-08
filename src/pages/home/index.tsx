import { Button } from 'antd';
// import Map from './map.svg';

console.log(import.meta.env);
const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Button>button</Button>
      <div className="h-10 w-10 bg-black" />
    </div>
  );
};

export default Home;
