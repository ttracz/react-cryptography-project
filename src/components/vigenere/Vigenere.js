import React from 'react';
import {withRouter} from "react-router-dom";

class Vigenere extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleShiftChange = this.handleShiftChange.bind(this);
        this.toggleDecoder = this.toggleDecoder.bind(this);

        this.state = {
            text: '',
            shifter: '',
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

    isLetter(c) {
        return this.isUppercase(c) || this.isLowercase(c);
    }

    isUppercase(c) {
        return 65 <= c && c <= 90;
    }

    isLowercase(c) {
        return 97 <= c && c <= 122;
    }

    filterKey(key) {
        var result = [];
        for (var i = 0; i < key.length; i++) {
            var c = key.charCodeAt(i);
            if (this.isLetter(c))
                result.push((c - 65) % 32);
        }
        return result;
    }

    encrypt(string, key){
        if (this.state.decode){
            for (let i = 0; i < key.length; i++)
                key[i] = (26 - key[i]) % 26;
        }
        let output = [];
        for (let i = 0, j = 0; i < string.length; i++) {
            let c = string.charCodeAt(i);
            if (this.isUppercase(c)) {
                output.push(String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65));
                j++;
            } else if (this.isLowercase(c)) {
                output.push(String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97));
                j++;
            } else {
                output.push(string.charAt(i));
            }
        }
        console.log(output);
        this.setState({
            result: output
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container main">
                    <p className="welcome">Szyfr Vigenere</p>
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
                            <input className='inputClass' type="text" value={this.state.shifter} onChange={this.handleShiftChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 calculate">
                            <button className='modeButton' onClick={()=>this.encrypt(this.state.text, this.filterKey(this.state.shifter))}>Przelicz</button>
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

export default withRouter(Vigenere);