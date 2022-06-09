// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

export type Company = {
    company_id?: number,
    company_name: string,
    logoUrl: URL,
    company_link: URL
}

// CompanyService handles manipluating company data
export interface CompanyService {
    create(company: Company): Promise<void>;
    get(opts: Partial<Company>): Promise<Company | undefined>;
}