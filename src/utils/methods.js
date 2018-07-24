import URI from "urijs";

export const objectToQueryString = (obj) => {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
}


export const getBackURL = () => {
    let url      = URI(window.location.href);
    let query    = url.search(true);
    let fragment = url.fragment();
    let backUrl  = query.hasOwnProperty('BackUrl') ? query['BackUrl'] : null;
    if(fragment != null && fragment != ''){
        backUrl += `#${fragment}`;
    }
    return backUrl;
}