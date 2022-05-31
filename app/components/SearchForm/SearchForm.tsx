// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Button, Input, InputGroup, InputLeftElement,  useColorModeValue } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

export interface SearchBarProps {
    primaryPlaceholder?: string,
    secondaryPlaceholder?: string,
    onSubmit?: (primaryVal: string, secondaryVal: string) => void,
    children?: ReactNode
}

export default function SearchBar({children, primaryPlaceholder, secondaryPlaceholder, onSubmit }: SearchBarProps) {
    const [primaryVal, setPrimaryval] = useState("");
    const [secondaryVal, setSecondaryval] = useState("");
    
    return (
        <Box display={{ lg: "flex" }}>
            <InputGroup>
                <InputLeftElement 
                    pointerEvents="none" 
                    children={<SearchIcon color={useColorModeValue("gray.300", "white.300")} />}
                />
                <Input 
                    placeholder={primaryPlaceholder} 
                    size="md" 
                    variant="outline"
                    value={primaryVal}
                    onChange={(e) => setPrimaryval(e.target.value)}
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
                    value={secondaryVal}
                    onChange={(e) => setSecondaryval(e.target.value)}
                >
                    {
                        children
                    }
                </Input>
            </InputGroup>
            <Button 
                marginTop={{base: "0.5em", lg: "0"}} 
                colorScheme='blue' 
                size="md" 
                px="2em" 
                width={{base: "100%", lg: "2em"}} 
                onClick={() => onSubmit && onSubmit(primaryVal, secondaryVal)}
            >
                Search
            </Button>
        </Box>
    );
}