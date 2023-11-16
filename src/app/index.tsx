import { BrowserRouter as Router } from 'react-router-dom';

// App 组件主入口
import AppRoute from './router';
import { StrictMode } from 'react';

const App = () => {
  return (
    <StrictMode>
      <Router>
        <div className="app">
          <AppRoute />
        </div>
      </Router>
    </StrictMode>
  );
};

export default App;
