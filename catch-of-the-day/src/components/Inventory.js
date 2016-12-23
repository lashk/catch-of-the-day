import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
    constructor(){
        super();
        this.state = {
            uid: null,
            owner: null
        };
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
    }   

    componentDidMount(){
        base.onAuth((user)=>{
            if (user){
                this.authHandler(null, {user});
            }
        });
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        //take a copy
        const updatedFish = {...fish, [e.target.name]: e.target.value};
        this.props.updateFish(key, updatedFish);
        console.log(updatedFish);
    }

    authenticate(provider){
        console.log(`trying to log in with ${provider}`);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    logout(){
        base.unAuth();
        this.setState({uid: null});
    }

    authHandler(err, authData){
        console.log(authData);
        if(err){
            console.error(err);
            return;
        }

        //grab the store info
        const storeRef = base.database().ref(this.props.storeId); //connects to firebase db
        //query the firebase once for store data 
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            //claim it as our own if there is no owner already
            if (!data.owner){
                storeRef.set({
                    owner: authData.user.uid
                });
            }
            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            });
        })
    }

    renderLogin(){
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
                <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
                <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
            </nav>
        );
    }
    renderInventory(key){
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish name" onChange={(e) => this.handleChange(e,key)} />
                <input type="text" name="price" value={fish.price} placeholder="Fish price" onChange={(e) => this.handleChange(e,key)} />
                <select name="status" value={fish.status} placeholder="Fish status" onChange={(e) => this.handleChange(e,key)} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" value={fish.desc} placeholder="Fish desc" onChange={(e) => this.handleChange(e,key)}>
                </textarea>
                <input type="text" name="image" value={fish.image} placeholder="Fish image" onChange={(e) => this.handleChange(e,key)} />
                <button onClick={() => this.props.deleteFish(key)}>Remove Fish</button>
            </div>
        );
    }
    render(){
        const logout = <button onClick={this.logout}>Log Out!</button>;
        //check if they are logged in


        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        );
    }
}

Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    deleteFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired
}

export default Inventory;