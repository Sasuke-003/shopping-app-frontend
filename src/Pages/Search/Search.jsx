import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ROUTER_LINKS } from "../../Router";
import "./Search.css";

function Search({ history }) {
    const [searchString, setSearchString] = useState("");
    const [searchHelper, setSearchHelper] = useState();

    useEffect(() => {
        // getData = async () => {
        // }
    }, []);

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
                    <div className='search__row' onClick={() => setSearchString(helpText.name)}>
                        <h1 className='search__helper-text'>{helpText.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default withRouter(Search);
