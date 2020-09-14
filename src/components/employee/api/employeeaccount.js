import request from '../utils/request'

export function accountfindall(){
    return request({
        url: 'http://localhost:8003/sys/account/findall',
        method: 'get'
    })
}

export function accountfindbyid(accountId){
    return request({
        url: 'http://localhost:8003/sys/account/findbyid/'+accountId,
        method: 'get'
    })
}

export function accountupdate(account){
    return request({
        url: 'http://localhost:8003/sys/account/update',
        method: 'post',
        data:
            account
    })
}

export function accountadd(account){
    return request({
        url: 'http://localhost:8003/sys/account/add',
        method: 'post',
        data:
            account
    })
}

export function accountfindlike(account){
    return request({
        url: 'http://localhost:8003/sys/account/findlike',
        method: 'post',
        data:
            account
    })
}
