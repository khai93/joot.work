// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { SerializedJobPost } from "@/core/JobPostService";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { visitedInsert, visitedRemove, visitedSet, VisitedStateData } from "../redux/visitedReducer";
import { useLocalStorage } from "./useLocalStorage";

export function useVisited(engine: string) {
    const { visited } = useSelector((state: RootState) => state);

    const dispatch = useDispatch();

    const filteredVisited = useMemo(() => visited.find((v: VisitedStateData) => v.engine === engine), [visited, engine]);

    const setVisited = (data: VisitedStateData[]) => dispatch(visitedSet(data));

    const addVisited = (post: SerializedJobPost) => dispatch(visitedInsert({
        engine,
        posts: [
            post
        ]
    }));
    
    const removeVisited = (data: {engine: string, post: SerializedJobPost}) => dispatch(visitedRemove(data));

    return { visited: filteredVisited, addVisited, removeVisited };
}