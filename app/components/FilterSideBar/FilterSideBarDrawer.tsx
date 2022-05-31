// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react"

export interface FilterSideBarDrawerProps {
    isOpen: boolean,
    onClose: () => void
}

export default function FilterSideBarDrawer({ 
    isOpen,
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
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}