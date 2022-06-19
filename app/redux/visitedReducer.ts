// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { SerializedJobPost } from "@/core/JobPostService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remove } from "lodash";


const initialState: SerializedJobPost[] = [];

const visitedSlice = createSlice({
    name: 'visited',
    initialState,
    reducers: {
        visitedInsert(state, action: PayloadAction<SerializedJobPost>) {
            if (action.payload == null) throw new Error("Insert Payload is undefined");
            state.push(action.payload);
        },
        visitedRemove(state, action: PayloadAction<SerializedJobPost>) {
            if (action.payload == null) throw new Error("Remove Payload is undefined");
            state = state.filter(v => v.job_id !== action.payload.job_id);
        }
    }
});

export const { visitedInsert, visitedRemove } = visitedSlice.actions;

export default visitedSlice.reducer;