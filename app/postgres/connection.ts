// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Pool } from "pg";

const POSTGRES_USER = process.env.POSTGRES_USERNAME;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

export const connectionPool = new Pool({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: "postgres",
    port: 5432
});
