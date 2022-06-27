// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Symbols } from "@/app/symbols";
import { JobPost, JobPostService } from "@/core/JobPostService";
import { JobSearchFilter, JobSearchService } from "@/core/JobSearchService";
import { inject, injectable } from "inversify";
import { connectionPool } from "./connection";

@injectable() 
export class PostgresJobScraper implements JobSearchService {

    constructor (
        @inject(Symbols.jobPostService) private jobPostService: JobPostService
    ) {}

    async search(keywords: string[], filters?: JobSearchFilter): Promise<JobPost[]> {
        const searchResults = await this.jobPostService.get({
            where: {
                $search: keywords.join(" | ")
            }
        });

        return searchResults;
    }
}