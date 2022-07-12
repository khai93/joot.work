// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobSearchFilter } from "@/core/JobSearchService"
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react"
import FilterSideBarContent from "./FilterSideBarContent"

export interface FilterSideBarDrawerProps {
    isOpen: boolean,
    filterData: JobSearchFilter,
    setFilterData: (v: JobSearchFilter) => void,
    onClose: () => void
}

export default function FilterSideBarDrawer({ 
    isOpen,
    filterData,
    setFilterData,
    onClose
 }: FilterSideBarDrawerProps) {

    return (
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>
                    Search Filters
                </DrawerHeader>
                <DrawerBody>
                    <FilterSideBarContent filterData={filterData} setFilterData={setFilterData} />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}