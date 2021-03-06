// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

export type SearchCache = {
    cache_id?: number,
    keywords: string,
    updated_at: Date,
    expired: boolean
}

export interface SearchCacheService {
    // Returns if the cache is expired or not
    getExpiredStatus(keywords: string, engine: string): Promise<boolean | undefined>;
    cache(keywords: string, engine: string): Promise<void>;
}