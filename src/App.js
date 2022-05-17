// Copyright 2020 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/rework" element={<HomePage />}/>
    </Routes>
  );
}

export default App;