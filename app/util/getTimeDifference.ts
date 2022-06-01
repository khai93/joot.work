// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

// Returns a pretty printed string of Dates
export default function getTimeDifference(d1: Date, d2: Date): string {
    const dayDiff = Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);

    if (dayDiff >= 1) {
        return `${Math.floor(dayDiff)} day${dayDiff >= 2 ? "s" : ""} ago`;
    } else {
        const hourDiff = Math.round(dayDiff * 10);
        return `${hourDiff} hour${hourDiff >= 2 ? "s" : ""} ago`;
    }
}