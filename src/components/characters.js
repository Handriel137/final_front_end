import React from 'react';
import CharacterForm from './character_form';
import CharacterList from './character_list';
import axios from 'axios';
const API_BASE = "http://localhost:3000/";
// const API_BASE = "https://still-forest-88986.herokuapp.com/";

class Characters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            formMode: "new",
            character: { name: "", job: "", level: 0, player: "" }
        };
        this.loadCharacters = this.loadCharacters.bind(this);
        this.removeCharacter = this.removeCharacter.bind(this);
        this.addCharacter = this.addCharacter.bind(this);
        this.updateCharacter = this.updateCharacter.bind(this);
    }

    // loadCharacters() {
    //   this.setState({
    //     characters: [
    //       {id: 1, name: "Alaan", job: "Paladin", level: 5, player: Joe},
    //       {id: 2, name: "Bavir", job: "Artificer", level: 5, player: Andrew},
    //       {id: 3, name: "Vorick", job: "Fighter", level: 5, player: Alex},
    //       {id: 4, name: "Cade", job: "Druid", level: 5, player: "Robert"},
    //     ]}
    //   );
    // }

    updateForm(mode, characterVals) {
        this.setState({
            character: Object.assign({}, characterVals),
            formMode: mode,
        });
    }

    clearForm() {
        console.log("clear form");
        this.updateForm("new", { name: "", job: "", level: 0, player: "" });
    }

    formSubmitted(character) {
        if (this.state.formMode === "new") {
            this.addCharacter(character);
        } else {
            this.updateCharacter(character);
        }
        this.clearForm();
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

    addCharacter(newCharacter) {
        axios
            .post(`${API_BASE}/characters`, newCharacter)
            .then(res => {
                res.data.key = res.data.id;
                this.setState({ characters: [...this.state.characters, res.data] });
            })
            .catch(err => console.log(err));
    }

    updateCharacter(character) {
        axios
            .put(`${API_BASE}/characters/${character.id}`, character)
            .then(res => {
                this.loadCharacters();
            })
            .catch(err => console.log(err));
    }

    removeCharacter(id) {
        let filteredArray = this.state.characters.filter(item => item.id !== id)
        this.setState({ characters: filteredArray });
        axios
            .delete(`${API_BASE}/characters/${id}`)
            .then(res => {
                console.log(`Record Deleted`);
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        console.log("Characters just got mounted")
        this.loadCharacters();
    }

    render() {
        return (
            <div className="characters">
                <CharacterForm
                    onSubmit={(character) => this.formSubmitted(character)}
                    onCancel={(mode, character) => this.updateForm(mode, character)}
                    formMode={this.state.formMode}
                    character={this.state.character}
                />
                <CharacterList
                    characters={this.state.characters}
                    onDelete={(id) => this.removeCharacter(id)}
                    onEdit={(mode, character) => this.updateForm(mode, character)}
                />
            </div>
        );
    }
}

export default Characters;