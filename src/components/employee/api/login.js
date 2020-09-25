import request from '../utils/request'

export function login(sysUser){
    return request({
        url: 'http://localhost:8003/sys/login/sysuser',
        method: 'post',
        data:
            sysUser
    })
}


export function sysUserInfo(sysUserName){
    return request({
        url: 'http://localhost:8003/sys/login/sysUserInfo',
        method: 'post',
        data:
            sysUserName
    })
}

export function changePassword(passwordUtil){
    return request({
        url: 'http://localhost:8003/sys/login/changePassword',
        method: 'post',
        data:
            passwordUtil
    })
}


