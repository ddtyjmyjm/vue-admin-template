import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/course/findAll',
    method: 'get'
  })
}

export function findById(id) {
  return request({
    url: '/course/findById',
    method: 'get',
    params: { id }
  })
}

export function findByName(name) {
  return request({
    url: '/course/findByName',
    method: 'get',
    params: { name }
  })
}

export function createCourse(data) {
  return request({
    url: '/teacher/createCourse',
    method: 'post',
    data
  })
}

export function updateCourse(data) {
  return request({
    url: '/teacher/updateCourse',
    method: 'post',
    data
  })
}

export function deleteCourseList(data) {
  return request({
    url: '/teacher/deleteCourse',
    method: 'post',
    data
  })
}

