import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import {BrowserRouter as Router} from 'react-router-dom';
import Caesar from "./components/caesar/Caesar";
import RailFence from "./components/railfence/RailFence";
import Playfair from "./components/playfair/Playfair";
import Vigenere from "./components/vigenere/Vigenere";
import Hill from "./components/hill/Hill";
import Beaufort from "./components/beaufort/Beaufort";
import MD5 from "./components/md5/MD5";

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            choosePage: 0
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                            <div className="row menuButtons">
                                <h1 className="App-title col">Wybierz szyfr:</h1>
                                <div className="col"><button onClick={()=>this.setState({choosePage:1})}>Szyfr Cezara</button></div>
                                <div className="col"><button onClick={()=>this.setState({choosePage:2})}>Szyfr Płotkowy</button></div>
                                <div className="col"><button onClick={()=>this.setState({choosePage:3})}>Szyfr Playfair</button></div>
                                <div className="col"><button onClick={()=>this.setState({choosePage:4})}>Szyfr Vigenere</button></div>
                                <div className="col"><button onClick={()=>this.setState({choosePage:5})}>Szyfr Hilla</button></div>
                                <div className="col"><button onClick={()=>this.setState({choosePage:6})}>Szyfr Beauforta</button></div>
                                <div className="col"><button onClick={()=>this.setState({choosePage:7})}>Szyfr MD5</button></div>
                            </div>
                    </header>
                    {this.state.choosePage === 0 ? <Home/> : null}
                    {this.state.choosePage === 1 ? <Caesar/> : null}
                    {this.state.choosePage === 2 ? <RailFence/> : null}
                    {this.state.choosePage === 3 ? <Playfair/> : null}
                    {this.state.choosePage === 4 ? <Vigenere/> : null}
                    {this.state.choosePage === 5 ? <Hill/> : null}
                    {this.state.choosePage === 6 ? <Beaufort/> : null}
                    {this.state.choosePage === 7 ? <MD5/> : null}
                </div>
            </Router>
        );
    }
}

export default App
