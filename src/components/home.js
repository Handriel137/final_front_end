import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';
import leftpad from 'left-pad';
import Select from 'react-select';

const API_BASE = "http://localhost:3000/";
// const API_BASE = "https://safe-bastion-97280.herokuapp.com/";

class ActiveFormatter extends React.Component {

  sendSomething(props) {
    console.log("Printing things!");

  }

  render() {
    return (<button type='button' onClick={this.sendSomething}>trade {this.props.id}
      {this.props.character_id}</button>);
  }
}

function activeFormatter(cell, row) {
  return (<ActiveFormatter item={row.id} character={row.character_id}/>);
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      items1: [],
      items2: [],
      character_id: 1,
      character_id_1: 1,
      character_id_2: 1,
      value: 0,
      selectedOption: ''
    };

    this.loadCharacters = this.loadCharacters.bind(this);
    // this.handleChangeCharacterOne = this.handleChangeCharacterOne.bind(this);
    // this.handleChangeCharacterTwo = this.handleChangeCharacterTwo.bind(this);
    this.loadItems1 = this.loadItems1.bind(this);
    this.loadItems2 = this.loadItems2.bind(this);

  }

  loadCharacters() {
    axios.get(`${API_BASE}/characters`).then(res => {
      this.setState({characters: res.data});
      console.log(`Characters loaded! = ${this.state.characters}`)
    }).catch(err => console.log(err));
  }

  loadItems1() {
    axios.get(`${API_BASE}/characters/${this.state.character_id_1}/items`).then(res => {
      this.setState({items1: res.data});
      console.log(`Items loaded 2! = 1 ${this.state.items1}`)
    }).catch(err => console.log(err));

  }

  loadItems2() {
    axios.get(`${API_BASE}/characters/${this.state.character_id_2}/items`).then(res => {
      this.setState({items2: res.data});
      console.log(`Items loaded 2! = ${this.state.items2}`)
    }).catch(err => console.log(err));

  }
  componentDidMount() {
    console.log("Characters just got mounted")
    this.loadCharacters();
    this.loadItems1();
    this.loadItems2();
  }

  // handleChangeCharacterOne(event) {
  //   console.log(this.state.character_id);
  //   this.setState({character_id_1: event.target.value});
  //   console.log(this.state.character_id_1);
  //
  //   axios.get(`${API_BASE}/characters/${this.state.character_id_1}/items`).then(res => {
  //     this.setState({items1: res.data});
  //     console.log(`Character 1's Items loaded! = ${this.state.items1}`)
  //   }).catch(err => console.log(err));
  //
  //    this.loadItems();
  //   console.log(this.state.items);
  //
  // }
  //
  // handleChangeCharacterTwo(event) {
  //   this.setState(this.state);
  //   console.log(this.state.character_id_2);
  //   this.setState({character_id_2: event.target.value});
  //   console.log(this.state.character_id_2);
  //
  //   axios.get(`${API_BASE}/characters/${this.state.character_id_2}/items`).then(res => {
  //     this.setState({items2: res.data});
  //     console.log(`Character 2's Items loaded! = ${this.state.items2}`)
  //   }).catch(err => console.log(err));
  //
  //    this.loadItems();
  //   console.log(this.state.items2);
  //
  // }

  getItems1() {
    this.setState({character_id_1: this.refs.characterSelector1.value})

    // console.log(this.refs.characterSelector.value);
    // console.log(this.state.character_id_1);
    axios.get(`${API_BASE}/characters/${this.refs.characterSelector1.value}/items`).then(res => {
      this.setState({items1: res.data});
      console.log(`Items loaded 1! = ${this.state.items1}`)
    }).catch(err => console.log(err));
    console.log(this.state.items1)
  }

  getItems2() {
    this.setState({character_id_2: this.refs.characterSelector2.value})

    // console.log(this.refs.characterSelector.value);
    // console.log(this.state.character_id_2);
    axios.get(`${API_BASE}/characters/${this.refs.characterSelector2.value}/items`).then(res => {
      this.setState({items2: res.data});
      console.log(`Items loaded 2! = ${this.state.items2}`)
    }).catch(err => console.log(err));
    // console.log(this.state.items2)
  }

  render() {

    var characters = this.state.characters.map(character => {
      return <option key={character.id} value={character.id}>{character.name}</option>
    })

    const divStyle = {
      color: 'White',
      backgroundImage: 'url(https://s-media-cache-ak0.pinimg.com/originals/a9/3f/9f/a93f9fc8f5e5ae4371e6f7b04487873e.jpg)'
    };

    return (<div>
      <div className="jumbotron" style = {divStyle}>
        <div className="container">
           <h1>Draw your Blade!</h1>
          <p>This is a single page app for manageing a character's inventory for Dungeons & Dragons.</p>


          </div>
      </div>
      <table align="center">

        <td className="col-md-4">Character 1 < thead > <select ref="characterSelector1" onChange={(e) => {
              this.getItems1();
            }}>{characters}</select>
          <hr></hr>

          <tbody>

            <BootstrapTable data={this.state.items1} striped="striped" hover="hover" bordered={false}>
              <TableHeaderColumn dataField='name' width='200' dataSort="dataSort" isKey="isKey">Item Name</TableHeaderColumn>
              <TableHeaderColumn dataField='description' width='300'>Item Description</TableHeaderColumn>
              <TableHeaderColumn dataField='rarity' width='100'>Item Rarity</TableHeaderColumn>
              <TableHeaderColumn dataFormat={activeFormatter}>
                Buttons
              </TableHeaderColumn>
            </BootstrapTable>

          </tbody>

          <p>{this.state.character_id_1}</p>

        </thead>

      </td>

      <td className="col-md-4">Character 2 < thead > <select ref="characterSelector2" onChange={(e) => {
              this.getItems2();
            }}>{characters}</select>

          <hr></hr>

          <tbody>

            <BootstrapTable data={this.state.items2} striped="striped" hover="hover" bordered={false}>
              <TableHeaderColumn dataField='name' width='200' dataSort="dataSort" isKey="isKey">Item Name</TableHeaderColumn>
              <TableHeaderColumn dataField='description' width='300'>Item Description</TableHeaderColumn>
              <TableHeaderColumn dataField='rarity' width='100'>Item Rarity</TableHeaderColumn>
              <TableHeaderColumn dataFormat={activeFormatter}>
                Buttons
              </TableHeaderColumn>
            </BootstrapTable>

          </tbody>

        </thead>

      </td>

    </table>
  </div>);
  }
}

export default Home;
