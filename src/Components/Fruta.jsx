import React from 'react';

export default class Fruta extends React.Component{
    render(){
        return <div className="fruta" style={{top: (this.props.fruta.y * 20) + "px", left: (this.props.fruta.x * 20) + "px"}}></div>
    }
}