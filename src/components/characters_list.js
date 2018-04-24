import React from 'react';
import { Link } from 'react-router-dom';

const CharacterListItem = (props) => {
    return (
        <tr>
            <td className="col-md-3">{props.name}</td>
            <td className="col-md-3">{props.job}</td>
            <td className="col-md-3">{props.level}</td>
            <td className="col-md-3">{props.player}</td>
            <td className="col-md-3 btn-toolbar">
                <Link to={`/characters/${props.id}/items`}>
                    <button className="btn btn-success btn-sm">
                        <i className="glyphicon glyphicon-list"></i> Items
        </button>
                </Link>
                <button className="btn btn-success btn-sm" onClick={event => props.onEdit("edit", props)}>
                    <i className="glyphicon glyphicon-pencil"></i> Edit
      </button>
                <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
                    <i className="glyphicon glyphicon-remove"></i> Delete
      </button>
            </td>
        </tr>
    );
}

const CharacterList = (props) => {
    const characterItems = props.characters.map((character) => {
        return (
            <CharacterListItem
                name={character.name}
                job={character.job}
                level={character.level}
                player={character.player}
                id={character.id}
                key={character.id}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
            />
        )
    });

    return (
        <div className="character-list">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="col-md-3">Character Name</th>
                        <th className="col-md-3">Job Title</th>
                        <th className="col-md-3">Character Level</th>
                        <th className="col-md-3">Player Name</th>
                        <th className="col-md-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {characterItems}
                </tbody>
            </table>
        </div>
    );
}

export default CharacterList;