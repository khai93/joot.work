// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import visitedReducer from "./visitedReducer";

const store = configureStore({
    reducer: {
        visited: visitedReducer
    }
});

export default store;