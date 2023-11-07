import { BrowserRouter as Router } from 'react-router-dom';
// App 组件主入口
import AppRoute from './router';

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppRoute />
      </div>
    </Router>
  );
};

export default App;
