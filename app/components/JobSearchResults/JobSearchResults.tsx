// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost, SerializedJobPost } from "@/core/JobPost";
import { Heading, Stack } from "@chakra-ui/react";
import JobSearchResult from "./JobSearchResult";

export interface JobSearchResultsProps {
    jobResults: SerializedJobPost[]
}

export default function JobSearchResultsMobile({
    jobResults
}: JobSearchResultsProps) {
    return (
        <Stack my="1em">
            {
                jobResults.map(v => <JobSearchResult key={v.link} jobData={v} />)
            }
        </Stack>
    )
}