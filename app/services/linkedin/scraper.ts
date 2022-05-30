// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost } from "@/core/JobPost";
import { JobScraperService, JobSearchFilter } from "../../core/JobScraperService";
import { injectable } from "inversify";

import { AxiosInstance } from "axios";

@injectable()
export class LinkedinJobScraper implements JobScraperService {
    constructor(
    ) {}

    search(keywords: string[], filters?: JobSearchFilter): Promise<JobPost[]> {
        throw new Error("Method not implemented.");
    }
}