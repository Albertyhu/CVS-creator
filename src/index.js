import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';
import './styles/app.css'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
         <App />
    </React.StrictMode>
);


