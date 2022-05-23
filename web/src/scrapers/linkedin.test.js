// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import LinkedinApi from "./linkedin";


describe("Linkedin Api Wrapper", () => {
    describe('#searchJobs', () => {
        it("should return search results if successful", async () => {
            const linkedin = new LinkedinApi();
            await linkedin.searchJobs("web developer");
        });
    })
});