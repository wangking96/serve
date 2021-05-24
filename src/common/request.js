import service from "./service";
const request = ({url = 'api', params, method = 'get', type = 'default'}) => {
    return new Promise((resolve, reject) => {
        let data = {};
        if(method === 'get') data = { params };
        if(method === 'post') data = { data: params };
        data.device = 1
        service({
            url,
            method,
            type,
            ...data
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}

export default request;