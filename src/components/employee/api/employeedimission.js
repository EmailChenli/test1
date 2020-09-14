import request from '../utils/request'

export function employeeDimissionfindall(page){
    return request({
        url: 'http://localhost:8003/sys/employeedimission/findall',
        method: 'post',
        data:
            page
    })
}

export function employeeDimissionfindbyid(employeedimissionId){
    return request({
        url: 'http://localhost:8003/sys/employeedimission/findbyid/'+employeedimissionId,
        method: 'get'
    })
}



export function employeeDimissionfindlike(employeeDimission){
    return request({
        url: 'http://localhost:8003/sys/employeedimission/findlike',
        method: 'post',
        data:
            employeeDimission
    })
}

export function employeeDimissiondelete(employeeId){
    return request({
        url: 'http://localhost:8003/sys/employee/delete'+employeeId,
        method: 'get',
    })
}
