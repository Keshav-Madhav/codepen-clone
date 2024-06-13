import React from 'react';
import ReactDOM from "react-dom/client"
import "./index.css"
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Store from './context/store';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <Toaster closeButton richColors expand position='top-center'/>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);