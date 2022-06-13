// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { SearchCacheService } from "@/core/SearchCacheService";
import { injectable } from "inversify";
import { jobScrapers } from "../di";
import { connectionPool } from "./connection";

@injectable()
export class PostgresSearchCacheService implements SearchCacheService {
    getExpiredStatus(keywords: string, engine: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const scraper = jobScrapers.find(v => v.name == engine);
            if (scraper === undefined) return reject(`Engine '${engine}' is not supported.`);

            try {
                const res = await connectionPool.query(
                    `
                        SELECT updated_at 
                        FROM search_cache 
                        WHERE keywords = $1
                        AND engine_name = $2
                    `,
                     [ keywords, engine ]
                ); 
                
                if (res.rowCount === 0) return resolve(true);
                const timeSinceLastUpdateInSec = (Date.now() -  new Date(res.rows[0].updated_at).getTime()) / 1000;
                const expired = timeSinceLastUpdateInSec > 60 * 5;

                return resolve(expired);
            } catch (e) { reject(e) }
        });
    }
    cache(keywords: string, engine: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (keywords.length <= 3) return reject("Keywords need to be greater than 3 characters");
            await connectionPool.query(
                `INSERT INTO search_cache (keywords, engine_name) VALUES ($1, $2)`,
                [ keywords.toLowerCase(), engine ]
            ).then(() => resolve()).catch(reject);
        });
    }
}