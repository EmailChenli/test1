import request from '../utils/request'

export function departmentfindall(){
    return request({
        url: 'http://localhost:8003/sys/department/findall',
        method: 'get'
    })
}

export function departmentfindbyid(department_id){
    return request({
        url: 'http://localhost:8003/sys/department/findbyid/'+department_id,
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

// export default{
//     departmentfindbyid(department_id){
//         return request({
//             url: 'http://localhost:8888/sys/department/findbyid/'+department_id,
//             method: 'get'
//         });
//     }
// } 



