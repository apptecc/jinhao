import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NameCard from './components/NameCard'
import LikesButton from './components/LikesButton'
import DigitalClock from './components/DigitalClock'
import FormTest from './components/FormTest'
import FormTest2 from './components/FormTest2'


class App extends Component {
    render() {
        return (
            <div className="App container">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                {/*<NameCard name='apptec' number="18652454171"*/}
                {/*tags={['游泳', '健身']}/>*/}

                {/*<div className='alert-warning'>华丽的分隔线</div>*/}
                {/*<LikesButton/>*/}
                {/*<DigitalClock/>*/}
                {/*<FormTest/>*/}
                {/*<FormTest2/>*/}
            </div>
        );
    }
}

export default App;
