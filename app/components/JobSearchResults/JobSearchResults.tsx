// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { jobScrapers } from "@/app/di";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { JobPost, SerializedJobPost } from "@/core/JobPostService";
import { SearchApiResponse } from "@/pages/api/search";
import { Stack, StackProps, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import JobSearchResult from "./JobSearchResult";

export interface JobSearchResultsProps {
    keywords: string,
    engineIndex: number,
    searching: boolean,
    setSearching?: (b: boolean) => void;
}

export default function JobSearchResultsMobile({
    keywords,
    engineIndex,
    setSearching,
    searching,
    ...rest
}: JobSearchResultsProps & StackProps) {
    const [jobResults, setJobResults] = useState<SerializedJobPost[]>([]);
    const [visited, setVisited] = useLocalStorage<SerializedJobPost[]>("visited", []);
    const [showVisited, setShowVisited] = useState(false);
    
    useEffect(() => {
        setSearching && setSearching(true);

        const query = new URLSearchParams({
            keywords: keywords,
            engine: jobScrapers[engineIndex].name
        });

        fetch("api/search?" + query)
            .then(res => res.json())
            .then((data: SearchApiResponse) => {
                if (data.error === true) {
                    throw data.message;
                }
                setJobResults(data.data!);
                setSearching && setSearching(false);
                // TODO: MAKE A WAY WHEREE IT KEEPS THE VISITED DATA BETWEEN ENGINES USING REDUX
            })
            .catch(e => {
                throw e;
            });
    }, [engineIndex])
    
    const { results, visitedResults } = useMemo(() => {
        const results = jobResults.map(v => !visited.find(_f => _f.job_link === v.job_link) ? <JobSearchResult 
            key={v.job_link} 
            jobData={v}  
            onClick={() => setVisited([...visited, v])}
        /> : undefined);

        const visitedResults = visited.map(v => <JobSearchResult 
            key={v.job_link}
            jobData={v}
            visited
            // onClick={() => setVisited(visitedArr => visitedArr.filter(_f => _f.job_link != v.job_link))}
        />);

        return {
            results, visitedResults
        }
    }, [jobResults, visited]);

    return (
        <Stack 
            my="1em"
            {...rest}
        >
            <Text
                color="teal"
                textDecoration={"underline"}
                cursor="pointer"
                display={visited.length > 0 ? "block" : "none"}
                onClick={() => setShowVisited(v => !v)}
            >
                {
                    !showVisited ? 
                    `Show ${visited.length} viewed job posts.` :
                    "Hide viewed job posts."
                }
            </Text>
            {
                showVisited &&
                visitedResults 
            }
            {
                searching ? 
                <Text fontWeight={"light"}>Parsing the best matches...</Text> :
                results
            }
        </Stack>
    )
}