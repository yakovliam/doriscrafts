//
// Copyright (c) 2017 by Fedir Bobylev. All Rights Reserved.
//

export default class GoogleImageSearch {

    static removeURLParameter(url, parameter) {
        //prefer to use l.search if you have a location/link object
        var urlparts = url.split('?');
        if (urlparts.length >= 2) {

            var prefix = encodeURIComponent(parameter) + '=';
            var pars = urlparts[1].split(/[&;]/g);

            //reverse iteration as may be destructive
            for (var i = pars.length; i-- > 0;) {
                //idiom for string.startsWith
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
        }
        return url;
    }

    /**
     * Function for image search
     *
     * @param  {string} query   Image search filed query
     * @return {Promise}        Returns a promise, with an array of found image URL's
     */
    static searchImage(query) {
        query = encodeURIComponent(query);

        const google = 'https://www.google.com/search?tbm=isch&q=' + query;
        const bing = "https://www.bing.com/images/search?q=" + query;

        return new Promise((resolve, reject) => {

            // Fetches Items from Google Image Search URL
            fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(bing)}`)
                .then(res => res.text())
                .then(res => {
                    // Transforms HTML string into DOM object
                    let parser = new DOMParser();
                    parser = parser.parseFromString(res, "text/html");

                    // container id -> mmComponent_images_2

                    const imgSrcs = [];

                    const images = Array.from(parser.getElementsByTagName("img"));

                    images.forEach(i => {
                        if (i.getAttribute("src2")) {
                            let url = i.getAttribute("src2");
                            url = this.removeURLParameter(url, "w");
                            url = this.removeURLParameter(url, "h");
                            imgSrcs.push(url);
                        }
                    })

                    resolve(imgSrcs);

                    // Gets DOM element with image results
                    //
                    // let images = parser.getElementsByClassName("GpQGbf")[0];

                    // if (images.nodeName === "DIV") {
                    //
                    //     resolve(this.googleGetMobile(images))
                    // } else if (images.nodeName === "TABLE") {
                    //
                    //     resolve(this.googleGetDesktop(images));
                    // } else {
                    //
                    //     reject("Unknown System");
                    // }

                })
                .catch(err => reject(err));
        })
    }

    /**
     * Traverses DOM tree in mobile layout
     *
     * @param  {NodeList} images    Children of "ires" container
     * @return {Array}              Array of found images URL's
     */
    static googleGetMobile(images) {

        // Transforms DOM NodeList of images into Array.
        // Needed to use .map method
        images = Array.from(images.childNodes);

        // Maps Image Sources
        return images.map((imgDiv) => {
            return imgDiv.childNodes[0].src;
        })
    }

    /**
     * Traverses DOM tree in desktop layout
     *
     * @param  {NodeList} images    Children of "ires" container
     * @return {Array}              Array of found images URLs
     */
    static googleGetDesktop(images) {

        // NodeList of table rows
        images = images.childNodes[0].childNodes;

        // Empty List of image URLs
        let imgSrc = [];

        // Traverses table node for images
        images.forEach((tRow) => {

            const subTables = tRow.getElementsByClassName("IkMU6e");

            Array.from(subTables).forEach(table => {
                // get images
                Array.from(table.getElementsByClassName("yWs4tf")).forEach(im => {
                    imgSrc.push(im.getAttribute("src"));
                });
            });
        });

        return imgSrc
    }
}