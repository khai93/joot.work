// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.import type { NextApiRequest, NextApiResponse } from 'next'

import { jobScrapers } from "@/app/di";
import { JobPost, SerializedJobPost, serializeJobPost } from "@/core/JobPost";
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

      const { keywords, engine } = req.query;

      const _engine = jobScrapers.find(v => v.name === (engine as string || "linkedin").toLowerCase());

      if (_engine === undefined) {
          return res.status(400).json({
            error: true,
            message: "Engine does not exist."
          });
      }

      if (typeof(keywords) === "string") {
          try {
              const scraper = _engine.get();
              searchResult = await scraper.search(keywords.split(" "));
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
}
