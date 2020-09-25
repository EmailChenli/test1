import request from '../utils/request'

export function sysuserfindall(page){
    return request({
        url: 'http://localhost:8003/sys/sysuser/findall',
        method: 'post',
        data:
            page
    })
}


export function sysuserupdate(sysUser){
    return request({
        url: 'http://localhost:8003/sys/sysuser/update',
        method: 'post',
        data:
            sysUser
    })
}


export function sysuserfindlike(sysUser,page){
    return request({
        url: 'http://localhost:8003/sys/sysuser/findlike',
        method: 'post',
        data:
            {
                sysUser,
                page
            }
    })
}