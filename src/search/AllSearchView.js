import React, {useState} from "react";
import {SearchedImageGalleryContainer} from "./SearchedImagesGallery";

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
                <input className={"navbar__search-input"} style={{width: "100%"}} onChange={handleChange} placeholder="Search Printables"/>
                <button className={"button button--primary"} style={{marginTop: "15px"}} onClick={() => search()}>Search</button>
                <div style={{marginTop: "20px"}}>
                    {isSearch ? <SearchedImageGalleryContainer query={query}/> : null}
                </div>
            </div>
        </div>
    );
}