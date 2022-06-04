// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { IndeedJobScraper } from "./scraper";
import fs from "fs/promises";
import path from "path";

const server = setupServer(
    rest.get("https://www.indeed.com/jobs", async (req, res, ctx) => {
        const mockHTMLPage = await fs.readFile(path.resolve(__dirname, "./__mocks__/indeedSearchMock.html"));
        
        return res(ctx.set('Content-Type', 'text/html'), ctx.body(mockHTMLPage));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LinkedinJobScraper', () => { 
    describe('#search', () => {
        it('should return correct test data', async () => {
            const scraper = new IndeedJobScraper();
            expect(await scraper.search(['test'])).toMatchSnapshot();
        });
    })
});