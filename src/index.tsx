// 项目主入口
import './style.css';
import { createRoot } from 'react-dom/client';
import App from './app';

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);

root.render(<App />);
