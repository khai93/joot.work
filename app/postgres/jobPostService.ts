// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import type { Company, CompanyService } from "@/core/CompanyService";
import { JobPost, JobPostService, parseJobPost } from "@/core/JobPostService";
import { GetOptions, UpdateOptions } from "@/core/ServiceOptions";
import { inject, injectable } from "inversify";
import { Symbols } from "../symbols";
import { connectionPool } from "./connection";

@injectable()
export class PostgresJobPostService implements JobPostService {
    
    constructor(
        @inject(Symbols.companyService) private companyService: CompanyService
    ) { }  

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
            );

            return resolve();
        });
    }

    async createOrUpdateMany(posts: JobPost[], engine: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const values = [];

            for (const v of posts) {
                let company = await this.companyService.get({
                    company_link: v.company?.company_link
                });

                if (company === undefined && v.company !== undefined) {
                    company = await this.companyService.create({
                        ...v.company
                    } as Company) ;
                }

                values.push(`(${company!.company_id}, '${v.job_title}', to_timestamp(${v.postedDate ? v.postedDate.getTime() / 1000 : null}), '${v.formattedDate || null}', '${engine}', TRUE, '${v.job_link.toString()}')`);
            }

            await connectionPool.query(
                `
                INSERT INTO
                    job_post (company_id, job_title, posted_date, formatted_date, engine_name, active, job_link)
                VALUES
                    ${
                        values.join(",\n")
                    }
                `
            );

            return resolve();
        })
    }
    
    get(opts: GetOptions<JobPost>): Promise<JobPost[]> {
        return new Promise(async (resolve, reject) => {
            const whereClauses = [];

            if (opts.where.job_id !== undefined) {
                whereClauses.push(`jp.job_id = ${opts.where.job_id}`);
            }

            // If a search term is provied, run a full-text-search
            if (opts.where.$search !== undefined) {
                whereClauses.push(`to_tsvector('simple', concat_ws(' ', job_title, company_name)) @@ to_tsquery('${opts.where.$search}')`)
            }

            if (whereClauses.length <= 0) {
                return reject("No where clause was provided.");
            }

            const res = await connectionPool.query(
                `
                SELECT to_json(res) from
                (
                    SELECT jp.*, to_json(c) "company" 
                    FROM job_post jp 
                    INNER JOIN company c
                        ON c.company_id = jp.company_id
                    WHERE 
                    ${
                        whereClauses.join(" AND\n")
                    }
                ) res;
                `
            );

            return resolve(res.rows.flatMap(v => parseJobPost(v.to_json)));
        });
    }

    update(opts: UpdateOptions<JobPost>): Promise<void> {
        throw new Error("Method not implemented.");
    }
}