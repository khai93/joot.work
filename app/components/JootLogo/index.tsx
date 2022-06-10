// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Image } from "@chakra-ui/react"
import { ImageProps } from "next/image";
import { useRouter } from "next/router";

const JootLogo = (rest: Omit<ImageProps, "src">) => {
    const router = useRouter();
    
    return (
        <Image 
            src="/joot.work.svg" 
            w={{base: "12em", lg: "18em"}}
            mx="auto"
            onClick={() => router.push("/")}
            _hover={{cursor: "pointer"}}
            {...rest}
        />
    )
}

export default JootLogo;