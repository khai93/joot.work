// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import 'reflect-metadata';
import { Container } from "inversify";
import { LinkedinJobScraper } from './linkedin';
import { IndeedJobScraper } from './indeed';
import { PostgresCompanyService } from './postgres/companyService';
import { PostgresJobPostService } from './postgres';
import { PostgresSearchCacheService } from './postgres/searchCacheService';

export const Symbols = {
    companyService: Symbol.for("companyService"),
    jobPostService: Symbol.for("jobPostService"),
    searchCacheService: Symbol.for("searchCacheService")
}

const container = new Container();
container.bind<LinkedinJobScraper>(LinkedinJobScraper).toSelf();
container.bind<IndeedJobScraper>(IndeedJobScraper).toSelf();
container.bind<PostgresCompanyService>(Symbols.companyService).to(PostgresCompanyService);
container.bind<PostgresJobPostService>(Symbols.jobPostService).to(PostgresJobPostService);
container.bind<PostgresSearchCacheService>(Symbols.searchCacheService).to(PostgresSearchCacheService);

// icons are from iconify
export const jobScrapers = [
    {
        name: 'linkedin',
        get: () => container.get<LinkedinJobScraper>(LinkedinJobScraper),
        icon: "akar-icons:linkedin-box-fill"
    },
    {
        name: 'indeed',
        get: () => container.get<IndeedJobScraper>(IndeedJobScraper),
        icon: "cib:indeed"
    }
];

export {
    container
};