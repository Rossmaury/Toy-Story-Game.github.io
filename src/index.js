import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToyStoryMemoryGame from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <ToyStoryMemoryGame />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
