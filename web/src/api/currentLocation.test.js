// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { getCurrentLocation } from "./currentLocation";

afterEach(() => {
    global.fetch.mockClear();
});

describe("getCurrentLocation", () => {
    it("should return location data", async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                country_code: 'TE',
                country_name: 'test',
                city: "city",
                latitude: "4",
                longitude: "5",
                state: "Oklahoma"
            })
        }));

        const resp = await getCurrentLocation();

        expect(resp.countryCode).toBe("TE");
        expect(resp.country).toBe("test");
        expect(resp.city).toBe("city");
        expect(resp.latitude).toBe("4");
        expect(resp.longitude).toBe("5")
        expect(resp.state).toBe("Oklahoma");
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});