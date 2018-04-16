import React from 'react';
import {withRouter} from "react-router-dom";

class Home extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="container main">
                    <p className="welcome">Witaj w aplikacji <font color="#f1a284">Szyfry!</font></p>
                    <p className="aboutCyphers"><font color="#bad9e9">Szyfr</font> – funkcja matematyczna wykorzystywana do szyfrowania tekstu jawnego lub jego deszyfrowania.
                        Zazwyczaj jedna funkcja wykorzystywana jest do szyfrowania, a inna do deszyfrowania wiadomości.</p>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);