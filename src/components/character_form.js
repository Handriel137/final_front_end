import React from 'react';

class CharacterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            job: "",
            level: 0,
            player: "",
            id: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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
        this.props.onSubmit({
            name: this.state.name,
            job: this.state.job,
            level: this.state.level,
            player: this.state.player,
            id: this.state.id,
        });
        event.preventDefault();
    }

    handleCancel(event) {
        this.props.onCancel("new", { name: "", job: "", level: 0, player: "" });
        event.preventDefault();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.character != null) {
            this.setState({
                name: newProps.character.name,
                job: newProps.character.job,
                level: newProps.character.level,
                player: newProps.character.player,
                id: newProps.character.id,
            });
        }
    }

    renderButtons() {
        if (this.props.formMode === "new") {
            return (
                <button type="submit" className="btn btn-primary">Create</button>
            );
        } else {
            return (
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="character-form">
                <h1> Characters </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Character Name</label>
                        <input type="text" className="form-control" autoComplete='character-name' name="name" id="name" placeholder="First Name" value={this.state.name} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="job">Class Name</label>
                        <input type="text" className="form-control" autoComplete='job-name' name="job" id="job" placeholder="Last Name" value={this.state.job} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="level">Character Level</label>
                        <input type="level" className="form-control" autoComplete='character-level' name="level" id="level" placeholder="1" value={this.state.level} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="player">Player Name</label>
                        <input type="player" className="form-control" autoComplete='player-name' name="player" id="player" placeholder="Your Name" value={this.state.player} onChange={this.handleInputChange} />
                    </div>
                    {this.renderButtons()}
                </form>
            </div>
        );
    }
}

export default CharacterForm;