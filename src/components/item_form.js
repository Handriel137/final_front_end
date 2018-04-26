import React from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/';
// const API_BASE = "https://safe-bastion-97280.herokuapp.com/";

class ItemForm extends React.Component {

    constructor(props) {

        const id = props.match.params.id;
        const createMode = (props.match.path.endsWith("create")) ? true : false;
        super(props);
        this.state = {
            name: "",
            description: "",
            rarity: 0,
            character_id: id,
            item_id: createMode ? 0 : props.match.params.itemId,
            createMode: createMode
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        // load the item if edting.
        if (!createMode) {
            axios
                .get(`${API_BASE}/characters/${this.state.character_id}/items/${this.state.item_id}`)
                .then(res => {
                    console.log("item collected");
                    this.setState({
                        name: res.data.name,
                        description: res.data.description,
                        rarity: res.data.rarity
                    })
                })
                .catch(err => console.log(err));
        }
    }

    addItem(newItem) {
        console.log(`creating an item with item name ${newItem.name}`);
        axios
            .post(`${API_BASE}/characters/${newItem.character_id}/items`, newItem)
            .then(res => {
                //this.props.history.replace(`/characters/${this.state.character_id}/items`);
                console.log('posted!');
                this.props.history.goBack();
            })
            .catch(err => console.log(err));
    }

    updateItem(item) {
        axios
            .put(`${API_BASE}/characters/${item.character_id}/items/${item.item_id}`, item)
            .then(res => {
                this.props.history.goBack();
            })
            .catch(err => console.log(err));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const item = {
            name: this.state.name,
            description: this.state.description,
            rarity: this.state.rarity,
            character_id: this.state.character_id,
            item_id: this.state.item_id
        }
        if (this.state.createMode) {
            this.addItem(item);
        } else {
            this.updateItem(item);
        }
        event.preventDefault();
    }

    handleCancel(event) {
        console.log("canceled pressed.")
        this.props.history.goBack();
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>
                    {this.state.createMode ? "Create Item" : "Edit Item"}
                </h1>
                <div className="item-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Item Name</label>
                            <input type="text" className="form-control" name="name" id="name" placeholder="Enter Item Name" value={this.state.name} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Item Description</label>
                            <textarea className="form-control" name="description" id="description" value={this.state.description} onChange={this.handleInputChange} rows="6"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rarity">Item Rarity</label>
                            <input type="number" className="form-control" name="rarity" id="rarity" placeholder="Enter Rarity Number" value={this.state.rarity} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">{this.state.createMode ? "Create" : "Save"}</button>
                            <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default ItemForm;
