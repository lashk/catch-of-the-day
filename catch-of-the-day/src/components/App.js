import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import SampleFishes from '../sample-fishes';

class App extends React.Component {
    constructor(){
        super();
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        //set iniitial state
        this.state = {
            fishes: {},
            orders: {}
        };
    }

    loadSamples(){
        const fishes = SampleFishes;
        this.setState({fishes});
    }

    addFish(fish){
        //make a copy of current state and then update our state
        const fishes = {...this.state.fishes}; //es6 spread operator, takes every item from object and spread it into new object
        //add new fish to copy
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        //set state, only pass new state, you do not need to pass all state, react only wants new state
        this.setState({fishes: fishes});
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div class="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul class="list-of-fishes">
                    {
                        Object.keys(this.state.fishes)
                              .map(key => <Fish key={key} details={this.state.fishes[key]}/>)
                    }
                    </ul>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
            </div>
        );
    }
}

export default App;