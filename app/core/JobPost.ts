// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

export type JobPost = {
    name: string,
    description: string,
    company: {
        name: string,
        logoUrl: URL,
        link: URL
    },
    postedDate: Date | null,
    formattedDate: string | null,
    link: URL
}

export type SerializedJobPost = ReturnType<typeof serializeJobPost>;

/**
 * Serializes a JobPost object into a JSON parsable object
 * @param post 
 */
export const serializeJobPost = (post: JobPost) => ({
    ...post,
    company: {
        ...post.company,
        logoUrl: post.company.logoUrl.toString(),
        link: post.company.link.toString()
    },
    postedDate: post.postedDate?.toString() || null, // next.js needs null instead of undefined
    formattedDate: post.formattedDate || null,
    link: post.link.toString()
})