// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.


// Listen on a specific host via the HOST environment variable
const HOST = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const PORT = process.env.PORT || 8080;

const cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with']
}).listen(PORT, HOST, function() {
    console.log('Running CORS Anywhere on ' + HOST + ':' + PORT);
});