// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

/**
 * An object that holds location data
 * @typedef {Object} LocationData
 * @property {string} countryCode - Code of the country
 * @property {string} country - Name of the country
 * @property {string} city - Name of the city
 * @property {string} latitude - Location's Latitude
 * @property {string} longitude - Location's Longitude
 * @property {string} state - Location's State
 */

import { parseFetchResponseJSON } from "./parseFetchResponse";

/**
 * Gets current location
 * @returns {Promise<LocationData>} locationData - Current Location
 */
export async function getCurrentLocation() {
    const { json } = await parseFetchResponseJSON(await fetch("https://geolocation-db.com/json/"));

    return {
        countryCode: json.country_code,
        country: json.country_name,
        city: json.city,
        latitude: json.latitude,
        longitude: json.longitude,
        state: json.state
    }
}