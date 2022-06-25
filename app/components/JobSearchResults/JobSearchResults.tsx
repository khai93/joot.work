// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { jobScrapers } from "@/app/di";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useVisited } from "@/app/hooks/useVisited";
import { JobPost, SerializedJobPost, } from "@/core/JobPostService";
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
    const { addVisited, visited, removeVisited } = useVisited(jobScrapers[engineIndex].name);
    const [showVisited, setShowVisited] = useState(false);

    const currentEngine = useMemo(() => jobScrapers[engineIndex].name, [jobScrapers, engineIndex]);

    useEffect(() => {
        setSearching && setSearching(true);

        const query = new URLSearchParams({
            keywords: keywords,
            engine: currentEngine
        });

        // TODO: SWITCH TO REACT-QUERY
        fetch("api/search?" + query)
            .then(res => res.json())
            .then((data: SearchApiResponse) => {
                if (data.error === true) {
                    throw data.message;
                }
                setJobResults(data.data!);
                setSearching && setSearching(false);
            })
            .catch(e => {
                throw e;
            });
    }, [engineIndex])
    
    const { results, visitedResults } = useMemo(() => {

        const results = jobResults
            .filter(v => !visited!.posts.find((_v: SerializedJobPost) => _v.job_link === v.job_link))
            .map(v =>  
            <JobSearchResult 
                key={v.job_link} 
                jobData={v}  
                onClick={() => addVisited(v)}
                onRemove={() => removeVisited({ engine: currentEngine, post: v })}
            />
        );

        const visitedResults = visited!.posts.map((v: SerializedJobPost) => <JobSearchResult 
            key={v.job_link}
            jobData={v}
            visited
            onRemove={() => removeVisited({ engine: currentEngine, post: v })}
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
                display={visited!.posts.length > 0 ? "block" : "none"}
                onClick={() => setShowVisited(v => !v)}
            >
                {
                    !showVisited ? 
                    `Show ${visited!.posts.length} viewed job posts.` :
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