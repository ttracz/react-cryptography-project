import React from 'react';
import {withRouter} from "react-router-dom";

class Playfair extends React.Component {

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

    componentDidMount(){
        this.genRandKey()
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

    encrypt(string, key) {
        string = string.toLowerCase();
        string.toLowerCase().replace(/[^a-z]/g, "").replace(/[j]/g, "i");
        key.toLowerCase().replace(/[^a-z]/g, "");
        console.log(string)
        if(string.length < 1){ alert("please enter some plaintext (letters and numbers only)"); return; }
        if(key.length !== 25){ alert("keysquare must be 25 characters in length"); return; }
        while(string.length % 2 !== 0) string += "x";
        let ciphertext = "";
        let c; let d;
        for(let i=0; i<string.length; i+=2){
            let a = string.charAt(i);
            let b = string.charAt(i+1);
            if(a === b) b = "x";
            let row1 = parseInt(key.indexOf(a) / 5);
            let col1 = key.indexOf(a) % 5;
            let row2 = parseInt(key.indexOf(b) / 5);
            let col2 = key.indexOf(b) % 5;
            if(row1 === row2){
                if(col1 === 4) c = key.charAt(row1*5);
                else c = key.charAt(row1*5 + col1 + 1);
                if(col2 === 4) d = key.charAt(row2*5);
                else d = key.charAt(row2*5 + col2 + 1);
            }else if(col1 === col2){
                if(row1 === 4) c = key.charAt(col1);
                else c = key.charAt((row1+1)*5 + col1);
                if(row2 === 4) d = key.charAt(col2);
                else d = key.charAt((row2+1)*5 + col2);
            }else{
                c = key.charAt(row1*5 + col2);
                d = key.charAt(row2*5 + col1);
            }

            ciphertext += c + d;
        }
        this.setState({
            result: ciphertext.toUpperCase()
        })
    }

    decrypt(string, key) {
        string = string.toLowerCase();
        string.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/[j]/g, "i");  ;
        key.toLowerCase().replace(/[^a-z]/g, "");

        if(string.length < 1){ alert("please enter some ciphertext (letters only)"); return; }
        if(string.length % 2 !== 0){ alert("ciphertext length must be even."); return; }
        if(key.length !== 25){ alert("keysquare must be 25 characters in length"); return; }

        let plaintext = "";
        for(let i=0; i<string.length; i+=2){
            let a = string.charAt(i);
            let b = string.charAt(i+1);
            let row1 = parseInt(key.indexOf(a) / 5);
            let col1 = key.indexOf(a) % 5;
            let row2 = parseInt(key.indexOf(b) / 5);
            let col2 = key.indexOf(b) % 5;
            let c; let d;
            if(row1 === row2){
                if(col1 === 0) c = key.charAt(row1*5 + 4);
                else c = key.charAt(row1*5 + col1 - 1);
                if(col2 === 0) d = key.charAt(row2*5 + 4);
                else d = key.charAt(row2*5 + col2 - 1);
            }else if(col1 === col2){
                if(row1 === 0) c = key.charAt(20 + col1);
                else c = key.charAt((row1-1)*5 + col1);
                if(row2 === 0) d = key.charAt(20 + col2);
                else d = key.charAt((row2-1)*5 + col2);
            }else{
                c = key.charAt(row1*5 + col2);
                d = key.charAt(row2*5 + col1);
            }
            plaintext += c + d;
        }
        this.setState({
            result: plaintext.toUpperCase()
        })
    }

   genRandKey(){
        let keychars = "abcdefghiklmnopqrstuvwxyz";
        let chars = keychars.split("");
        let ret=""; let lim = chars.length
        for(let i=0; i<lim; i++){
            let index = Math.floor(chars.length*Math.random());
            ret += chars[index];
            chars.splice(index,1);
        }
        this.setState({
            shifter: ret
        })
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="container main">
                    <p className="welcome">Szyfr Playfair</p>
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
                            <button onClick={()=>this.genRandKey()} className='modeButton widthAuto'>Generuj klucz</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 calculate">
                            <button className='modeButton' onClick={()=> {this.state.decode ? this.decrypt(this.state.text, this.state.shifter) : this.encrypt(this.state.text, this.state.shifter)}}>Przelicz</button>
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

export default withRouter(Playfair);