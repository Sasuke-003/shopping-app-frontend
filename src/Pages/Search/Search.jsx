import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ROUTER_LINKS } from "../../Router";
import { api } from "../../server";
import "./Search.css";
import CircularProgress from "@material-ui/core/CircularProgress";

let timerID;
const timeOutValue = 1500;

function Search({ history }) {
    const [searchString, setSearchString] = useState("");
    const [searchHelper, setSearchHelper] = useState([]);

    useEffect(() => {
        const getData = async () => {
            if (searchString === "") return;
            if (timerID) clearTimeout(timerID);
            timerID = setTimeout(async () => {
                timerID = undefined;
                try {
                    const res = await api.item.autoComplete(searchString);
                    const res2 = await api.item.categoryAutoComplete(searchString);
                    let data = [...res];
                    res2.forEach((r) => data.push({ name: r }));
                    setSearchHelper(data);
                } catch (e) {}
            }, timeOutValue);
        };

        getData();
    }, [searchString]);

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
            {searchHelper.length < 1 ? (
                <div className='search-result__products'>
                    {" "}
                    <CircularProgress size='45px' />
                </div>
            ) : (
                <div className='search__helper-container'>
                    {/* searchHelper.length > 1 && */}
                    {/* searchHelper[0].name !== searchString && */}
                    {searchHelper.map((helpText, index) => (
                        <div className='search__row' onClick={() => setSearchString(helpText.name)}>
                            <h1 className='search__helper-text'>{helpText.name}</h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default withRouter(Search);
