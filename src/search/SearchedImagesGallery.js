import React, {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import Loader from "react-loader-spinner";
import ImageSearch from "./api-searcher";

const printIframe = (id) => {
    const iframe = document.frames
        ? document.frames[id]
        : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();

    return false;
};

const IFrame = ({
                    children,
                    ...props
                }) => {
    const [contentRef, setContentRef] = useState(null)
    const mountNode =
        contentRef?.contentWindow?.document?.body

    return (
        <iframe {...props} ref={setContentRef}>
            {mountNode && createPortal(children, mountNode)}
        </iframe>
    )
}

const uniq = (a) => {
    const prims = {"boolean": {}, "number": {}, "string": {}}, objs = [];

    return a.filter(function (item) {
        const type = typeof item;
        if (type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}

const SearchResultItem = (props) => {
    const item = props.item;
    const index = props.index;

    return (
        <div style={{margin: "5px"}}
             className="card shadow--tl hvr-grow-shadow"
        >
            <div
                className="card__image"
                style={{display: "flex", alignItems: "center", justifyContent: "center"}}
            >
                <img
                    width={200}
                    height={"auto"}
                    src={item.contentUrl}
                    alt={item.name}
                />
                <IFrame title={item.name} id={index} style={{display: "none"}}>
                    <img
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            width: "100%",
                            height: "auto"
                        }}
                        src={item.contentUrl}
                        alt={item.name}
                    />
                </IFrame>
            </div>

            <div
                className={"card__footer"}>
                <button onClick={() => printIframe(index)} className={"button--primary button"}>Print</button>
                <button onClick={() => window.open(item.hostPageUrl)} className={"button--secondary button"}>Explore</button>
            </div>
        </div>
    );
}

const SearchedImagesGallery = (props) => {
    let items = uniq(props.results);

    return (
        <div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap"}}>
                {items.map((item, index) => {
                    return (
                        <div key={index}>
                            <SearchResultItem item={item} index={index}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export const SearchedImageGalleryContainer = (props) => {
    const [results, setResults] = useState();

    const getResults = async () => {
        const query = props.query;

        const requestResults = await ImageSearch.searchImage(query);
        const results = [];

        requestResults.forEach(result => {
            results.push(result);
        });

        setResults(results);
    }

    useEffect(() => {
        if (!results) {
            getResults();
        }
    }, []);

    return (
        <div>
            {!results ? <div><Loader type="Oval" color="#00BFFF" height={100} width={100}/></div> :
                <SearchedImagesGallery results={results}/>}
        </div>
    );
}