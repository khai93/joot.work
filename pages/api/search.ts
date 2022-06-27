// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.import type { NextApiRequest, NextApiResponse } from 'next'

import { container, jobScrapers } from "@/app/di";
import { PostgresJobPostService } from "@/app/postgres";
import { PostgresCompanyService } from "@/app/postgres/companyService";
import { PostgresJobScraper } from "@/app/postgres/jobSearchService";
import { Symbols } from "@/app/symbols";
import { JobPost, JobPostService, SerializedJobPost, serializeJobPost } from "@/core/JobPostService";
import { SearchCacheService } from "@/core/SearchCacheService";
import { NextApiRequest, NextApiResponse } from "next";

export type SearchApiResponse = {
    error: boolean,
    data?: SerializedJobPost[],
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SearchApiResponse>
) {
    let searchResult: JobPost[] = [];
      const { keywords, engine: engineName, page } = req.query;

      if (typeof(keywords) !== "string") return res.status(400).json({
        error: true,
        message: "No keywords found in query"
      });

      // engine from di
      const engine = jobScrapers.find(v => v.name === (engineName as string || "linkedin").toLowerCase());

      if (engine === undefined) {
          return res.status(400).json({
            error: true,
            message: "Engine does not exist."
          });
      }

      const cacheService = container.get<SearchCacheService>(Symbols.searchCacheService);
      const cacheExpired = await cacheService.getExpiredStatus(keywords as string, engineName as string);
      
      // TODO: handle cache
      
      let scraper = engine.get();

      if (!cacheExpired) {
        scraper = container.get<PostgresJobScraper>(PostgresJobScraper);
      }

      try {
          searchResult = await scraper.search(keywords.split(" "));

          if (cacheExpired) {
            const jobPostService = container.get<JobPostService>(Symbols.jobPostService);
            await jobPostService.createOrUpdateMany(searchResult, engineName as string);
            await cacheService.cache(keywords, engineName as string);
          }
          
          return res.json({
            error: false,
            data: [
              ...searchResult.map(serializeJobPost)
            ],
            message: "OK."
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({
          error: true,
          message: "An unexpected error occured."
        });
      }
}
