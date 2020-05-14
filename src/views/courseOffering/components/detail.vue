<template>
  <div v-if="co!==null">
    <img :src="co.course.course_img_url">
    <p>{{ co.course.name }}</p>
    <p>{{ co.course.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['co']
}
</script>

