import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tabuleiro from './Components/Tabuleiro';

function renderizar(){
    ReactDOM.render(
        <Tabuleiro></Tabuleiro>,
        document.getElementById('root')
    );    
}

setInterval(renderizar, 500);
