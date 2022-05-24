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
        const { _document } = await parseFetchResponseHTML(await fetch(`http://localhost:8080/https://www.linkedin.com/jobs/search?keywords=${keywords}&location=${(typeof(location.state) === "string" ? location.state : "") + location.country}`));
        const output = [];
        
        const searchResults = _document.getElementsByClassName("jobs-search__results-list")[0].children;
        
        for (let i = 0;i < searchResults.length;i++) {
            const subtitle = searchResults[i].querySelector(".base-search-card__subtitle");
            output.push({
                name: searchResults[i].querySelector(".base-search-card__title").textContent.trim(),
                companyName: subtitle.firstElementChild.innerHTML.trim(),
                companyLink: subtitle.firstElementChild.getAttribute("href"),
                companyLogoImage: searchResults[i].querySelector(".artdeco-entity-image").getAttribute("data-ghost-url"),
                postedDate: new Date(searchResults[i].querySelector("time").getAttribute("datetime")),
                jobLink: new URL(searchResults[i].querySelector(".base-card__full-link").getAttribute("href"))
            });
        }

        return output;
    }
}

export default LinkedinApi;