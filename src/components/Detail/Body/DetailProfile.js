import React from "react";
import PropTypes from "prop-types";
import "./DetailProfile.scss"

class DetailProfile extends React.Component {
    render() {
        return(
            <div className="profile-container">
                <img src={this.props.spriteUrl}  
                    alt="sprite of Pokemon"
                    className="sprite-img" />
                
                <div className="profile-info">
                    <div className="poke-id row row-one-line">
                        <span>
                            {"PokeDex No. "} 
                        </span>
                        <span>
                            {this.props.id}
                        </span>
                    </div>
                    <div className="poke-name row row-one-line">
                        <span>
                            {"Name: "}
                        </span>
                        <span>
                            {this.props.name}
                        </span>
                        
                    </div>
                    <div className="poke-height row row-one-line">
                        <span>
                            {"Height "}
                        </span>
                        <span>
                            {this.props.height + " dm"}
                        </span>
                    </div>
                    <div className="poke-weight row row-one-line">
                        <span>
                            {"Weight: "}
                        </span>
                        <span>
                            {this.props.weight + " hg"}
                        </span>
                    </div>
                    <div className="row ability-list">
                        <span>{"Ability: "}</span>
                        {this.props.abilities.map((entry) => (
                            <span key={entry.ability.name} className="ability ">
                                {entry.ability.name}
                            </span>
                        ))}
                    </div>
                    <div className="row">
                        <span>{"Type: "}</span>
                        <span className="type-list">
                            {this.props.types.map((entry, index) => (
                                <span key={entry.type.name} className={"type " + entry.type.name}>
                                    {entry.type.name}
                                </span>
                            ))}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

DetailProfile.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    height: PropTypes.number,
    weight: PropTypes.number,
    abilities: PropTypes.arrayOf(
        PropTypes.shape({
            is_hidden: PropTypes.bool,
            slot: PropTypes.number,
            ability: PropTypes.shape({
                name: PropTypes.string,
                url: PropTypes.string
            })
        })
    ),
    locationsUrl: PropTypes.string,
    spriteUrl: PropTypes.string,
    types: PropTypes.arrayOf(
        PropTypes.shape({
            slot: PropTypes.number,
            type: PropTypes.shape({
                name: PropTypes.string,
                url: PropTypes.string
            })
        })
    )    
}

export default DetailProfile;