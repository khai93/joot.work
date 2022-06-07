// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Company, CompanyService } from "@/core/CompanyService";
import { injectable } from "inversify";
import { QueryResult } from "pg";
import { connectionPool } from "./connection";

@injectable()
export class PostgresCompanyService implements CompanyService {
    create(company: Company): Promise<void> {
        return new Promise(async (_, reject) => {
            await connectionPool.query(
                'INSERT INTO company(company_name, company_link, logoUrl) VALUES($1, $2, $3) RETURNING *',
                [company.company_name, company.company_link.toString(), company.logoUrl.toString()]
            ).catch(reject);
        });
    }

    // Find a company by options 
    get(opts: Partial<Company>): Promise<Company> {
        if (opts.company_id === undefined) throw new Error("Only company_id is implemented right now.");
        return new Promise(async (resolve, reject) => {
            
            const res = await connectionPool.query(
                `SELECT * FROM company WHERE company_id = $1`,
                [opts.company_id]
            ).catch(reject);

            const rawCompany = (res as QueryResult<any>).rows[0];

            if (rawCompany == null) return undefined;

            return resolve({
                ...rawCompany,
                company_link: new URL(rawCompany.company_link),
                logoUrl: new URL(rawCompany.logoUrl)
            } as Company);
        });
    }
}