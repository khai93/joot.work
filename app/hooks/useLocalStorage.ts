// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Handles usage of the LocalStorage API using JSON
export function useLocalStorage<T>(key: string, initialVal: T): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(initialVal);

    // Get stored initial value on first render as useEffect only runs on client
    // which makes it so you can use localStorage for initial value
    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored == null) return;
        setValue(JSON.parse(stored));
    }, []);

    useEffect(() => {
        if (value === initialVal) return;
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}