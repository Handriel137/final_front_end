import React from 'react';
import axios from 'axios';

const API_BASE = "http://localhost:3000/";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            items: [],
            character_id_1: "",
            character_id_2: "",
            value: 0
            // formMode: "new",
            // character: { name: "", job: "", level: 0, player: "" }
        };
        
        this.loadCharacters = this.loadCharacters.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        
    }
   

    handleChange(event) {

        this.setState({character_id_1: event.target.value});
        console.log(this.state.character_id_1);
        // axios
        //     .get(`${API_BASE}/characters/${this.state.character_id}/items`)
        //     .then(res => {
        //         this.setState({ items: res.data });
        //         console.log(`Data loaded! = ${this.state.items}`)
        //     })
        //     .catch(err => console.log(err));
        // this.setState({ value: event.target.value });


    }

    loadCharacters() {
        axios
            .get(`${API_BASE}/characters`)
            .then(res => {
                this.setState({ characters: res.data });
                console.log(`Data loaded! = ${this.state.characters}`)
            })
            .catch(err => console.log(err));
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

    componentDidMount() {
        console.log("Characters just got mounted")
        this.loadCharacters();
    }

    render() {
      
        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1>Draw your Blade!</h1>
                        <p>This is a single page app for manageing a character's inventory for Dungeons & Dragons.</p>
                       
                    </div>
                </div>
                <table align="center">
                    <tr>
                        <td className="col-md-4">Character 1
                            <thead>
                                <select name = "Character 1" onChange={this.handleChange} value={this.state.value}>
                                    {this.state.characters.map(character => {
                                            return <option value={character.character_id} key={character.name}>{character.name}</option>
                                        })
                                        
                                    }
                                </select>

                                
                                <p>{this.state.character_id_1}</p>
                            </thead>


                        </td>
                        <td className="col-md-4">BUTTONS FOR TRADE
                            <thead>
                                
                            </thead>
                        </td>
                        <td className="col-md-4">Character 2
                            <thead>
                                <select>
                                    {
                                        this.state.characters.map(character => {
                                            return <option value={character.name} key={character.name} >{character.name}</option>
                                        })
                                    }
                                </select>
                            </thead>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}


export default Home;