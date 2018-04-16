import React from 'react';
import {withRouter} from "react-router-dom";

class Hill extends React.Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleShiftChange = this.handleShiftChange.bind(this);
        this.toggleDecoder = this.toggleDecoder.bind(this);
        this.toggleCheck = this.toggleCheck.bind(this);

        this.state = {
            checked: true,
            text: '',
            shifter: '',
            result: '',
            decode: false
        }
    }

    toggleCheck(){
        this.setState({
            checked: !this.state.checked
        })
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

    encrypt(string, key){
        string = string.toLowerCase();
        string.toLowerCase().replace(/[^a-z]/g, "");
        key.toLowerCase().replace(/[^0-9 ]/g, "");
        let keys = key.split(" ");
        if(string.length < 1){ alert("Proszę poprawnie podać słowo to zaszyfrowania"); return; }
        if(string.length % 2 === 1){ string = string + "x"; }
        if(keys.length !== 4){ alert("Klucz musi składać się z czterech liczb oddzielonych spacją np. 1 2 3 5 "); return; }
        for(let i=0;i<4;i++) keys[i] = keys[i]%26;
        let ciphertext = "";
        for(let i=0; i<string.length; i+=2){
            ciphertext += String.fromCharCode((keys[0]*(string.charCodeAt(i)-97) + keys[1]*(string.charCodeAt(i+1)-97))%26 + 97);
            ciphertext += String.fromCharCode((keys[2]*(string.charCodeAt(i)-97) + keys[3]*(string.charCodeAt(i+1)-97))%26 + 97);
        }
        this.setState({
            result: ciphertext.toUpperCase()
        })
    }

    decrypt(string, key){
        string = string.toLowerCase();
        string.toLowerCase().replace(/[^a-z]/g, "");
        key.toLowerCase().replace(/[^0-9 ]/g, "");
        let keys = key.split(" ");
        if(string.length < 1){ alert("Proszę podać poprawny szyfr"); return; }
        if(string.length % 2 === 1){ alert("Ilość znaków w szyfrze nie jest podzielna przez 2, proszę dodać X"); return; }
        if(keys.length !== 4){ alert("Klucz musi składać się z czterech liczb oddzielonych spacją np. 1 2 3 5 "); return; }
        for(let i=0;i<4;i++) keys[i] = keys[i]%26;
        let det = keys[0]*keys[3] - keys[1]*keys[2];
        det = ((det%26)+26)%26;
        let di=0;
        for(let i=0;i<26;i++){ if((det*i)%26 === 1) di = i; }
        if(di === 0){alert("Nie można utworzyć macierzy odwrotnej, podaj inny klucz"); return; }
        let ikeys = new Array(4);
        ikeys[0] = (di*keys[3])%26; ikeys[1] = (-1*di*keys[1])%26;
        ikeys[2] = (-1*di*keys[2])%26; ikeys[3] = di*keys[0];
        for(let i=0;i<4;i++){ if(ikeys[i] < 0) ikeys[i] += 26; }
        let plaintext="";
        for(let i=0; i<string.length; i+=2){
            plaintext += String.fromCharCode((ikeys[0]*(string.charCodeAt(i)-97) + ikeys[1]*(string.charCodeAt(i+1)-97))%26 + 97);
            plaintext += String.fromCharCode((ikeys[2]*(string.charCodeAt(i)-97) + ikeys[3]*(string.charCodeAt(i+1)-97))%26 + 97);
        }
        this.setState({
            result: plaintext.toUpperCase()
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container main">
                    <p className="welcome">Szyfr Hilla</p>
                    <div className="row">
                        <div className="col-sm-12">
                            <button className="modeButton toggle" onClick={() => this.toggleDecoder()}>
                                Zmień
                            </button>
                            <div
                                className="modeText"> Tryb: {this.state.decode ? 'Rozszyfrowywanie' : 'Szyfrowanie'}{' '}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-7">
                        </div>
                        <div className="col-sm-4">
                            <center>
                            <input type="checkbox" checked={this.state.checked} onClick={()=>this.toggleCheck()}/> Macierz 2x2 {' '}
                            <input type="checkbox" checked={!this.state.checked} onClick={()=>this.toggleCheck()}/> Macierz 3x3
                            </center>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <input className='inputClass' type="text" value={this.state.text}
                                   onChange={this.handleTextChange}/>
                        </div>
                        <div className="col-sm-6">
                            <input className='inputClass' type="text" value={this.state.shifter}
                                   onChange={this.handleShiftChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 calculate">
                            <button className='modeButton'
                                    onClick={() => {this.state.decode ? this.decrypt(this.state.text, this.state.shifter) : this.encrypt(this.state.text, this.state.shifter)}}>Przelicz
                            </button>
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

export default withRouter(Hill);