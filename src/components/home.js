import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';
import leftpad from 'left-pad'

const API_BASE = "http://localhost:3000/";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      items: [],
      character_id: 1,
      value: 0
      // formMode: "new",
      // character: { name: "", job: "", level: 0, player: "" }
    };

    this.loadCharacters = this.loadCharacters.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadItems = this.loadItems.bind(this);

  }

  loadCharacters() {
    axios.get(`${API_BASE}/characters`).then(res => {
      this.setState({characters: res.data});
      console.log(`Characters loaded! = ${this.state.characters}`)
    }).catch(err => console.log(err));
  }

  loadItems() {
    axios.get(`${API_BASE}/characters/${this.state.character_id}/items`).then(res => {
      this.setState({items: res.data});
      console.log(`Items loaded! = ${this.state.items}`)
    }).catch(err => console.log(err));

    axios.get(`${API_BASE}/characters/${this.state.character_id}`).then(res => {
      this.setState({character: res.data});
      console.log(`Character2 loaded! = ${this.state.items}`)
    }).catch(err => console.log(err));
  }

  componentDidMount() {
    console.log("Characters just got mounted")
    this.loadCharacters();
    this.loadItems();
  }

  handleChange(event) {
    console.log(this.state.character_id);
    this.setState({character_id: event.target.value});
    console.log(this.state.character_id);
    this.loadItems();
    console.log(this.state.items);

  }
  render() {

    return (<div>
      <div className="jumbotron">
        <div className="container">
          {/* <h1>Draw your Blade!</h1> */}
          <p>This is a single page app for manageing a character's inventory for Dungeons & Dragons.</p>

        </div>
      </div>
      <table align="center" >

          <td className="col-md-4">Character 1
            <thead>
              <select name="Character 1" onChange={this.handleChange} value={this.state.value}>
                {
                  this.state.characters.map(character => {
                    return <option value={character.character_id} key={character.id}>{character.id}</option>
                  })
                }
              </select>
              <hr></hr>

              <tbody>

                <BootstrapTable data={this.state.items} striped hover bordered = {false}>
                  <TableHeaderColumn dataField='name' width='200' dataSort isKey="isKey">Item Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='description'width='300'>Item Description</TableHeaderColumn>
                  <TableHeaderColumn dataField='rarity' width='100'>Item Rarity</TableHeaderColumn>
                </BootstrapTable>

              </tbody>

              <p>{this.state.character_id}</p>

            </thead>

          </td>
          {/* <td className="col-md-4">BUTTONS FOR TRADE
            <thead></thead>
          </td> */}
          <td className="col-md-4">Character 2
            <thead>
              <select name="Character 2" onChange={this.handleChange} value={this.state.value}>
                {
                  this.state.characters.map(character => {
                    return <option value={character.character_id} key={character.id}>{character.id}</option>
                  })
                }
              </select>
              <hr></hr>

              <tbody>

                <BootstrapTable data={this.state.items} striped hover bordered = {false}>
                  <TableHeaderColumn dataField='name' width='200' dataSort isKey="isKey">Item Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='description'width='300'>Item Description</TableHeaderColumn>
                  <TableHeaderColumn dataField='rarity' width='100'>Item Rarity</TableHeaderColumn>
                </BootstrapTable>

              </tbody>

              <p>{this.state.character_id}</p>

            </thead>

          </td>

      </table>
    </div>);
  }
}

export default Home;
