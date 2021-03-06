// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

export type GetOptions<T> = {
    where: Partial<T> &
    {
        $search: string // full-text-search implementation
    } 
}

export type UpdateOptions<T> = {
    where: Partial<T>,
    update: Partial<T>
}
