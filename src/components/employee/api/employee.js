import request from '../utils/request'

export function employeefindall(page){
    return request({
        url: 'http://localhost:8003/sys/employee/findall',
        method: 'post',
        data:
            page
    })
}

export function employeefindbyid(employeeId){
    return request({
        url: 'http://localhost:8003/sys/employee/findbyid/'+employeeId,
        method: 'get'
    })
}

export function employeeupdate(employee){
    return request({
        url: 'http://localhost:8003/sys/employee/update',
        method: 'post',
        data:
            employee
    })
}

export function employeeadd(employee){
    return request({
        url: 'http://localhost:8003/sys/employee/add',
        method: 'post',
        data:
            employee
    })
}

<<<<<<< HEAD
export function employeefindlike(employee){
=======
export function employeefindlike(employee,page){
>>>>>>> 员工管理
    return request({
        url: 'http://localhost:8003/sys/employee/findlike',
        method: 'post',
        data:
<<<<<<< HEAD
            employee
=======
            {
                employee,
                page
            }   
>>>>>>> 员工管理
    })
}

export function employeedelete(employeeId){
    return request({
        url: 'http://localhost:8003/sys/employee/delete/'+employeeId,
        method: 'get'
    })
}
