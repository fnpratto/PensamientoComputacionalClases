import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// StrictMode omitido: CodeMirror 5 (via CDN) no soporta el doble-invoke de efectos en dev
createRoot(document.getElementById('root')).render(<App />);
