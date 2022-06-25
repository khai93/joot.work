// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { SerializedJobPost } from "@/core/JobPostService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remove } from "lodash";
import { persistReducer } from "redux-persist";
import { jobScrapers } from "../di";
import { persistConfig } from "./persist";

export type VisitedStateData = {
    engine: string,
    posts: SerializedJobPost[]
 };

const initialState: VisitedStateData[] = jobScrapers.flatMap(v => ({
    engine: v.name,
    posts: []
}));

const visitedSlice = createSlice({
    name: 'visited',
    initialState,
    reducers: {
        // re-set the entire state data to a different one
        visitedSet(state, action: PayloadAction<VisitedStateData[]>) {
            if (action.payload == null) throw new Error("Set Payload is undefined");
            return action.payload;
        },
        visitedInsert(state, action: PayloadAction<VisitedStateData>) {
            if (action.payload == null) throw new Error("Insert Payload is undefined");

            const found = state.findIndex(v => v.engine.toLowerCase() === action.payload.engine.toLowerCase());
            if (found === -1) throw new Error("Engine '" + action.payload.engine + "' does not exist.");
            state[found].posts.push(...action.payload.posts);

            return state;
        },
        visitedRemove(state, action: PayloadAction<{engine: string, post: SerializedJobPost}>) {
            if (action.payload == null) throw new Error("Remove Payload is undefined");
            const found = state.findIndex(v => v.engine === action.payload.engine);
            if (found === -1) throw new Error("Engine '" + action.payload.engine + "' does not exist.");
            state[found].posts = state[found].posts.filter(v => v.job_link !== action.payload.post.job_link);
            console.log(state[found].posts);
            return state;
        }
    }
});

export const { visitedInsert, visitedRemove, visitedSet } = visitedSlice.actions;

export default visitedSlice.reducer;