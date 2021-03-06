// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Button, Input, InputGroup, InputLeftElement,  useColorModeValue } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { ReactNode, useState, KeyboardEvent } from "react";

export interface SearchFormProps {
    primaryPlaceholder?: string,
    variant?: 'primary' | 'compact',
    defaultKeywords?: string,
    secondaryPlaceholder?: string,
    defaultLocation?: string,
    loading?: boolean,
    onSubmit?: (keywords: string, location: string) => void,
    hideButtons?: boolean,
    additionalButtons?: ReactNode[],
    children?: ReactNode
}

export function SearchForm({
    children, 
    primaryPlaceholder, 
    secondaryPlaceholder, 
    defaultKeywords,
    defaultLocation,
    onSubmit, 
    hideButtons,
    additionalButtons,
    variant = "primary",
    loading,
    ...rest
}: SearchFormProps & Omit<BoxProps, "onSubmit">) {
    const [keywords, setKeywords] = useState(defaultKeywords || "");
    const [location, setLocation] = useState(defaultLocation || "");

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.code === "Enter") {
            onSubmit && onSubmit(keywords, location);
        }
    }

    return (
        <Box 
            display={{lg: "flex"}} 
            flexDir="column" 
            onKeyDown={handleKeyPress}
        >
            <Box display={{ lg: "flex" }} {...rest}>
                <Input 
                    placeholder={primaryPlaceholder} 
                    size="lg" 
                    variant="outline"
                    value={keywords}
                    fontSize="16px"
                    borderRadius={{base: "100px", lg: "100px 0 0 100px"}}
                    pl="2em"
                    py={{base: "1.6em", lg: variant === 'primary' ? "1.9em" : undefined}}
                    mb={{base: "0.5em", lg: "0"}}
                    onChange={(e) => setKeywords(e.target.value)}
                >
                    {
                        children
                    }
                </Input>
                <Input 
                    placeholder={secondaryPlaceholder} 
                    size="lg" 
                    variant="outline"
                    value={location}
                    fontSize="16px"
                    py={{base: "1.6em", lg: variant === 'primary' ? "1.9em" : undefined}}
                    pl="2em"
                    borderRadius={{base: "100px", lg: "0 100px 100px 0"}}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    {
                        children
                    }
                </Input>
            </Box>
            <Box 
                display={{lg: "flex"}} 
                mx="auto" 
                
                gap="1em"
            >
                {
                    !hideButtons &&
                    <Button 
                        marginTop={{base: "0.5em", lg: "0"}} 
                        bg="primary.900"
                        color="brandWhite.900"
                        size={{base: "md"}} 
                        px="1.5em" 
                        py={{base: "1.5em", lg: "1.4em"}}
                        width="full"
                        borderRadius={{base: "100px", lg: "5px"}}
                        minWidth={{base: "100%", lg: "4em"}} 
                        onClick={() => onSubmit && onSubmit(keywords, location)}
                        isLoading={loading}
                        _hover={{
                            transform: "scale(96%)",
                        }}
                        loadingText='Searching'
                    >
                        Search for jobs.
                    </Button>
                }
                {
                    !hideButtons && additionalButtons
                }
            </Box>
        </Box>
    );
}