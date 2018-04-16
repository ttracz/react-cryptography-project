import React from 'react';
import {withRouter} from "react-router-dom";

class RailFence extends React.Component {

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

    encrypt(string, num){
        let lines = [];
        let chars = string.split("");
        let i, current_line, dir

        for(i=0, current_line = 0, dir = 0; i < chars.length; i++)
        {
            var line_i = current_line;

            if(lines[line_i] === undefined)
            {
                lines[line_i] = "";
            }

            lines[line_i] += chars[i];

            // set next line index
            if(current_line == num - 1 || (current_line === 0 && i !==0))
            {
                dir = dir ^ 1;
            }

            current_line = dir === 0 ? current_line+1 : current_line-1;
        }
        this.setState({
            result: lines.join("")
        })
    }

    decrypt(string, num)
    {
        let lines = [];
        let chars = string.split("");
        let i, current_line, dir

        for(i=0, current_line = 0, dir = 0; i < chars.length; i++)
        {
            let line_i = current_line;

            if(lines[line_i] === undefined)
            {
                lines[line_i] = "";
            }

            lines[line_i] += '?';

            if(current_line == num - 1 || (current_line === 0 && i !==0))
            {
                dir = dir ^ 1;
            }

            current_line = dir === 0 ? current_line+1 : current_line-1;
        }

        let encrypted = string;
        for(let x in lines)
        {
            let line_length = lines[x].length;
            lines[x] = encrypted.slice(0,line_length);
            encrypted = encrypted.substring(line_length, encrypted.length);
        }

        let dec_string = "";
        for(i=0, current_line = 0, dir = 0; i < chars.length; i++)
        {
            let line_i = current_line;

            dec_string += lines[line_i].substring(0,1);

            lines[line_i] = lines[line_i].substring(1,lines[line_i].length);

            if(current_line == num - 1 || (current_line === 0 && i !==0))
            {
                dir = dir ^ 1;
            }

            current_line = dir === 0 ? current_line+1 : current_line-1;

        }

        this.setState({result: dec_string});
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container main">
                    <p className="welcome">Szyfr Płotkowy</p>
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
                            <button className='modeButton' onClick={()=>{this.state.decode ? this.encrypt(this.state.text, parseInt(this.state.shifter)) : this.decrypt(this.state.text, parseInt(this.state.shifter))}}>Przelicz</button>
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

export default withRouter(RailFence);