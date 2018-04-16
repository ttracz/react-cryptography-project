import React from 'react';
import {withRouter} from "react-router-dom";

class Beaufort extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleShiftChange = this.handleShiftChange.bind(this);
        this.toggleDecoder = this.toggleDecoder.bind(this);

        this.state = {
            text: '',
            shifter: 3,
            result: '',
            decode: false
        }

        this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.keyMove(this.reverseString(this.alphabet), 20)
    }

    reverseString(str) {
        let o = '';
        o += str[0]
        for (let i = str.length - 1; i >= 1; i--)
            o += str[i];
        return o;
    }

    keyMove(str, key) {
        let s = '';
        for (let i=26-key; i<str.length; i++){
            s += str[i];
        }
        for (let i=0; i<26-key; i++){
            s += str[i]
        }
        return s;
    }

    toggleDecoder() {
        this.setState({decode: !this.state.decode})
    }

    handleTextChange(e) {
        this.setState({text: e.target.value})
    }

    handleShiftChange(e) {
        this.setState({shifter: e.target.value})
    }

    encrypt(text, shift){
        text = text.toUpperCase();
        let textTab = text.split("");
        let alphaTab = this.alphabet.split("");
        let shiftAlphaTab = this.keyMove(this.reverseString(this.alphabet), shift).split("");
        let cipher = '';
        for (let i=0; i<textTab.length; i++){
            for (let j=0; j<alphaTab.length; j++){
                if (textTab[i]===alphaTab[j]){
                    console.log(j)
                    cipher += shiftAlphaTab[j];
                }
            }
        }
        this.setState({
            result: cipher.toUpperCase()
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container main">
                    <p className="welcome">Szyfr Beauforta</p>
                    <div className="row">
                        <div className="col-sm-6">
                            <input className='inputClass' type="text" value={this.state.text} onChange={this.handleTextChange}/>
                        </div>
                        <div className="col-sm-6">
                            <input className='inputClass' type="number" value={this.state.shifter} min="0" max="10" onChange={this.handleShiftChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 calculate">
                            <button className='modeButton' onClick={()=>this.encrypt(this.state.text, this.state.shifter)}>Przelicz</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">Szyfr:
                            <div className='result'> {this.state.result} </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Beaufort);