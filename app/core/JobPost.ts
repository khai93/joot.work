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
    postedDate: Date,
    link: URL
}