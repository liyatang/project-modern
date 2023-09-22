// App 组件主入口
import AppRoute from './router';

const App = () => {
  return (
    <div className="app">
      <div className=" bg-black"></div>
      <AppRoute />
    </div>
  );
};

export default App;
