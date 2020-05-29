import request from '@/utils/request'
// import axios from 'axios'
export function getList(id) {
  return request({
    url: '/teacher/listOfferingCourses/' + id,
    method: 'get'
  })
}

export function getDetail(co_id) {
  return request({
    url: '/teacher/courseOffering/' + co_id,
    method: 'get'
  })
}

export function getResources(co_id) {
  return request({
    url: '/courseoffering/findCourseResourcesWrap/' + co_id,
    method: 'get'
  })
}
export function getStudents(co_id) {
  return request({
    url: '/courseoffering/findStudentsWrap/' + co_id,
    method: 'get'
  })
}
