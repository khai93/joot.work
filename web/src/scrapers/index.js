// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

// This folder contains methods to scrape external APIs 

/**
 * Response type for a job search method
 * @typedef {Object} JobSearchResult
 * @property {string} name - The name of the job post
 * @property {string} companyName - The company hiring for the job
 * @property {URL} companyLogoImage - A image url for the companies logo 
 * @property {Date} postedData  - Date when the job was posted
 */


/**
 * Interface for classes that scrape job board sites
 * 
 * @interface
 */
function JobBoardScraper() {}

/**
 * Calls an external search api for job posts
 * 
 * @param {string[]} keywords An array of words used for the search
 * @param {import("../api/currentLocation").LocationData} location Location to search in 
 * @returns {Promise<JobSearchResult[]>} An array of results containing info about jobs
 */
JobBoardScraper.prototype.searchJobs = (keywords, location) => {
    throw new Error("Not Implemented");
}