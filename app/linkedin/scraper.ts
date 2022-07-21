// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost } from "@/core/JobPostService";
import { JobSearchService, JobSearchFilter } from "@/core/JobSearchService";
import { injectable } from "inversify";
import { parseFetchResponseHTML } from "../util/parseFetchResponse";

@injectable()
export class LinkedinJobScraper implements JobSearchService {
    constructor() {}

    async search(keywords: string[], filters?: JobSearchFilter): Promise<JobPost[]> {
  
        const requestURL = new URL('https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search');
        requestURL.searchParams.append("keywords", keywords.join(" ")) ;
    

        if (filters?.page) {
            requestURL.searchParams.append("start", String(Math.max(filters.page - 1, 0) * 25));
        }
        
        if (filters?.location) {
            requestURL.searchParams.append("location", filters.location);
        }

        if (filters?.remoteType) {
            // f_WT is the query linkedin uses for job location
            requestURL.searchParams.append("f_WT", String(filters.remoteType + 1));
        }
        
        const { _document } = await parseFetchResponseHTML(await fetch(requestURL.toString(), { 
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
                "Host": requestURL.host
            },
            credentials: "same-origin"
        }));

        const output: JobPost[] = [];
        
        const searchResults = _document.getElementsByTagName('li');
        
        for (let i = 0;i < searchResults.length;i++) {
            const subtitle = searchResults[i].querySelector(".base-search-card__subtitle");
            if (subtitle?.firstElementChild == null) continue;
            output.push({
                job_title: searchResults[i]!.querySelector(".sr-only")!.textContent!.trim(),
                company: {
                    company_name: subtitle!.firstElementChild!.innerHTML.trim(),
                    company_link: new URL(subtitle!.firstElementChild!.getAttribute("href")!),
                    logoUrl: new URL(searchResults[i]!.querySelector(".artdeco-entity-image")!.getAttribute("data-delayed-url")!)
                },
                postedDate: new Date(searchResults[i]!.querySelector("time")!.getAttribute("datetime")!),
                formattedDate: null,
                job_link: new URL(searchResults[i]!.querySelector(".base-card__full-link")!.getAttribute("href")!.split("/?")[0])
            });
        }

        return output;
    }
}