// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost } from "@/core/JobPostService";
import { JobScraperService, JobSearchFilter } from "@/core/JobScraperService";
import { injectable } from "inversify";
import { parseFetchResponseHTML } from "../util/parseFetchResponse";

@injectable()
export class LinkedinJobScraper implements JobScraperService {
    constructor() {}

    async search(keywords: string[], filters?: JobSearchFilter): Promise<JobPost[]> {
        const requestURL = new URL('https://www.linkedin.com/jobs/search/');
        requestURL.searchParams.append("keywords", keywords.join(" "));

        const { _document } = await parseFetchResponseHTML(await fetch(requestURL.toString(), { 
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
                "Host": requestURL.host
            },
            credentials: "same-origin"
        }));

        const output: JobPost[] = [];
        
        const searchResults = _document.getElementsByClassName("jobs-search__results-list")[0].children;
        
        for (let i = 0;i < searchResults.length;i++) {
            const subtitle = searchResults[i].querySelector(".base-search-card__subtitle");
            if (subtitle?.firstElementChild == null) continue;
            output.push({
                job_title: searchResults[i]!.querySelector(".base-search-card__title")!.textContent!.trim(),
                company: {
                    company_name: subtitle!.firstElementChild!.innerHTML.trim(),
                    company_link: new URL(subtitle!.firstElementChild!.getAttribute("href")!),
                    logoUrl: new URL(searchResults[i]!.querySelector(".artdeco-entity-image")!.getAttribute("data-delayed-url")!)
                },
                postedDate: new Date(searchResults[i]!.querySelector("time")!.getAttribute("datetime")!),
                formattedDate: null,
                job_link: new URL(searchResults[i]!.querySelector(".base-card__full-link")!.getAttribute("href")!)
            });
        }

        return output;
    }
}