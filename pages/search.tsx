// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import FilterSideBarContent from "@/app/components/FilterSideBar/FilterSideBarContent"
import FilterSideBarDrawer from "@/app/components/FilterSideBar/FilterSideBarDrawer"
import JobSearchResults from "@/app/components/JobSearchResults/JobSearchResults"
import JootLogo from "@/app/components/JootLogo"
import { SearchBar } from "@/app/components/SearchForm"
import { SettingsIcon } from "@chakra-ui/icons"
import { Button, Container, Image, Flex, Grid, GridItem, Heading, useDisclosure, Tabs, TabList, Tab } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { jobScrapers } from "../app/di"

export interface SearchPageProps {

}

export default function SearchPage({}: SearchPageProps) {
    const [searching, setSearching] = useState(false);
    const [activeEngineTab, setActiveEngineTab] = useState(0);
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const keywords = router.query.keywords as string || "";

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

    const handleActiveEngineChange = (index: number) => {
        setActiveEngineTab(index);
    }

    return (
        <Container minWidth={{lg: "60%"}}>
            <FilterSideBarDrawer isOpen={isOpen} onClose={onClose} />
            <Flex my={{base: "1em"}}>
                <JootLogo width="12em" />
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
                defaultKeywords={keywords}
                defaultLocation={router.query.location as string || ""}
                loading={searching}
            />
            
            <Tabs 
                index={activeEngineTab} 
                onChange={handleActiveEngineChange}
                mt="1em"
                display={{lg: "none"}}
            >
                <TabList>
                    {
                        jobScrapers.map(v => <Tab key={v.name}>{v.name.charAt(0).toUpperCase() + v.name.slice(1)}</Tab>)
                    }
                </TabList>
            </Tabs>

            <JobSearchResults display={{lg:"none"}} engineIndex={activeEngineTab} setSearching={setSearching} searching={searching} keywords={keywords}  />
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
                <GridItem 
                    rowSpan={8} 
                    colSpan={6} 
                >
                    <Tabs  
                        index={activeEngineTab} 
                        onChange={handleActiveEngineChange}
                        mt="1em"
                    >
                        <TabList>
                            {
                                jobScrapers.map(v => <Tab key={v.name}>{v.name.charAt(0).toUpperCase() + v.name.slice(1)}</Tab>)
                            }
                        </TabList>
                    </Tabs>
                    <JobSearchResults engineIndex={activeEngineTab} setSearching={setSearching} keywords={keywords} searching={searching}/>
                </GridItem>
            </Grid>
        </Container>
    )
}