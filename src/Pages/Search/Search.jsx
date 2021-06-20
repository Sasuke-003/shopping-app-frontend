import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { ROUTER_LINKS } from "../../Router";
import "./Search.css";

function Search({ history }) {
    const [searchString, setSearchString] = useState("");
    const [searchHelper, setSearchHelper] = useState([
        "One Plus 3",
        "One Plus 3T",
        "One Plus 5",
        "One Plus 3T",
        "One Plus 6",
        "One Plus 6T",
        "One Plus 7",
        "One Plus 8T",
        "One Plus 8 Pro",
        "One Plus 9R",
    ]);

    return (
        <div className='search'>
            <div className='search__input'>
                <input
                    className='search__search-box'
                    type='text'
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder='type something....'
                />
                <div className='search__button' onClick={() => history.push(ROUTER_LINKS.searchResult + searchString)}>
                    <h1 className='search__button-text'>SEARCH</h1>
                </div>
            </div>
            <div className='search__helper-container'>
                {searchHelper.map((helpText, index) => (
                    <div className='search__row' onClick={() => setSearchString(helpText)}>
                        <h1 className='search__helper-text'>{helpText}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default withRouter(Search);
