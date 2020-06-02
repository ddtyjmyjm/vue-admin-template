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

export function getTests(co_id) {
  return request({
    url: '/teacher/findTest/' + co_id,
    method: 'get'
  })
}

export function getStudents(co_id) {
  return request({
    url: '/courseoffering/findStudentsWrap/' + co_id,
    method: 'get'
  })
}

export function getStudentsAndProcess(co_id) {
  return request({
    url: '/teacher/findStudentsWrap/' + co_id,
    method: 'get'
  })
}
export function addStudents(data) {
  return request({
    url: '/teacher/addCourseOfferingStudents',
    method: 'post',
    data
  })
}

export function offerCourse(data) {
  return request({
    url: '/teacher/offerCourse',
    method: 'post',
    data
  })
}
