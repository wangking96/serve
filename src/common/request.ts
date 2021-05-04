import service from "./service";
import { requestItem } from "./data";

const request = ({url, params, method}:requestItem) => {
    return new Promise((resolve, inject) => {
        let data:object = {};
        if(method === 'get') data = { params };
        if(method === 'post') data = { data: params };
        
        service({
            url,
            method,
            ...data
        }).then(res => {
            resolve(res);
        }).catch(err => {
            inject(err)
        })
    })
}

export default request