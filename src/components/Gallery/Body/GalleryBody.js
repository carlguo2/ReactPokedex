import React from "react";
import PropTypes from 'prop-types'
import {
    Link,
} from "react-router-dom";
import { Image, Button } from 'semantic-ui-react'
import "./GalleryBody.scss"

class GalleryBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // use int to keep track of filter:
            // 0 - no filter, 1 - pokedex no. 1-30, 2 - pokedex no. 31-60
            // 3 - pokedex no. 61-90, 4 - pokedex no. 91-120, 5 - pokedex no. 121-151
            filterCode: "0",
            // state keeps track of result to be filtered
            filteredResult: [],
        };

        this.handleFilterEvent = this.handleFilterEvent.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.filterCode === "0") {
            return({
                filteredResult: Array.from(props.results)
            });
        } else if (state.filterCode === "1") { // 1-30
            return({
                filteredResult: props.results.filter (pokemon => {
                    var id = props.parseId(pokemon.url);
                    return id >= 1 && id <= 30;
                })
            });
        } else if (state.filterCode === "2") {  // 31 - 60            
            return({
                filteredResult : props.results.filter (pokemon => {
                    var id = props.parseId(pokemon.url);
                    return id >= 31 && id <= 60;
                })
            });
        } else if (state.filterCode === "3") {  // 61 - 90
            return({
                filteredResult: props.results.filter (pokemon => {
                    var id = props.parseId(pokemon.url);
                    return id >= 61 && id <= 90;
                })
            });
        } else if (state.filterCode === "4") {  // 91 - 120
            return({
                filteredResult: props.results.filter (pokemon => {
                    var id = props.parseId(pokemon.url);
                    return id >= 91 && id <= 120;
                })
            });
        } else if (state.filterCode === "5") {  // 121 - 151
            return({
                filteredResult: props.results.filter (pokemon => {
                    var id = props.parseId(pokemon.url);
                    return id >= 121 && id <= 151;
                })
            });
        }    
    }

    /**
     * onClick function that checks if button clicked or not 
     */
    handleFilterEvent(event) {
        const { value } = event.target;
        this.setState({ filterCode: value});
    }

    /**
     * Component with all the buttons set with onClick function
     */
    filterButtons() {
        return ( 
            <div className="filter-btns">
                <span>
                    <Button color="grey" value="0" onClick={this.handleFilterEvent}>
                        Reset
                    </Button>
                </span>
                <span>
                    <Button color="orange" value="1" onClick={this.handleFilterEvent}>
                        1-30
                    </Button>
                </span>
                <span>
                    <Button color="green" value="2" onClick={this.handleFilterEvent}>
                        31-60
                    </Button>
                </span>
                <span>
                    <Button color="brown" value="3" onClick={this.handleFilterEvent}>
                        61-90
                    </Button>
                </span>
                <span>
                    <Button color="twitter" value="4" onClick={this.handleFilterEvent}>
                        91-120
                    </Button>
                </span>    
                <span>
                    <Button color="youtube" value="5" onClick={this.handleFilterEvent}>
                        121-151
                    </Button>
                </span>
            </div>
        )
    }

    /**
     * sets state of filteredResult based on new filteredCode
     */
    filterArray() {
        if (this.state.filterCode === "0") {
            this.setState({
                filteredResult: Array.from(this.props.results)
            });
        } else if (this.state.filterCode === "1") { // 1-30
            this.setState({
                filteredResult: this.props.results.filter (pokemon => {
                    var id = this.props.parseId(pokemon.url);
                    return id >= 1 && id <= 30;
                })
            });
        } else if (this.state.filterCode === "2") {  // 31 - 60            
            this.setState({
                filteredResult : this.props.results.filter (pokemon => {
                    var id = this.props.parseId(pokemon.url);
                    return id >= 31 && id <= 60;
                })
            });
        } else if (this.state.filterCode === "3") {  // 61 - 90
            this.setState({
                filteredResult: this.props.results.filter (pokemon => {
                    var id = this.props.parseId(pokemon.url);
                    return id >= 61 && id <= 90;
                })
            });
        } else if (this.state.filterCode === "4") {  // 91 - 120
            this.setState({
                filteredResult: this.props.results.filter (pokemon => {
                    var id = this.props.parseId(pokemon.url);
                    return id >= 91 && id <= 120;
                })
            });
        } else {  // 121 - 151
            this.setState({
                filteredResult: this.props.results.filter (pokemon => {
                    var id = this.props.parseId(pokemon.url);
                    return id >= 121 && id <= 151;
                })
            });
        }
    }

    render() {
        return (
            <div className="gallery-body-container">
                {this.filterButtons()}
                {this.state.filteredResult.map(result => (
                    <div key={result.name} className="poke-container">
                        <div className="img-container">
                            <Link to={"/mp2/pokemon/" + this.props.parseId(result.url)}>
                                <Image src={this.props.spriteUrl + this.props.parseId(result.url) + ".png"}
                                        alt="sprite for pokemon" />
                            </Link>
                        </div>
                        <div className="poke-text">
                            <div>
                                {result.name}
                            </div>
                            <div>
                                No. {this.props.parseId(result.url)}
                            </div>
                        </div>   
                    </div>
                ))}
            </div>
        );
    }
}



GalleryBody.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string
        })
    ),
    spriteUrl: PropTypes.string,
    parseId: PropTypes.func
};

export default GalleryBody;