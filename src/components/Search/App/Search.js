import React from "react";
import SearchHeader from "../Header/SearchHeader";
import SearchSection from "../Body/SearchSection";

// got search idea from React demo and 
// https://medium.com/@imranhsayed/live-search-with-react-instant-search-pagination-6acd476af756
class Search extends React.Component {
    render() {
        return(
            <div>
                <SearchHeader />
                <SearchSection />
            </div>
        );
    }
}



export default Search;