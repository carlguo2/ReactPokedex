import React from 'react';
import PropTypes from 'prop-types'
import {
    Link,
} from "react-router-dom";
import { Image } from 'semantic-ui-react'
import './SearchResults.scss';

class SearchResults extends React.Component {
    render() {
        // sort array again after change detected and re-render
        chooseSort(this.props.sortType, 
            this.props.selectedBtn, 
            this.props.filteredResults);

        return (
            <div className="search-result-container">
                {this.props.filteredResults.map((result) => (
                    <div key={result.name} className="poke-container">
                        <div className="img-container">
                            <Link to={"/mp2/pokemon/" + parseId(result.url)}>
                                <Image src={this.props.spriteUrl + parseId(result.url) + ".png"}
                                        alt="sprite for pokemon" />
                            </Link>
                        </div>
                        <div className="poke-text">
                            <div>
                                {result.name}
                            </div>
                            <div>
                                No. {parseId(result.url)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

SearchResults.propTypes = {
    filteredResults: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string
        })
    ), 
    sortType: PropTypes.string,
    selectedBtn: PropTypes.string,
    spriteUrl: PropTypes.string
};

/**
 * Choose which sortType to sort filteredResults by
 * @param {String} sortType category we want to sort by
 * @param {String} selectedBtn order to sort by
 * @param {Array} filteredResults array of values retrieved from API
 */
function chooseSort(sortType, selectedBtn, filteredResults) {
    if (sortType === "name") {
        sortByName(selectedBtn, filteredResults);
    } else {
        sortById(selectedBtn, filteredResults);
    }    
}

/**
 * 
 * @param {String} selectedBtn order to sort by
 * @param {Array} filteredResults 
 */
function sortByName(selectedBtn, filteredResults) {
    if (Array.isArray(filteredResults)) {
        if (selectedBtn === "asc") {
            filteredResults.sort(function(a, b){
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
        } else {
            filteredResults.sort(function(a, b){
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
        }
    }
}

/**
 * Sort filteredResults in the order of selectedBtn
 * @param {String} selectedBtn Order to sort filteredResults by
 * @param {Array} filteredResults Array we want to sort
 */
function sortById(selectedBtn, filteredResults) {
    // code from: https://www.w3schools.com/jsref/jsref_sort.asp
    if (Array.isArray(filteredResults)) {
        if (selectedBtn === "asc") {
            filteredResults.sort(function(a, b){
                var aId = parseId(a.url);
                var bId = parseId(b.url);
                return aId - bId;
            });
        } else {
            filteredResults.sort(function(a, b){
                var aId = parseId(a.url);
                var bId = parseId(b.url);
                return bId - aId;
            });
        }
    }
}

/**
 * Parse the full pokeUrl to get integer id portion
 * @param {String} pokeUrl full url of specific pokemon
 */
function parseId (pokeUrl) {
    var offsetStr = "pokemon/";
    var idIndex = pokeUrl.indexOf(offsetStr) + offsetStr.length;
    return parseInt(pokeUrl.substring(idIndex));
}

export default SearchResults;