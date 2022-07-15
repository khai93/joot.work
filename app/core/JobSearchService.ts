// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost } from "./JobPostService";



export type JobSearchFilter = {
    location?: string,
    remoteType?: number // 0 - In-office, 1 - Remote Only, 2 - Hybrid
    page?: number,
    company?: string
}

/**
 * JobSearchService are services that scrapes websites related to searching for jobs
 */
export interface JobSearchService {
    search(keywords: string[], filters?: JobSearchFilter): Promise<JobPost[]>;
}