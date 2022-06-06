// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Checkbox, Container, FormControl, FormLabel } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function EngineOptions() {
    const router = useRouter();
    const { initLocation, initEngines } = router.query;
    const [activeEngines, setActiveEngines] = useState<string[]>([]);

    useEffect(() => {
        if (!router.isReady) return;
        if (initEngines !== undefined) setActiveEngines(initEngines ? (initEngines as string).trim().split(",") : ["all"]);
    }, [router.isReady]);


    return (
        <>
            <FormControl>
                <FormLabel
                    as="legend"
                    fontWeight={"semibold"}
                    mb="0.5em"
                >
                    Engines
                </FormLabel>
                <Checkbox>
                    
                </Checkbox>
            </FormControl>
        </>
    )
}