// import request from '@/utils/request'
import axios from 'axios'
export function getList(id) {
//   return request({
//     url: 'http://localhost:8080/teacher/listOfferingCourses/' + id,
//     method: 'get'
//   })
  return axios
    .get('http://localhost:8080/teacher/listOfferingCourses/' + id)
}
