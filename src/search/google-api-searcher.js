export default class ImageSearch {

    /**
     * Function for image search
     *
     * @param  {string} query   Image search filed query
     * @return {Promise}        Returns a promise, with an array of found image URL's
     */
    static async searchImage(query) {

        console.log("Test");

        const key = "5f36ce609da8456d8b066bfdcbd02d9d";
        const endpoint = "https://api.bing.microsoft.com/v7.0/images/search";


        // Construct a request
        const params = {'q': encodeURI(query.replace(" ", "+")), 'mkt': "en-US"};
        const headers = {'Ocp-Apim-Subscription-Key': key};

        let url = new URL(endpoint);
        url.search = new URLSearchParams(params).toString();

        return new Promise((resolve, reject) => {

            // Fetches Items from Google Image Search URL
            fetch(url.toString(), {
                headers: headers
            })
                .then(res => res.json())
                .then(res => {

                    let results = [];

                    // get value object array
                    const values = res.value;

                    // loop through all values and add the object to the results array
                    values.forEach(value => {
                        results.push(value);
                    });

                    resolve(results);

                })
                .catch(err => reject(err));
        })
    }

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
    static searchImageScraped(query) {
        query = encodeURIComponent(query);

        const bing = "https://www.bing.com/images/search?q=" + query;

        return new Promise((resolve, reject) => {

            // Fetches Items from Google Image Search URL
            fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(bing)}`)
                .then(res => res.text())
                .then(res => {
                    // Transforms HTML string into DOM object
                    let parser = new DOMParser();
                    parser = parser.parseFromString(res, "text/html");

                    console.log(parser.documentElement.innerHTML);

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

                })
                .catch(err => reject(err));
        })
    }
}