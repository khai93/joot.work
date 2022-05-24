// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { ApiRequestError } from "../common/errors";

/**
 * A helper function to handle common fetch responses
 * @param {Response} response
 * @returns {Promise<Response>} response
 */
export async function parseFetchResponse(response) {
    response = Promise.resolve(response);
    if (response.status >= 400) throw new ApiRequestError("An unexpected response occured during an api request.", response.status);
        
    return response;
}

/**
 * A helper function to handle html fetch responses
 * @param {Response} response
 * @returns {Promise<{response: Response, _document: Document}>} response
 */
export async function parseFetchResponseHTML(response) {
    response = await parseFetchResponse(response);
    const parser = new DOMParser();
    return {
        response,
        _document: parser.parseFromString(await response.text(), "text/html")
    };
}

/**
 * A helper function to handle json fetch responses
 * @param {Response} response
 * @returns {Promise<{response: Response, json: Object}>} response
 */
 export async function parseFetchResponseJSON(response) {
    response = await parseFetchResponse(response);
    return {
        response,
        json: await response.json()
    };
}