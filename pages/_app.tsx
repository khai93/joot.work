// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { ChakraProvider } from '@chakra-ui/react'
import './styles/globals.css'
import type { AppProps } from 'next/app'
import theme from './theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider> 
  );
}

export default MyApp
