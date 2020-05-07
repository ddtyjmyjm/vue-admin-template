import { findAll, findById, findByName } from '@/api/course'

const state = {
  courseList: [{
    id: null,
    name: '',
    description: '',
    course_img_url: ''
  }],
  courseCreated: {
    id: null,
    name: '',
    description: '',
    course_img_url: ''
  }
}

const mutations = {
  SET_COURSE_LIST(state, courseList) {
    state.courseList = courseList
  },
  SET_COURSE_CREATE(state, course) {
    state.courseCreate = course
  }
}

const actions = {
  findAll({ commit }) {
    findAll().then(response => {
      commit('SET_COURSE_LIST', response.data)
    })
  },
  findById({ commit }, id) {
    findById(id).then(response => {
      commit('SET_COURSE_LIST', response.data)
    })
  },
  findByName({ commit }, name) {
    findByName(name).then(response => {
      commit('SET_COURSE_LIST', response.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
