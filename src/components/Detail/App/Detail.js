import React from "react";
import DetailHeader from "../Header/DetailHeader";
import DetailProfile from "../Body/DetailProfile";
import {
    Link,
  } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react"
import PropTypes from "prop-types";
import axios from "axios"
import "./Detail.scss"

class Detail extends React.Component {
    constructor(props) {
        super(props);
        // all the information we want our detail view to have
        this.state = {
            name: "",
            height: 0,
            weight: 0,
            abilities: [],
            spriteUrl: "",
            types: [],
        }
    }

    /**
     * When the Detail component starts up, fetch info to populate body
     */
    componentDidMount() {
        var id = this.props.match.params.id;
        this.fetchPokemon(this.props.url, id);
    }

    /**
     * Checks if current id is different than previous. 
     * When id gets updated, make sure page re-renders and re-fetches data.
     */
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchPokemon(this.props.url, this.props.match.params.id);
        }
    }

    /**
     * 
     * @param {String} url Common url substring in api call
     * @param {String} id url id specifier for GET request of pokemon
     */
    fetchPokemon(url, id) {
        const searchUrl = url + id;
        // make your GET request
        axios.get(searchUrl)
            .then((response) => {                
                this.setState({
                    name: response.data.name,
                    height: response.data.height,
                    weight: response.data.weight,
                    abilities: response.data.abilities,
                    spriteUrl: response.data.sprites.front_default,
                    types: response.data.types   
                });
            })
            .catch((error) => {
                alert("Failed to fetch results");
                console.log(error);
            });
    }

    render() {
        return(
            <div>
                <DetailHeader />
                <div>
                    <DetailProfile id={this.props.match.params.id}
                                    name={this.state.name}
                                    height={this.state.height}
                                    weight={this.state.weight}
                                    abilities={this.state.abilities}
                                    locationsUrl={this.state.locations}
                                    spriteUrl={this.state.spriteUrl}
                                    types={this.state.types} />

                    <div className="detail-btns">
                        <span className="detail-link-btn">
                            <Link to={"/mp2/pokemon/" + navBackId(this.props.match.params.id, 1, 151)}>
                                    <Button className="navBtn" size="big">
                                        <Icon name="caret left" />
                                    </Button>
                            </Link>
                        </span>

                        <span className="detail-link-btn">
                            <Link to={"/mp2/pokemon/" + navNextId(this.props.match.params.id, 1, 151)}>
                                <Button className="navBtn" size="big">
                                    <Icon name="caret right"/>
                                </Button>
                            </Link>
                        </span>

                    </div>

                </div>

            </div>
        );
    }
}

Detail.propTypes = {
    url: PropTypes.string
};

/**
 * Move back a Pokedex ID for the next Pokemon
 * If at the smallest ID possible, wrap around to upper limit
 * @param {current Pokemon id of detail view} id 
 * @param {Low limit of pokemon we can search} lowerLim 
 * @param {Upper limit of pokemon we can search} upperLim 
 */
function navBackId(id, lowerLim, upperLim) {
    var newId = parseInt(id) - 1;
    if (newId < lowerLim) {
        return upperLim;
    }
    return newId;
}

/**
 * Move forward a Pokedex ID for the next Pokemon
 * If at the highest ID possible, wrap back to low limit
 * @param {current Pokemon id of detail view} id 
 * @param {Low limit of pokemon we can search} lowerLim 
 * @param {Upper limit of pokemon we can search} upperLim 
 */
function navNextId(id, lowerLim, upperLim) {
    var newId = parseInt(id) + 1;
    if (newId > upperLim) {
        return lowerLim;
    }
    return newId;
} 

export default Detail;