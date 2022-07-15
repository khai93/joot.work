// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobSearchFilter } from "@/core/JobSearchService";
import { Container, FormControl, FormLabel, Heading, Input, InputGroup, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface FilterSideBarContentProps {
    filterData: JobSearchFilter,
    setFilterData: (v: JobSearchFilter) => void,
}

export default function FilterSideBarContent(
    {
        filterData,
        setFilterData
    }: FilterSideBarContentProps
) {
    const [company, setCompany] = useState(filterData.company);
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
                <RadioGroup defaultValue={2} value={filterData.remoteType} onChange={v => setFilterData({...filterData, remoteType: parseInt(v)})}>
                    <Stack spacing="0.8em">
                        <Radio value={0}>In-Office</Radio>
                        <Radio value={1}>Fully Remote</Radio>
                        <Radio value={2}>Hybrid</Radio>
                    </Stack>
                </RadioGroup>
                <FormLabel 
                    as="legend" 
                    fontWeight="semibold" 
                    fontSize={"lg"}
                    mb={"0.5em"}
                    mt={"1.5em"}
                >
                    Company
                </FormLabel>
                <InputGroup>
                    <Input 
                        placeholder="Facebook, Amazon, ..." 
                        onChange={(e) => setCompany(e.target.value)}
                        onSubmit={(e) => setFilterData({
                            ...filterData,
                            company
                        })}
                    />
                </InputGroup>
            </FormControl>
        </>
    )
}