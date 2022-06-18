// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { forwardRef, Image, ImageProps } from "@chakra-ui/react"
import { useRouter } from "next/router";


const JootLogo = forwardRef<Omit<ImageProps, "src">, 'img'>((props, ref) => {
    const router = useRouter();
    
    return (
        <Image 
            src="/joot.work.svg" 
            mx="auto"
            ref={ref}
            onClick={() => router.push("/")}
            _hover={{cursor: "pointer"}}
            {...props}
        />
    )
});

export default JootLogo;