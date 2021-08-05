import React from 'react';

export default class Cobra extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            celulas: [{x:0, y: 0}, {x:0, y: 0}, {x:0, y: 0}],
            direction: "Down",
            inputThisFrame: false
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.update = this.update.bind(this);

        setInterval(this.update, 200);
    }

    update(){
        this.setState({inputThisFrame: false});
        
        let celulas = this.state.celulas;

        for(let i = celulas.length-1; i > 0; i--){
            celulas[i].x =  celulas[i-1].x;
            celulas[i].y =  celulas[i-1].y;
        }

        switch(this.state.direction){
            case "Up":
                if(celulas[0].y == 0){
                    celulas[0].y = 19;
                }else{
                    celulas[0].y--;
                }
                break;
            case "Down":
                if(celulas[0].y == 19){
                    celulas[0].y = 0;
                }else{
                    celulas[0].y++;
                }
                break;
            case "Left":
                if(celulas[0].x == 0){
                    celulas[0].x = 19;
                }else{
                    celulas[0].x--;
                }
                break;
            case "Right":
                if(celulas[0].x == 19){
                    celulas[0].x = 0;
                }else{
                    celulas[0].x++;
                }
                break;
        }

        if(celulas[0].x == this.props.fruta.x && celulas[0].y == this.props.fruta.y){
            celulas.push({x:0, y:0});

            let frutaInvalida = true;
            while(frutaInvalida){
                frutaInvalida = false;
                celulas.forEach(cel =>{
                    if(this.props.fruta.x == cel.x && this.props.fruta.y == cel.y){
                        frutaInvalida = true;
                    }
                });
                if(frutaInvalida){
                    this.props.criarFruta();
                }
            }
        }

        this.setState({celulas: celulas});

        //Checar Colisões
        celulas.forEach(cel =>{
            if(cel != celulas[0]){
                if(cel.x == celulas[0].x && cel.y == celulas[0].y){
                    this.setState({celulas: [{x:0, y: 0}, {x:0, y: 0}, {x:0, y: 0}]});
                }
            }
        });
    }

    handleKeyDown(key){
        
        if(this.state.inputThisFrame){
            return;
        }

        switch(key.key){
            case "w":
                if(this.state.direction != "Down"){
                    this.setState({direction: "Up"});
                    this.setState({inputThisFrame: true});
                }
                break;
            case "s":
                if(this.state.direction != "Up"){
                    this.setState({direction: "Down"});
                    this.setState({inputThisFrame: true});
                }
                break;
            case "a":
                if(this.state.direction != "Right"){
                    this.setState({direction: "Left"});
                    this.setState({inputThisFrame: true});
                }
                break;
            case "d":
                if(this.state.direction != "Left"){
                    this.setState({direction: "Right"});
                    this.setState({inputThisFrame: true});
                }
                break;
        }
    }

    getCelulasDiv(){
        return this.state.celulas.map(cel =>{
            if(this.state.celulas.indexOf(cel) == 0){
                return <div key={this.state.celulas.indexOf(cel)} className="primeira-celula" style={{left: (cel.x * 20)+"px" ,top: (cel.y * 20)+"px"}}></div>
            }else{
                return <div key={this.state.celulas.indexOf(cel)} className="celula" style={{left: (cel.x * 20)+"px" ,top: (cel.y * 20)+"px"}}></div>
            }
            
        });
    }

    componentDidMount(){
        this.nameInput.focus();
    }

    render(){
        return (
            <>
                <div className="cobra">
                    {this.getCelulasDiv()}
                </div>
                <h3 className="instrucoes">Certifique-se que a barra está <span>verde</span> para ter o controle da cobra</h3>
                <input className="inputGame" value="Clique Aqui Para Ter o Controle da Cobra" readOnly="readonly" ref={(input) => { this.nameInput = input; }} type='text' onKeyDown={this.handleKeyDown} />
            </>
        );
    }
}