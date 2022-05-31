// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import FilterSideBarDrawer from "@/app/components/FilterSideBar/FilterSideBarDrawer"
import JobSearchResult from "@/app/components/JobSearchResults/JobSearchResult"
import JobSearchResults from "@/app/components/JobSearchResults/JobSearchResults"
import { SearchBar } from "@/app/components/SearchForm"
import { JobPost, SerializedJobPost, serializeJobPost } from "@/core/JobPost"
import { SettingsIcon } from "@chakra-ui/icons"
import { Button, Container, Flex, Grid, GridItem, Heading, useDisclosure } from "@chakra-ui/react"
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
    const [keywords, setKeywords] = useState(router.query.keywords as string || "");
    const [location, setLocation] = useState(router.query.location as string || "");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSearchSubmit = () => {
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
        setSearching(false);
    }, [searchResult])

    return (
        <Container>
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
                primaryVal={keywords}
                setPrimaryVal={setKeywords}
                secondaryVal={location}
                setSecondaryVal={setLocation}
                loading={searching}
            />

            <JobSearchResults jobResults={searchResult} />
            <Grid display={{base: 'none', lg: 'block'}}>
                <GridItem w="30%">

                </GridItem>
                <GridItem w='70%'>
                    {
                        searchResult.map(v => 
                            <div key={v.link}>
                                <h1>{v.name}</h1>
                                <a href={v.company.link}>{v.company.name}</a>
                                <a href={v.link}>Link to Job</a>
                            </div>
                        )
                    }
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
            const scraper = container.get<LinkedinJobScraper>(LinkedinJobScraper);
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