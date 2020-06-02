<template>
  <div class="app-container">
    <el-link type="primary">
      <router-link :to="{name:'forum'}">返回列表</router-link>
    </el-link>

    <DIV class="forum">
      <h1>{{ article.title }}</h1>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>{{ article.author }}</span>
          <template v-if="article.role">
            <el-tag>教师</el-tag>
          </template>
          <span style="float: right; padding: 3px 0">{{ article.create_time }}</span>
        </div>
        <p>
          {{ article.content }}
        </p>
      </el-card>
      <el-divider />

      <div v-for="(value, index) in comments" :key="index">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>#{{ index }} </span>
            <span>{{ value.author }}</span>
            <template v-if="value.role">
              <el-tag>教师</el-tag>
            </template>
            <span style="float: right; padding: 3px 0">{{ value.create_time }}</span>
          </div>
          <p>
            {{ value.content }}
          </p>
        </el-card>
      </div>

      <el-divider />

      <div class="editor-container">
        <el-input
          v-model="editContext"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8}"
          placeholder="请输入内容"
        />
      </div>
      <el-button type="primary" icon="el-icon-document" @click="onSubmit">
        发表
      </el-button>
    </DIV>
  </div>
</template>

<script>
import { getArticleAndComments } from '@/api/forum'
import { addComment } from '@/api/forum'

export default {
  name: 'Article',
  data: () => {
    return {
      editContext: '',
      article: [],
      comments: []
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      getArticleAndComments(this.$route.params.id).then(response => {
        console.log(response.data)
        this.article = JSON.parse(response.data.article)
        this.distinguish(this.article)

        this.comments = JSON.parse(response.data.comments)
        for (const com of this.comments) {
          this.distinguish(com)
        }
      })
    },
    distinguish(data) {
      if (data.teacher !== null) {
        data.author = data.teacher.nickname
        data.role = true
      } else if (data.student !== null) {
        data.author = data.student.nickname
        data.role = false
      } else {
        data.author = '匿名'
        data.role = false
      }
    },
    formatDate() {
      var d = new Date()
      var month = '' + (d.getMonth() + 1)
      var day = '' + d.getDate()
      var year = d.getFullYear()

      var hour = d.getHours()
      var min = d.getMinutes()
      var second = d.getMinutes()

      if (month.length < 2) { month = '0' + month }
      if (day.length < 2) { day = '0' + day }
      if (hour.length < 2) { hour = '0' + hour }
      if (min.length < 2) { min = '0' + min }
      if (second.length < 2) { second = '0' + day }

      return [year, month, day].join('-') + ' ' + [hour, min, second].join(':')
    },
    onSubmit() {
      addComment({
        teacher_id: this.$store.getters.token,
        article_id: this.article.id,
        content: this.editContext,
        create_time: this.formatDate()
      }).then(() => {
        this.getDetail()
      })
    }
  }
}
</script>

<style scoped>
  .forum {
    width: 800px;
  }

  .box-card {
    margin-bottom: 30px;
  }

  .editor-container {
    margin-bottom: 30px;
  }
</style>
