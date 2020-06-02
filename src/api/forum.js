import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/teacher/articles',
    method: 'get'
  })
}

export function getArticleAndComments(at_id) {
  return request({
    url: '/teacher/article/' + at_id,
    method: 'get'
  })
}
export function addComment(data) {
  return request({
    url: '/teacher/addComment',
    method: 'post',
    data
  })
}
