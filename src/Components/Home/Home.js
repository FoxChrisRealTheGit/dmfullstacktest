import React from 'react';
import '../../css/reset.css';
import './home.css';

import logo from './communityBank.svg';

export default function Home() {
    return (
        <div className="App">
            <img src={logo}/>
            <a href={process.env.REACT_APP_LOGIN}>
                <button>login</button>
                </a>
        </div>
    )
}