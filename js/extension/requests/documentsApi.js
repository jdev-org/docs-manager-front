export const getDocuments = (api, plugin) => {
    return fetch(`${api}/plugin/${plugin}`).then((r) => r.json());
};
