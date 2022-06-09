// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { jobScrapers } from "@/app/di";
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
            })
            .catch(e => {
                throw e;
            });
    }, [engineIndex])

    return (
        <Stack 
            my="1em"
            {...rest}
        >
            {
                searching ? 
                <Text fontWeight={"light"}>Parsing the best matches...</Text> :
                jobResults.map(v => <JobSearchResult key={v.job_link} jobData={v} />)
            }
        </Stack>
    )
}