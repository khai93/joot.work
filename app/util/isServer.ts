// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

// isServer returns a boolean showing if the current runtime is the server 
export function isServer() {
    return typeof window === 'undefined';
}