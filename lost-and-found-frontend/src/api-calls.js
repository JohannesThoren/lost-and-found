// Copyright (c) 2021 Johannes Thorén
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export const str_api_root = "http://localhost:3001"


/**
 * This function is used to get data from the API server
 * @param {String} str_api_root
 * @param {String} str_call_path
 * @returns Json Object containing the data you made a request for or an error code
 */

import axios from "axios";

export async function api_get(str_call_path) {
    const response = await axios.get(str_api_root + str_call_path);
    return response.data;
}

/**
 *
 * @param {JSON} json_body
 * @param {String} str_api_root
 * @param {String} str_call_path
 * @returns A Message or some json data depending on what you call.
 */
export async function api_post(json_body, str_call_path) {
    const response = await axios.post(str_api_root + str_call_path, json_body);
    return response.data
}

export async function api_put(json_body, str_call_path) {
    const response = await axios.put(str_api_root + str_call_path, json_body);
    return response.data
}

export async function api_delete(str_call_path) {
    const response = await axios.delete(str_api_root + str_call_path);
    return response.data
}
