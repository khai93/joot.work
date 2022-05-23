// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import parseFetchResponse, { parseFetchResponseHTML } from "../api/parseFetchResponse";

/**
 * LinkedinApi is an object that contains wrapper methods to Linkedin's API
 * 
 * @class
 * @implements {JobBoardScraper}
*/
class LinkedinApi {
    /**
     * 
     * @param {string[]} keywords 
     * @param {import("../api/currentLocation").LocationData} location 
     * @returns {Promise<JobSearchResult[]>}
     */
    async searchJobs(keywords, location) {
        if (location === undefined) location = {}
        const { _document } = await parseFetchResponseHTML(await fetch(`https://crossorigin.me/https://www.linkedin.com/jobs/search?keywords=${keywords}&location=${(typeof(location.state) === "string" ? location.state : "") + location.country}`));
        const output = [];

        const searchResults = _document.getElementsByClassName("jobs-search-results__list-item");
        console.log(searchResults);

        return output;
    }
}

export default LinkedinApi;