import request from '../utils/request'

<<<<<<< HEAD
export function accountfindall(page){
    return request({
        url: 'http://localhost:8003/sys/account/findall',
        method: 'post',
        data:
            page
=======
export function accountfindall(){
    return request({
        url: 'http://localhost:8003/sys/account/findall',
        method: 'get'
>>>>>>> cb28b31a0f704cf78eb8d8f63bed48906ddeaaf8
    })
}

export function accountfindbyid(accountId){
    return request({
        url: 'http://localhost:8003/sys/account/findbyid/'+accountId,
        method: 'get'
    })
}

<<<<<<< HEAD
export function accountdelete(accountId){
    return request({
        url: 'http://localhost:8003/sys/account/delete/'+accountId,
        method: 'get'
    })
}

=======
>>>>>>> cb28b31a0f704cf78eb8d8f63bed48906ddeaaf8
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
