import { paramToString } from "../utils/utils";
import axios from "@mapstore/libs/ajax";

export const getDocuments = (api = "", plugin = "", params = {}) => {
    return fetch(`${api}/plugin/${plugin}${paramToString(params)}`).then((r) =>
        r.json()
    );
};

export const deleteDocumentFetch = (api = "", plugin = "", id = "") => {
    return fetch(`${api}/plugin/${plugin}/${id}`, {
        method: "DELETE",
    }).then((r) => r.json());
};

export function deleteDocument(api = "", plugin = "", id = "") {
    return axios.delete(`${api}/plugin/${plugin}/${id}`);
}

export const downloadDocument = (url = "") => {
    return fetch(url, { method: "GET" }).then((r) => r.json());
};

export const showDocument = (url = "") => {
    return downloadDocument(url).then((r) => r);
};

export const verifyLabel = (api = "", plugin = "", label) => {
    return fetch(`${api}/plugin/${plugin}/label/${label}`).then((r) =>
        r.json()
    );
};

export function uploadDocument(api = "", plugin = "", file, params) {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post(`${api}/plugin/${plugin}`,
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: params
        });
}