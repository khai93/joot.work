// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Button, Input, InputGroup, InputLeftElement,  useColorModeValue } from "@chakra-ui/react";
import { ReactNode, useState, KeyboardEvent } from "react";

export interface SearchBarProps {
    primaryPlaceholder?: string,
    defaultKeywords?: string,
    secondaryPlaceholder?: string,
    defaultLocation?: string,
    loading?: boolean,
    onSubmit?: (keywords: string, location: string) => void,
    children?: ReactNode
}

export function SearchBar({
    children, 
    primaryPlaceholder, 
    secondaryPlaceholder, 
    defaultKeywords,
    defaultLocation,
    onSubmit, 
    loading
}: SearchBarProps) {
    const [keywords, setKeywords] = useState(defaultKeywords || "");
    const [location, setLocation] = useState(defaultLocation || "");

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.code === "Enter") {
            onSubmit && onSubmit(keywords, location);
        }
    }

    return (
        <Box display={{ lg: "flex" }} onKeyDown={handleKeyPress}>
            <InputGroup>
                <InputLeftElement 
                    pointerEvents="none" 
                    children={<SearchIcon color={useColorModeValue("gray.300", "white.300")} />}
                />
                <Input 
                    placeholder={primaryPlaceholder} 
                    size="md" 
                    variant="outline"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                >
                    {
                        children
                    }
                </Input>
                
            </InputGroup>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<StarIcon color={useColorModeValue("gray.300", "white.300")} />}
                />
                <Input 
                    placeholder={secondaryPlaceholder} 
                    size="md" 
                    variant="outline"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    {
                        children
                    }
                </Input>
            </InputGroup>
            <Button 
                marginTop={{base: "0.5em", lg: "0"}} 
                colorScheme='teal' 
                size={{base: "md"}} 
                px="2em" 
                minWidth={{base: "100%", lg: "4em"}} 
                onClick={() => onSubmit && onSubmit(keywords, location)}
                isLoading={loading}
                loadingText='Searching'
            >
                Search
            </Button>
        </Box>
    );
}