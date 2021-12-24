import React, {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import Loader from "react-loader-spinner";
import GoogleImageSearch from "./google-api-searcher";

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
const SearchedImages = (props) => {
    let items = [...new Set(props.results)];

    const printIframe = (id) => {
        const iframe = document.frames
            ? document.frames[id]
            : document.getElementById(id);
        const iframeWindow = iframe.contentWindow || iframe;

        iframe.focus();
        iframeWindow.print();

        return false;
    };

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap"}}>
            {items.map((item, index) => {
                console.log("Displaying image with src: " + item.url);
                return (
                    <div key={index} onClick={() => printIframe(index)} style={{margin: "5px"}}
                         className="card shadow--tl hvr-grow-shadow">
                        <div className="card__image">
                            <img
                                width={200}
                                height={"auto"}
                                src={item.url}
                                alt={item.title}
                            />
                            <IFrame title={item.title} id={index} style={{display: "none"}}>
                                <img
                                    style={{
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        minWidth: "100%",
                                        minHeight: "100%"
                                    }}
                                    src={item.url}
                                    alt={item.title}
                                />
                            </IFrame>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export const GoogleImageSearchGrabber = (props) => {
    const [results, setResults] = useState();

    const getResults = async () => {
        const query = props.query;

        // const response = await (await fetch("http://localhost:8080/image-search?query=" + query)).json();
        //
        // if (!response.results) {
        //     // todo open modal that says "couldn't find, trying again automatically" then refresh
        //     window.location.reload(false);
        //     return;
        // }

        const requestResults = await GoogleImageSearch.searchImage(query);

        const results = [];

        requestResults.forEach(result => {
            results.push({url: result, title: query})
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
                <SearchedImages results={results}/>}
        </div>
    );
}