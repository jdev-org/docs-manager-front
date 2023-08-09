import { isEmpty } from "lodash";
export const paramToString = (params = {}) => {
    let urlParams = "";
    if (!isEmpty(params)) {
        urlParams = new URLSearchParams(params);
        urlParams = `?${urlParams.toString()}`;
    }
    return urlParams;
};

export function clickUrl(url, title) {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", title);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}
