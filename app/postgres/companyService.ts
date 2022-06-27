// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Company, CompanyService } from "@/core/CompanyService";
import { injectable } from "inversify";
import { QueryResult } from "pg";
import { connectionPool } from "./connection";

@injectable()
export class PostgresCompanyService implements CompanyService {
    create(company: Company): Promise<Company> {
        return new Promise(async (resolve, reject) => {
            const res: QueryResult<Company> = await connectionPool.query(
                'INSERT INTO company(company_name, company_link, logoUrl) VALUES($1, $2, $3) RETURNING *',
                [company.company_name, company.company_link.toString(), company.logoUrl.toString()]
            );

            return resolve(res.rows[0]);
        });
    }

    // Find a company by options 
    get(opts: Partial<Company>): Promise<Company | undefined> {
        return new Promise(async (resolve, reject) => {
            const whereClauses = [];

            if (opts.company_id != null) whereClauses.push(`company_id=${opts.company_id}`);
            if (opts.company_link != null) whereClauses.push(`company_link = '${opts.company_link.toString()}'`);

            const res = await connectionPool.query(
                `SELECT * FROM company WHERE ${whereClauses.join(" AND ")}`
            );

            const rawCompany = (res as QueryResult<any>).rows[0];

            if (rawCompany == null) return resolve(undefined);
    
            return resolve({
                ...rawCompany,
                company_link: new URL(rawCompany.company_link),
                logoUrl: new URL(rawCompany.logourl)
            } as Company);
        });
    }
}