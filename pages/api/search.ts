// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.import type { NextApiRequest, NextApiResponse } from 'next'

import { container, jobScrapers } from "@/app/di";
import { JobPost, JobPostService, SerializedJobPost, serializeJobPost } from "@/core/JobPostService";
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
      const { keywords, engine: engineName, page, remote, location } = req.query;

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

      res.setHeader(
        'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=350'
      );

      try {
          const scraper = engine.get();
          searchResult = await scraper.search(keywords.split(" "), {
            page: page ? parseInt(page as string) : undefined,
            remoteType: remote ? parseInt(remote as string) : undefined,
          });
          
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
