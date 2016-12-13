import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
    constructor(){
        super();
        this.addFish = this.addFish.bind(this);

        //set iniitial state
        this.state = {
            fishes: {},
            orders: {}
        };
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
                <Header tagline="Fresh Seafood Market" />
                <Order />
                <Inventory addFish={this.addFish}/>
            </div>
        );
    }
}

export default App;