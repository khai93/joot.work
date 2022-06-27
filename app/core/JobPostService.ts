// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Company } from "./CompanyService";
import { GetOptions, UpdateOptions } from "./ServiceOptions";

export type JobPost = {
    job_id?: number,
    job_title: string,
    company_id?: number,
    company?: Partial<Company> | null,
    postedDate: Date | null, // If possible, get a Date object
    formattedDate: string | null, // If Date could not be extracted, get the formatted date from the engine's site
    job_link: URL,
    updated_at?: Date
}

export type SerializedJobPost = ReturnType<typeof serializeJobPost>;

// JobPostService handles the creation of job posts in a database
export interface JobPostService {
    create(post: JobPost, engine: string): Promise<void>;
    createOrUpdateMany(posts: JobPost[], engine: string): Promise<void>;
    get(opts: GetOptions<JobPost>): Promise<JobPost[]>;
    update(opts: UpdateOptions<JobPost>): Promise<void>;
}

/**
 * Serializes a JobPost object into a JSON parsable object
 * @param post 
 */
export const serializeJobPost = (post: JobPost) => ({
    ...post,
    company: {
        ...post.company,
        logoUrl: post.company?.logoUrl?.toString(),
        company_link: post.company?.company_link?.toString()
    },
    postedDate: post.postedDate?.toString() || null, // next.js needs null instead of undefined
    formattedDate: post.formattedDate || null,
    job_link: post.job_link.toString()
});

export const parseJobPost = (post: SerializedJobPost): JobPost => ({
    ...post,
    company: {
        ...post.company,
        logoUrl: new URL(post.company?.logoUrl || "https://placehold.jp/64x64.png"),
        company_link: new URL(post.company?.company_link!)
    },
    postedDate: post.postedDate ? new Date(post.postedDate) : null,
    formattedDate: post.formattedDate || null,
    job_link: new URL(post.job_link)
});