// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { useRouter } from "next/router";

export function useRouterQuery(query: string): string {
    const router = useRouter();

    return router.query[query] as string || 
           router.asPath.match(new RegExp(`[&?]${query}=(.*)(&|$)`))![0] || 
           "";
}