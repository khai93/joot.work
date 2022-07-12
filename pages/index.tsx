// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import JootLogo from '@/app/components/JootLogo';
import { SearchForm } from '@/app/components/SearchForm'
import { useColorModeValue, Container, Stack, Button } from '@chakra-ui/react'
import { Icon } from '@iconify/react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home: NextPage = () => {
  const [searching, setSearching] = useState(false);
  const router = useRouter();
  
  const handleSearchSubmit = (keywords: string, location: string) => {
    setSearching(true);
    router.push({
      pathname: "/search",
      query: {
        keywords,
      }
    });
  }

  return (
    <Container 
      display="flex" 
      height="100vh" 
      minWidth={{base: "20em", lg: "50em"}}
      backgroundColor={useColorModeValue("white.300", "white.300")}
    >
      <Stack spacing="2.6rem" width="100%" my="auto" >
        <JootLogo />
        <SearchForm 
          primaryPlaceholder='Job Title, Company, or Keywords'
          secondaryPlaceholder='Location or try "Remote"'
          onSubmit={handleSearchSubmit}
          defaultLocation={""}
          defaultKeywords={""}
          mb={{base: "0.5em", lg: "3em"}} 
          loading={searching}
          additionalButtons={[
            <a key="github" href="https://github.com/khai93/joot.work" target="_blank">
                <Button
                  marginTop={{base: "0.5em", lg: "0"}} 
                  bg="transparent"
                  border="1px solid #484646"
                  color="brandBlack"
                  fontWeight={"normal"}
                  size={{base: "md"}} 
                  width="full"
                  px="1.5em"
                  py={{base: "1.5em", lg: "1.4em"}}
                  _hover={{
                      transform: "scale(96%)",
                  }}
                  borderRadius={{base: "100px", lg: "5px"}}
                  minWidth={{base: "100%", lg: "4em"}} 
                  leftIcon={<Icon icon="bi:github" height="1.2em" viewBox="0 0 25 15" />}
                >
                    View on Github
              </Button>
            </a>
          ]}
        />
      </Stack>
      
    </Container>
  )
}

export default Home
