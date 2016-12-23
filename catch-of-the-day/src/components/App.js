import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import SampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    constructor(){
        super();
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.deleteFish = this.deleteFish.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
        //set iniitial state
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount(){
        //invoked once on client and server
        //immediately before render
        //runs right before App is rendered
        const storeId = this.props.params.storeId;
        this.ref = base.syncState(`${storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if (localStorageRef){
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUpdate(nextProps, nextState){
        //runs whenever props or state changes
        console.log({nextProps, nextState});
        //local storage - key value pair
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    loadSamples(){
        const fishes = SampleFishes;
        this.setState({fishes});
    }

    addToOrder(key){
        //take a copy of state
        const order = {...this.state.order};
        //update
        order[key] = order[key] + 1 || 1;
        //set state
        this.setState({order: order});
    }

    removeFromOrder(key){
        const order = {...this.state.order};
        const fish = this.state.fishes[key];
        const isAvailable = fish.status === 'available';

        order[key]=null;
        delete order[key];
        this.setState({order});
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

    updateFish(key, fish){
        const fishes = {...this.state.fishes};
        fishes[key] = fish;
        this.setState({fishes});
    }

    deleteFish(key){
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                    {
                        Object.keys(this.state.fishes)
                              .map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]}/>)
                    }
                    </ul>
                </div>
                <Order 
                    order={this.state.order} 
                    fishes={this.state.fishes} 
                    params={this.props.params}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory deleteFish={this.deleteFish} updateFish={this.updateFish} fishes={this.state.fishes} addFish={this.addFish} loadSamples={this.loadSamples}/>
            </div>
        );
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;