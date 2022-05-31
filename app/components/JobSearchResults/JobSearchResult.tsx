// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost, SerializedJobPost } from "@/core/JobPost";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Image } from "../Image";

import Link from "next/link";

export interface JobSearchResultProps {
    jobData: SerializedJobPost
}

export default function JobSearchResult({
    jobData
}: JobSearchResultProps) {
    return (
        <Flex
            padding="1em"
            border="1px solid gray"
            borderRadius="4px"
            gap="20px"
        >
            <Box width="35px">
                <Image 
                    src={jobData.company.logoUrl} 
                    alt={jobData.company.name + "'s Logo Image"} 
                    width={"100%"}
                    height={"100%"}
                    w="auto"
                    h="auto"
                />
            </Box>
            <Box
                margin="0"
            >
                <Heading
                    fontSize="lg"
                    margin="0"
                >
                    {jobData.name}
                </Heading>
                <Text>
                    <Link href={jobData.company.link} target="_blank" rel="opopener noreferrer">
                        {jobData.company.name}
                    </Link>
                </Text>
            </Box>
        </Flex>
    )
}