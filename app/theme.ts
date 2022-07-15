// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { extendTheme, ThemeConfig } from '@chakra-ui/react'


const config: ThemeConfig  = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({ 
  config, 
  colors: {
    brandWhite: {
      100: "#FFFFFF",
      900: "#F3F3F3"
    },
    brandBlack: {
      default: "#252525"
    },
    primary: {
      100: "#0A7562",
      900: "#04C3A1"
    }
  } 
});

export default theme;

  