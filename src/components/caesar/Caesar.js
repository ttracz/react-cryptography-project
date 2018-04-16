import React from 'react';
import {withRouter} from "react-router-dom";

class Caesar extends React.Component {

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

    caesarShiftCode(text, shift){
        if (this.state.decode){
            shift = -shift + 26
        }
        let result = '';
        for (let i=0; i<text.length; i++){
            let char = text[i];
            if (char.match(/[a-z]/i)){
                let code = text.charCodeAt(i);
                if ((code >= 65) && (code <= 90)){
                    char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
                } else if ((code >= 97) && (code <= 122)){
                    char = String.fromCharCode(((code - 97 + shift) % 26) + 97)
                }
            }
            result += char;
        }
        this.setState({
            result: result
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container main">
                    <p className="welcome">Szyfr Cezara</p>
                    <div className="row">
                        <div className="col-sm-12">
                            <button className="modeButton toggle" onClick={()=>this.toggleDecoder()}>
                                Zmień
                            </button><div className="modeText"> Tryb: {this.state.decode ? 'Rozszyfrowywanie' : 'Szyfrowanie'}{' '}</div>
                        </div>
                    </div>
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
                            <button className='modeButton' onClick={()=>this.caesarShiftCode(this.state.text, parseInt(this.state.shifter))}>Przelicz</button>
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

export default withRouter(Caesar);