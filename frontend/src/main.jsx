import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/estructura/App_container/App';

import "./i18n";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

