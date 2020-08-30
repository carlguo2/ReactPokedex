import React from "react";
import GalleryHeader from "../Header/GalleryHeader"
import GalleryBody from "../Body/GalleryBody"
import axios from "axios"; 

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        }
    }

    componentDidMount() {
        this.fetchSearchResults();
    }

    /**
    * Fetches search results from PokeAPI and updates state with result
    */
    fetchSearchResults() {
        // url to get all original 151 pokemon
        const searchUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";
        // make new GET call with url
        axios.get(searchUrl)
        .then((response) => {   
            var sortedResults = response.data.results;
            sortedResults.sort(function(a, b) {
                var aId = parseId(a.url);
                var bId = parseId(b.url);
                return aId - bId;
            });

            this.setState({
                results: sortedResults
            });
        })
        .catch((error) => {
            // check if error with api call or cancellation token
            if (axios.isCancel(error) || error) {
                alert("Failed to fetch results")
            }
            console.log(error)
        });
    }

    render() {
        return(
            <div>
                <GalleryHeader />
                <GalleryBody 
                    results={this.state.results}
                    spriteUrl={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'}
                    parseId={parseId}/>
            </div>
        );
    }
}

/**
 * Parse the integer id portion of pokeUrl
 * @param {String} pokeUrl full pokemon url  
 */
function parseId (pokeUrl) {
    var offsetStr = "pokemon/";
    var idIndex = pokeUrl.indexOf(offsetStr) + offsetStr.length;
    return parseInt(pokeUrl.substring(idIndex));
}

export default Gallery