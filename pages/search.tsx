// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { JobPost, serializeJobPost } from "@/core/JobPost"
import { GetServerSideProps, GetServerSidePropsContext, NextPageContext, PreviewData } from "next"
import { ParsedUrlQuery } from "querystring"
import { container } from "../app/di"
import { LinkedinJobScraper } from "../app/linkedin"

export interface SearchPageProps {
    searchResult: JobPost[]
}

export default function SearchPage({searchResult}: SearchPageProps) {
    return (
        <div>
            {
                searchResult.map(v => 
                    <div key={v.link.toString()}>
                        <h1>{v.name}</h1>
                        <a href={v.company.link.toString()}>{v.company.name}</a>
                        <a href={v.link.toString()}>Link to Job</a>
                    </div>
                )
            }
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    let searchResult: JobPost[] = [];

    const { keywords, engines } = ctx.query;
    
    if (typeof(keywords) === "string") {
        try {
            const scraper = container.get<LinkedinJobScraper>(LinkedinJobScraper);
            searchResult = await scraper.search(keywords.split(" "));
        } catch (e) {
            console.error(e);
        }
    }

    return {
        props: {
            searchResult: searchResult.map(serializeJobPost)
        }
    }
}