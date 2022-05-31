// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import SearchForm from '@/app/components/SearchForm/SearchForm'
import { useColorModeValue, Container, Heading, Stack, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {

  const handleSearchSubmit = (primaryVal: string, secondaryVal: string) => {

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
        <SearchForm 
          primaryPlaceholder='Job Title, Company, or Keywords'
          secondaryPlaceholder='Location or try "Remote"'
          onSubmit={handleSearchSubmit}
        />
      </Stack>
      
    </Container>
  )
}

export default Home
