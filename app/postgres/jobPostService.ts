// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost, JobPostService } from "@/core/JobPostService";
import { GetOptions, UpdateOptions } from "@/core/ServiceOptions";
import { injectable } from "inversify";
import { connectionPool } from "./connection";

@injectable()
export class PostgresJobPostService implements JobPostService {
    create(post: JobPost, engine: string): Promise<void> {
        return new Promise(async (_, reject) => {
            if (post.company_id === undefined) return reject("Company Id cannot be undefined");

            await connectionPool.query(
                `INSERT INTO job_post (company_id, job_title, posted_date, formatted_date, engine_name, active, job_link) VALUES ($1, $2, to_timestamp($3), $4, $5, $6, $7')`,
                [
                    post.company_id, 
                    post.job_title, 
                    post.postedDate ? post.postedDate.getTime() / 1000 : null, // get seconds instead since postgres uses seconds
                    post.formattedDate || null,
                    engine,
                    true,
                    post.job_link.toString()
                ]
            )
        });
    }
    
    get(opts: GetOptions<JobPost>): Promise<JobPost> {
        throw new Error("Method not implemented.");
    }
    update(opts: UpdateOptions<JobPost>): Promise<void> {
        throw new Error("Method not implemented.");
    }
}