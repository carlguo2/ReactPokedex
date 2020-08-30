import React from "react";
import SearchResult from "../Results/SearchResults";
import { Input, Dropdown, Form, Radio } from 'semantic-ui-react'
import axios from "axios";
import "./SearchSection.scss"

// got search idea from React demo and 
class SearchSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            query: '', 
            sortType: 'name', 
            selectedBtn: 'asc',
            results: [] }
        // onChange for search query
        this.handleQueryChange = this.handleQueryChange.bind(this);
        // onChange for dropdown menu
        this.handleSelChange = this.handleSelChange.bind(this);
        // onChange for radio buttons
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.cancel = '';
    }

    /**
     * Update state according to query change.
     * Update search results accordingly as well.
     */
    handleQueryChange(event) {
        // experiment
        const { value } = event.target;

        if (value === '') {
            this.setState(
                { 
                    query: value, 
                    results: [] 
                }
            );
        } else {
            this.setState({ query: value }, () => {
                    this.fetchSearchResults(value)
                }    
            );
        }
    }

    /**
     * Update state with value of newly selected sortType
     */
    handleSelChange(event, data) {
        this.setState({sortType: data.value});
    }

    /**
     * Update option with value of newly selected selectedBtn
     */
    handleOptionChange(event) {
        this.setState({selectedBtn: event.target.value})
    }

    /**
    * Fetches search results from PokeAPI and updates state with result
    * @param {String} query Search query 
    */
    fetchSearchResults(query) {
        // url to get all original 151 pokemon
        const searchUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";
        // check if cancel is no longer empty and needs to cancel previous token
        if (this.cancel) {
            this.cancel.cancel();
        }
        // get the token to be cancelled
        this.cancel = axios.CancelToken.source();

        // make new GET call with url
        axios.get(searchUrl, {
            cancelToken: this.cancel.token,
        })
        .then((response) => {   // use arrow call to use "this" to refer to component in axios call
            // check if number of search results is greater than or equal to zero
            // filter the JSON
            const results = response.data.results;
            const filtered = results.filter(pokemon => (
                pokemon.name.toLowerCase().includes(query.toLowerCase())
            ));

            // update the state
            this.setState({ results: filtered });
        })
        .catch((error) => {
            // check if error with api call or cancellation token
            if (axios.isCancel(error) || error) {
                alert("Failed to fetch results");
            }
            console.log(error);
        });
    }

    render() {
        return(
            <div>
                <div className="search">
                    <Input className="search-input" 
                            onChange={this.handleQueryChange}
                            placeholder="Search..."
                            label="Search:"
                            size="large" />  

                    <div className="break" />

                    <Form>
                        <Form.Field>
                            <Radio 
                                id="asc" 
                                name="sortBtn"
                                value="asc"
                                checked={this.state.selectedBtn === "asc"} 
                                onChange={this.handleOptionChange}
                                className="sortBtn" 
                                label="sort ascending" />

                            <Radio 
                                id="desc" 
                                name="sortBtn" 
                                value="desc"
                                checked={this.state.selectedBtn === "desc"}
                                onChange={this.handleOptionChange}
                                className="sortBtn" 
                                label="sort descending" />
                        </Form.Field>
                    </Form>

                    <div className="break" />

                    <div>
                        Sort By: {' '}
                        <Dropdown value={this.state.sortType} 
                                    onChange={this.handleSelChange}
                                    options = {[{key: 'name', text: 'Name', value: 'name'}, 
                                                {key: 'id', text: 'ID', value: 'id'}]}
                                    selection />
                    </div>
                </div>

                <SearchResult 
                    filteredResults={this.state.results} 
                    sortType={this.state.sortType}
                    selectedBtn={this.state.selectedBtn}
                    spriteUrl={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'}/>
            </div>
        );
    }
}



export default SearchSection;

