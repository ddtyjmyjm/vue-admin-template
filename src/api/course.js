import axios from 'axios'
export function findAll() {
  return axios
    .get('http://localhost:8080/course/findAll')
}

export function findById(id) {
  return axios.get('http://localhost:8080/course/findById', { params: { id: id }})
}

export function findByName(name) {
  return axios.get('http://localhost:8080/course/findByName', { params: { name: name }})
}

export function createCourse(course) {
  return axios.post('http://localhost:8080/teacher/createCourse', course)
}
