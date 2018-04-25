import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_BASE = 'http://localhost:3000/';
// const API_BASE = "https://still-forest-88986.herokuapp.com/";
const ItemItem = (props) => {
    return (
        <tr>
            <td className="col-md-2">{props.name}</td>
            <td className="col-md-3">{props.description}</td>
            <td className="col-md-1">{props.rarity}</td>
            <td className="col-md-3 btn-toolbar">
                <Link to={`/characters/${props.character_id}/items/${props.id}`}>
                    <button className="btn btn-success btn-sm">
                        <i className="glyphicon glyphicon-pencil"></i> Edit
            </button>
                </Link>
                <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
                    <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
            </td>
        </tr>
    );
}

class Items extends React.Component {

    constructor(props) {
        super(props);
        const id = props.match.params.id;
        this.state = {
            items: [],
            character_id: id,
            character: {}
        };

        this.loadItems = this.loadItems.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    loadItems() {
        axios
            .get(`${API_BASE}/characters/${this.state.character_id}/items`)
            .then(res => {
                this.setState({ items: res.data });
                console.log(`Data loaded! = ${this.state.items}`)
            })
            .catch(err => console.log(err));

        axios
            .get(`${API_BASE}/characters/${this.state.character_id}`)
            .then(res => {
                this.setState({ character: res.data });
                console.log(`Data loaded! = ${this.state.items}`)
            })
            .catch(err => console.log(err));
    }

    deleteItem(id) {
        let filteredArray = this.state.items.filter(item => item.id !== id)
        this.setState({ items: filteredArray });
        axios
            .delete(`${API_BASE}/characters/${this.state.character_id}/items/${id}`)
            .then(res => {
                console.log(`Record Deleted`);
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        console.log('Items acquired!')
        this.loadItems();
    }

    render() {

        const itemItems = this.state.items.map((item) => {
            return (
                <ItemItem
                    name={item.name}
                    description={item.description}
                    rarity={item.rarity}
                    character_id={item.character_id}
                    id={item.id}
                    key={item.id}
                    onDelete={this.deleteItem}
                />
            )
        });

        const headerString = (this.state.items.count === 0)
            ? "Loading..." : `Items acquired by ${this.state.character.name} the ${this.state.character.job}`
        return (
            <div className="items">
                <h1> {headerString} </h1>
                <div className="character-list">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="col-md-3">Item Name</th>
                                <th className="col-md-3">Description</th>
                                <th className="col-md-3">Rarity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemItems}
                        </tbody>
                    </table>
                    <Link to={`/characters/${this.state.character_id}/items/create`}>
                        <button className="btn btn-success btn-sm">
                            <i className="glyphicon glyphicon-plus"></i> Create
              </button>
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => this.props.history.goBack()}>
                        <i className="glyphicon glyphicon-menu-left"></i> Back
          </button>
                </div>
            </div>
        );
    }
}

export default Items;