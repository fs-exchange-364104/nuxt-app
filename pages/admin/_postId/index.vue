<template>
    <div class="admin-post-page">
        <section class="update-form">
             <AdminPostForm :post="loadedPosts" @submit="onSubmitted" />
        </section>
    </div>
</template>
<script>
export default {
    layout: 'admin',
    middleware: ['check-auth','auth'],
    asyncData(context){
    return context.app.$axios
    .$get('/posts/' + context.params.postId + '.json')
    .then(data => {
      return {
        loadedPosts: {...data, id: context.params.postId}
      }
    })
    .catch(e => context.error())
  },
    methods: {
        onSubmitted(editedPost) {
          this.$store.dispatch('editPost',editedPost)
          .then(()=>
          this.$router.push('/admin'))
        }
    }
}
</script>
