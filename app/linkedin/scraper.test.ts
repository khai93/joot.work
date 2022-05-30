// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost } from "@/core/JobPost";
import { LinkedinJobScraper } from "./scraper";
import { rest } from "msw";
import { setupServer } from "msw/node";
import fs from "fs/promises";
import path from "path";

const server = setupServer(
    rest.get("https://www.linkedin.com/jobs/search", async (req, res, ctx) => {
        const mockHTMLPage = await fs.readFile(path.resolve(__dirname, "./__mocks__/linkedinSearchMock.html"));
        
        return res(ctx.set('Content-Type', 'text/html'), ctx.body(mockHTMLPage));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LinkedinJobScraper', () => { 
    describe('#search', () => {
        it('should return correct test data', async () => {
            const scraper = new LinkedinJobScraper();
            expect(await scraper.search(['test'])).toMatchSnapshot();
        });
    })
})