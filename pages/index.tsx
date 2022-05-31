// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { SearchBar } from '@/app/components/SearchForm'
import { useColorModeValue, Container, Heading, Stack, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home: NextPage = () => {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [searching, setSearching] = useState(false);
  const router = useRouter();
  
  const handleSearchSubmit = () => {
    setSearching(true);
    router.push({
      pathname: "/search",
      query: {
        keywords,
        location
      }
    });
  }

  return (
    <Container 
      display="flex" 
      height="100vh" 
      backgroundColor={useColorModeValue("white.300", "white.300")}
    >
      <Stack spacing="1.5rem" my="auto">
        <Stack spacing="0.5em">
          <Heading>The internet's search engine for jobs.</Heading>
          <Text>Powered by the most popular job boards.</Text>
        </Stack>
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
      </Stack>
      
    </Container>
  )
}

export default Home
