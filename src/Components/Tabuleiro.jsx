import React from 'react';
import Cobra from './Cobra';
import Fruta from './Fruta';

export default class Tabuleiro extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fruta: {x: 5, y: 7}
        }
        this.getRandomInt = this.getRandomInt.bind(this);
        this.criarFruta = this.criarFruta.bind(this);
    }

    getRandomInt(min, max) {
        return (Math.floor(Math.random() * (max-min)) + min);
    }

    criarFruta(){
        let x = this.getRandomInt(0, 19);
        let y = this.getRandomInt(0, 19);

        // let x = (Math.floor(Math.random() * (19-0)) + 0);
        // let y = (Math.floor(Math.random() * (19-0)) + 0);

        this.setState({fruta: {x: x, y: y}});
    }

    render(){
        return (
            <div className="tabuleiro">
                <Cobra fruta={this.state.fruta} criarFruta={this.criarFruta}></Cobra>
                <Fruta fruta={this.state.fruta}></Fruta>
            </div>
        )
    }
}