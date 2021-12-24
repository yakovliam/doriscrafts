import React, {useState} from "react";
import {GoogleImageSearchGrabber} from "./google-search-grabber";

export const Search = () => {
    const [isSearch, setIsSearch] = useState(false);
    const [query, setQuery] = useState();

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const search = () => {
        setIsSearch(false);

        setTimeout(() => {
            setIsSearch(true);
        }, 100);
    }

    return (
        <div>
            <div className={"navbar__search"}>
                <input className={"navbar__search-input"} onChange={handleChange} placeholder="Search Printables"/>
                <button className={"button button--primary"} onClick={() => search()}>Search</button>
                <div style={{marginTop: "20px"}}>
                    {isSearch ? <GoogleImageSearchGrabber query={query}/> : null}
                </div>
            </div>
        </div>
    );
}