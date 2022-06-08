// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost, JobPostService, parseJobPost } from "@/core/JobPostService";
import { GetOptions, UpdateOptions } from "@/core/ServiceOptions";
import { injectable } from "inversify";
import { QueryResult } from "pg";
import { connectionPool } from "./connection";

@injectable()
export class PostgresJobPostService implements JobPostService {
    create(post: JobPost, engine: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (post.company_id === undefined) return reject("Company Id cannot be undefined");

            await connectionPool.query(
                `INSERT INTO job_post (company_id, job_title, posted_date, formatted_date, engine_name, active, job_link) VALUES ($1, $2, to_timestamp($3), $4, $5, $6, $7)`,
                [
                    post.company_id, 
                    post.job_title, 
                    post.postedDate ? post.postedDate.getTime() / 1000 : null, // get seconds instead since postgres uses seconds
                    post.formattedDate || null,
                    engine,
                    true,
                    post.job_link.toString()
                ]
            ).catch(reject);

            return resolve();
        });
    }
    
    get(opts: GetOptions<JobPost>): Promise<JobPost> {
        return new Promise(async (resolve, reject) => {
            if (opts.where.job_id === undefined) return reject("A Job Id was not provided for Get Operation.");

            const res = await connectionPool.query(
                `
                SELECT to_json(res) from
                (
                    SELECT jp.*, to_json(c) "company" 
                    FROM job_post jp 
                    INNER JOIN company c
                        ON c.company_id = jp.company_id
                    WHERE jp.job_id = $1
                ) res;
                `,
                [opts.where.job_id]
            ).catch(reject);

            return resolve(parseJobPost((res as QueryResult<any>).rows[0].to_json));
        });
    }
    update(opts: UpdateOptions<JobPost>): Promise<void> {
        throw new Error("Method not implemented.");
    }
}