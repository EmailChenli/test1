import request from '../utils/request'

export function jobfindall(page){
    return request({
        url: 'http://localhost:8003/sys/job/findall',
        method: 'post',
        data:
            page
    })
}

export function jobfindbyid(jobId){
    return request({
        url: 'http://localhost:8003/sys/job/findbyid/'+jobId,
        method: 'get'
    })
}

export function jobupdate(jobInfo){
    return request({
        url: 'http://localhost:8003/sys/job/update',
        method: 'post',
        data:
            jobInfo
    })
}

export function jobadd(jobInfo){
    return request({
        url: 'http://localhost:8003/sys/job/add',
        method: 'post',
        data:
            jobInfo
    })
}

export function jobfindlike(jobInfo){
    return request({
        url: 'http://localhost:8003/sys/job/findlike',
        method: 'post',
        data:
            jobInfo
    })
}

export function jobdelete(jobId){
    return request({
        url: 'http://localhost:8003/sys/job/delete'+jobId,
        method: 'get',
    })
}
