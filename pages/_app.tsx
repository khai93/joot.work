// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { ChakraProvider } from '@chakra-ui/react'
import './styles/globals.css'
import type { AppProps } from 'next/app'
import theme from '../app/theme'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/redux/store';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider> 
      </PersistGate>
    </Provider>
  );
}

export default MyApp
