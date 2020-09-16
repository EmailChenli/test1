import request from '../utils/request'

export function employeeDistributefindById(employeeDistributeId){
    return request({
        url: 'http://localhost:8003/sys/employeedistribute/findbyid/'+employeeDistributeId,
        method: 'get'
    })
}



export function  employeeDistributefindall(page){
        return request({
            url: 'http://localhost:8003/sys/employeedistribute/findall',
            method: 'post',
            data: 
                page
        })
}

export function  employeeDistributeupdate(employeeDistribute){
    return request({
        url: 'http://localhost:8003/sys/employeedistribute/update',
        method: 'post',
        data:
            employeeDistribute
    })
}

<<<<<<< HEAD
export function  employeeDistributefindlike(employeeDistribute){
    return request({
        url: 'http://localhost:8003/sys/employeedistribute/findlike',
        method: 'post',
        data:
            employeeDistribute
=======
export function  employeeDistributefindlike(employeeId,jobName,departmentName){
    return request({
        url: 'http://localhost:8003/sys/employeedistribute/findlike'+employeeId&jobName&departmentName,
        method: 'get',
       
>>>>>>> cb28b31a0f704cf78eb8d8f63bed48906ddeaaf8
    })
}


