import request from '../utils/request'

export function departmentfindall(page){
    return request({
        url: 'http://localhost:8003/sys/department/findall',
        method: 'post',
        data:
            page
    })
}

export function departmentfindbyid(departmentId){
    return request({
        url: 'http://localhost:8003/sys/department/findbyid/'+departmentId,
        method: 'get'
    })
}

export function departmentdeletebyid(departmentId){
    return request({
        url: 'http://localhost:8003/sys/department/delete/'+departmentId,
        method: 'get'
    })
}

export function departmentupdate(department){
    return request({
        url: 'http://localhost:8003/sys/department/update',
        method: 'post',
        data:
            department
    })
}

export function departmentadd(department){
    return request({
        url: 'http://localhost:8003/sys/department/add',
        method: 'post',
        data:
            department
    })
}

export function departmentfindlike(department){
    return request({
        url: 'http://localhost:8003/sys/department/findlike',
        method: 'post',
        data:
            department
    })
}




