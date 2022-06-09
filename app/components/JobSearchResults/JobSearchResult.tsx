// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost, SerializedJobPost } from "@/core/JobPostService";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Image } from "../Image";

import Link from "next/link";
import { useMemo, useState } from "react";
import getTimeDifference from "@/app/util/getTimeDifference";

export interface JobSearchResultProps {
    jobData: SerializedJobPost
}

export default function JobSearchResult({
    jobData
}: JobSearchResultProps) {
    const prettyTimeDiff = useMemo(() => jobData.postedDate != null ? getTimeDifference(new Date(jobData.postedDate), new Date(Date.now())) : jobData.formattedDate || "Time Unknown", [jobData]);
    const isRecent = prettyTimeDiff.indexOf("hour") !== -1 || 
                     prettyTimeDiff.includes('Today');
    return (
        <Flex
            padding="1em"
            border="1px solid gray"
            borderRadius="4px"
            gap="20px"
        >
            <Box width="35px">
                <Image 
                    src={jobData.company.logoUrl || "https://placehold.jp/64x64.png"} 
                    alt={jobData.company.company_name + "'s Logo Image"} 
                    width={"100%"}
                    height={"100%"}
                    w="auto"
                    h="auto"
                />
            </Box>
            <Box
                margin="0"
            >
                 <Text 
                    fontSize={"xs"} 
                    fontWeight={isRecent ? "bold" : "semibold"}
                    color={isRecent ? "blue.500" : "gray.600"}
                    mb="5px"
                >
                    Posted {prettyTimeDiff}
                </Text>
                <Heading
                    fontSize="lg"
                    margin="0"
                >
                    <Link href={jobData.job_link}>
                        {jobData.job_title}
                    </Link>
                </Heading>
                <Text>
                    <Link href={jobData.company.company_link!} target="_blank" rel="opopener noreferrer">
                        {jobData.company.company_name}
                    </Link>
                </Text>
            </Box>
        </Flex>
    )
}