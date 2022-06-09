// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import 'reflect-metadata';
import dotenv from 'dotenv';
import { Container } from "inversify";
import { LinkedinJobScraper } from './linkedin';
import { IndeedJobScraper } from './indeed';
import path from 'path';
import { Pool } from 'pg';
import { isServer } from './util/isServer';
import { TypeScriptConfig } from 'next/dist/server/config-shared';
import { CompanyService } from './core/CompanyService';
import { PostgresCompanyService } from './postgres/companyService';
import { PostgresJobPostService } from './postgres';

export const Symbols = {
    companyService: Symbol.for("companyService"),
    jobPostService: Symbol.for("jobPostService")
}

const container = new Container();
container.bind<LinkedinJobScraper>(LinkedinJobScraper).toSelf();
container.bind<IndeedJobScraper>(IndeedJobScraper).toSelf();
container.bind<PostgresCompanyService>(Symbols.companyService).to(PostgresCompanyService);
container.bind<PostgresJobPostService>(Symbols.jobPostService).to(PostgresJobPostService);

export const jobScrapers = [
    {
        name: 'linkedin',
        get: () => container.get<LinkedinJobScraper>(LinkedinJobScraper)
    },
    {
        name: 'indeed',
        get: () => container.get<IndeedJobScraper>(IndeedJobScraper)
    }
];

export {
    container
};