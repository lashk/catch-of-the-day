import React from 'react';

class AddFishForm extends React.Component {
    createFish(event){
        event.preventDefault();
        console.log("gonna make a fish");
        const fish = {
            name: this.name.value
        };
        this.props.addFish(fish);
        this.fishForm.reset();
        console.log(fish);
    }
    render(){
        return (
            <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={this.createFish.bind(this)}>
                <input ref={(input) => this.name = input} type="text" placeholder="Fish name" />
                <input ref={(input) => this.price = input} type="text" placeholder="Fish price" />
                <select ref={(input) => this.status = input}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={(input) => this.description = input} type="text" placeholder="Fish Desc" />
                <input ref={(input) => this.image = input} type="text" placeholder="Fish Image" />

                <button type="submit">+ Add Item</button>
            </form>
        );
    }
}

export default AddFishForm;