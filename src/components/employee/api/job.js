import request from '../utils/request'

export function jobfindall(){
    return request({
        url: 'http://localhost:8003/sys/job/findall',
        method: 'get'
    })
}

export function jobfindbyid(job_id){
    return request({
        url: 'http://localhost:8003/sys/job/findbyid/'+job_id,
        method: 'get'
    })
}

export function jobupdate(job){
    return request({
        url: 'http://localhost:8003/sys/job/update',
        method: 'post',
        data:
            job
    })
}

export function jobadd(job){
    return request({
        url: 'http://localhost:8003/sys/job/add',
        method: 'post',
        data:
            job
    })
}

export function jobfindlike(job){
    return request({
        url: 'http://localhost:8003/sys/job/findlike',
        method: 'post',
        data:
            job
    })
}
