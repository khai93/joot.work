// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Container, FormControl, FormLabel, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface FilterSideBarContentProps {

}

export default function FilterSideBarContent(
    {

    }: FilterSideBarContentProps
) {
    const router = useRouter();
    const { initLocation, initRemote } = router.query;
    const [remote, setRemote] = useState(0);

    useEffect(() => {
        if (!router.isReady) return;
        if (initRemote !== undefined) setRemote(initRemote ? Number(initRemote) : 0);
    }, [router.isReady]);

    return (
        <>
            <FormControl as="fieldset">
                <FormLabel 
                    as="legend" 
                    fontWeight="semibold" 
                    fontSize={"lg"}
                    mb={"0.5em"}
                >
                    Remote
                </FormLabel>
                <RadioGroup defaultValue={remote} value={remote} onChange={v => setRemote(Number(v))}>
                    <Stack spacing="0.8em">
                        <Radio value={0}>In-Office</Radio>
                        <Radio value={1}>Fully Remote</Radio>
                        <Radio value={2}>Hybrid</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
        </>
    )
}