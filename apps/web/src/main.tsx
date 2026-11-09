import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <h1 className="p-6 text-2xl font-semibold">Funciona? </h1>
  </StrictMode>,
);