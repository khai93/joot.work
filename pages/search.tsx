// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import FilterSideBarContent from "@/app/components/FilterSideBar/FilterSideBarContent"
import FilterSideBarDrawer from "@/app/components/FilterSideBar/FilterSideBarDrawer"
import JobSearchResults from "@/app/components/JobSearchResults/JobSearchResults"
import { SearchBar } from "@/app/components/SearchForm"
import { IndeedJobScraper } from "@/app/indeed"
import { JobPost, SerializedJobPost, serializeJobPost } from "@/core/JobPost"
import { SettingsIcon } from "@chakra-ui/icons"
import { Button, Container, Flex, Grid, GridItem, Heading, useDisclosure, Text } from "@chakra-ui/react"
import { GetServerSideProps, GetServerSidePropsContext, NextPageContext, PreviewData } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import { container } from "../app/di"
import { LinkedinJobScraper } from "../app/linkedin"

export interface SearchPageProps {
    searchResult: SerializedJobPost[]
}

export default function SearchPage({searchResult}: SearchPageProps) {
    const [searching, setSearching] = useState(false);
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSearchSubmit = (keywords: string, location: string) => {
        setSearching(true);
        router.push({
          pathname: "/search",
          query: {
            keywords,
            location
          },
        }, undefined, { shallow: false });
    }

    useEffect(() => {
        if (searching === true) {
            setSearching(false);
        }
    }, [searchResult])

    return (
        <Container minWidth={{lg: "60%"}}>
            <FilterSideBarDrawer isOpen={isOpen} onClose={onClose} />
            <Flex my={{base: "1em"}}>
                <Heading fontSize="2xl" fontWeight={"bold"} marginRight="auto">Rework</Heading>
                <Button 
                    display={{lg: "none"}}
                    onClick={onOpen}
                    leftIcon={<SettingsIcon />}
                    colorScheme="telegram"
                    size={"sm"}
                >
                    Filters
                </Button>
            </Flex>
            
            <SearchBar
                primaryPlaceholder='Job Title, Company, or Keywords'
                secondaryPlaceholder='Location or try "Remote"'
                onSubmit={handleSearchSubmit}
                defaultKeywords={router.query.keywords as string || ""}
                defaultLocation={router.query.location as string || ""}
                loading={searching}
            />

            <JobSearchResults display={{lg:"none"}}  jobResults={searchResult} />
            <Grid
                display={{base:"none", lg: "grid"}}
                
                templateRows='repeat(8, 1fr)'
                templateColumns='repeat(8, 1fr)'
                my="1em"
                gap={2}
            >
                <GridItem rowSpan={8} colSpan={2} mt="1em">
                    <Heading 
                        size={"md"}
                        fontWeight="semibold" 
                        mb="1em" 
                        pb="0.9em" 
                        borderBottom="1px solid lightgray"
                        mr="4em"
                    >
                        Search Filters
                    </Heading>
                    <FilterSideBarContent />
                </GridItem>
                <GridItem rowSpan={8} colSpan={6}>
                    <JobSearchResults jobResults={searchResult} />
                </GridItem>
            </Grid>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    let searchResult: JobPost[] = [];

    const { keywords, engines } = ctx.query;
    
    if (typeof(keywords) === "string") {
        try {
            const scraper = container.get<IndeedJobScraper>(IndeedJobScraper);
            searchResult = await scraper.search(keywords.split(" "));
        } catch (e) {
            console.error(e);
        }
    }

    return {
        props: {
            searchResult: searchResult.map(serializeJobPost)
        }
    }
}