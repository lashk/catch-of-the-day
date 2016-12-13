import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {
    // constructor(){
    //     super();
    //     this.goToStore = this.goToStore.bind(this);    
    // }

    goToStore(event){
        event.preventDefault();
        console.log('url changed');
        //first grab text
        const storeId =this.storeInput.value;

        //transition to /store/:storeId
        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render(){
        return (
            <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
                {/* comment in jsx */}
                <h2>Please enter a store</h2>
                <input type="text" required placeholder="Store name" defaultValue={getFunName()} ref={(input)=> {this.storeInput = input}}/>
                <button type="submit">Visit Store -> </button>
            </form>
        );
    }
}

//surface router from parent
StorePicker.contextTypes = {
    router: React.PropTypes.object
};

export default StorePicker;