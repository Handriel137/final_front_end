import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';
import leftpad from 'left-pad'

// const API_BASE = "http://localhost:3000/";
const API_BASE = "https://safe-bastion-97280.herokuapp.com/";

class ActiveFormatter extends React.Component {

  sendSomething(props){
    console.log("Stupid functions are stupid");
    console.log(props.character)
  }

  render() {
return (
  <button type='button' onClick={this.sendSomething}>trade {this.props.id}
    {this.props.character_id}</button>
);
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
      value: 0
      // formMode: "new", character: { name: "", job: "", level: 0, player: "" }
    };

    this.loadCharacters = this
      .loadCharacters
      .bind(this);
    this.handleChangeCharacterOne = this
      .handleChangeCharacterOne
      .bind(this);
    this.handleChangeCharacterTwo = this
      .handleChangeCharacterTwo
      .bind(this);
    this.loadItems1 = this
      .loadItems1
      .bind(this);
      this.loadItems2 = this
      .loadItems2
      .bind(this);

  }

  loadCharacters() {
    axios
      .get(`${API_BASE}/characters`)
      .then(res => {
        this.setState({characters: res.data});
        console.log(`Characters loaded! = ${this.state.characters}`)
      })
      .catch(err => console.log(err));
  }

  loadItems1() {
    axios
      .get(`${API_BASE}/characters/${this.state.character_id_1}/items`)
      .then(res => {
        this.setState({items1: res.data});
        console.log(`Items loaded! = 1 ${this.state.items1}`)
      })
      .catch(err => console.log(err));

    // axios
    //   .get(`${API_BASE}/characters/${this.state.character_id_1}`)
    //   .then(res => {
    //     this.setState({character: res.data});
    //     console.log(`Character loaded! = ${this.state.items1}`)
    //   })
    //   .catch(err => console.log(err));
  }

loadItems2() {
  axios
    .get(`${API_BASE}/characters/${this.state.character_id_2}/items`)
    .then(res => {
      this.setState({items2: res.data});
      console.log(`Items loaded! = ${this.state.items2}`)
    })
    .catch(err => console.log(err));

  // axios
  //   .get(`${API_BASE}/characters/${this.state.character_id_2}`)
  //   .then(res => {
  //     this.setState({character: res.data});
  //     console.log(`Character loaded! = ${this.state.items2}`)
  //   })
  //   .catch(err => console.log(err));
}
  componentDidMount() {
    console.log("Characters just got mounted")
    this.loadCharacters();
    this.loadItems1();
    this.loadItems2();
  }

  handleChangeCharacterOne(event) {
    console.log(this.state.character_id);
    this.setState({character_id_1: event.target.value});
    console.log(this.state.character_id_1);

    axios
      .get(`${API_BASE}/characters/${this.state.character_id_1}/items`)
      .then(res => {
        this.setState({items1: res.data});
        console.log(`Character 1's Items loaded! = ${this.state.items1}`)
      })
      .catch(err => console.log(err));

    // this.loadItems();
    console.log(this.state.items);

  }

  handleChangeCharacterTwo(event) {
    this.setState(this.state);
    console.log(this.state.character_id_2);
this.setState({character_id_2: event.target.value});
    console.log(this.state.character_id_2);

    axios
      .get(`${API_BASE}/characters/${this.state.character_id_2}/items`)
      .then(res => {
        this.setState({items2: res.data});
        console.log(`Character 2's Items loaded! = ${this.state.items2}`)
      })
      .catch(err => console.log(err));

    // this.loadItems();
    console.log(this.state.items2);

  }


  render() {

    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <h1>Draw your Blade!</h1>
            <p>This is a single page app for manageing a character's inventory for Dungeons
              & Dragons.</p>

          </div>
        </div>
        <table align="center">

          <td className="col-md-4">Character 1
            <thead>
              <select
                name="Character 1"
                onChange={this.handleChangeCharacterOne}
                value={this.state.character_id_1}>
                {this
                  .state
                  .characters
                  .map(character => {
                    return <option value={character.id} key={character.id}>{character.name}</option>
                  })
}
              </select>
              <hr></hr>

              <tbody>

                <BootstrapTable data={this.state.items1} striped hover bordered={false}>
                  <TableHeaderColumn dataField='name' width='200' dataSort isKey="isKey">Item Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='description' width='300'>Item Description</TableHeaderColumn>
                  <TableHeaderColumn dataField='rarity' width='100'>Item Rarity</TableHeaderColumn>
                  <TableHeaderColumn dataFormat = {activeFormatter}> Buttons </TableHeaderColumn>
                </BootstrapTable>

              </tbody>

              <p>{this.state.character_id_1}</p>

            </thead>

          </td>
          {/* <td className="col-md-4">BUTTONS FOR TRADE
            <thead></thead>
          </td> */}
          <td className="col-md-4">Character 2
            <thead>
              <select
                name="Character 2"
                onChange={this.handleChangeCharacterTwo}
                value={this.state.character_id_2}>
                {this
                  .state
                  .characters
                  .map(character => {
                    return <option value={character.id} key={character.id}>{character.name}</option>
                  })
}
              </select>
              <hr></hr>

              <tbody>

                <BootstrapTable data={this.state.items2} striped hover bordered={false}>
                  <TableHeaderColumn dataField='name' width='200' dataSort isKey="isKey">Item Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='description' width='300'>Item Description</TableHeaderColumn>
                  <TableHeaderColumn dataField='rarity' width='100'>Item Rarity</TableHeaderColumn>
                  <TableHeaderColumn dataFormat = {activeFormatter}> Buttons </TableHeaderColumn>
                </BootstrapTable>

              </tbody>

              <p>{this.state.character_id_2}</p>

            </thead>

          </td>

        </table>
      </div>
    );
  }
}

export default Home;
