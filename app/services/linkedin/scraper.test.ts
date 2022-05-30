// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost } from "@/core/JobPost";
import { LinkedinJobScraper } from "./scraper";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.get("https://linkedin.com", (req, res, ctx) => {
        return res(ctx.json({pass: "OK"}))
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

const testData: JobPost[] = [{
    name: "test",
    company: {
        name: "test",
        logoUrl: new URL("https://test.com"),
        link: new URL("https://google.com")
    },
    link: new URL("https://google.com"),
    description: "A test job post",
    postedDate: new Date()
}];

describe('LinkedinJobScraper', () => { 
    describe('#search', () => {
        it('should return correct test data', async () => {
            const scraper = new LinkedinJobScraper();
            expect(await scraper.search(['test'])).toEqual(testData);
        });
    })
})