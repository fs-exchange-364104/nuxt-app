<template>
    <section class="post-list">
           <PostPreview
           v-for="post in posts"
           :key="post.id"
           :id="post.id"
           :is-admin="isAdmin"
           :title="post.title"
           :previewText="post.previewText"
           :thumbnail="post.thumbnail"
           :posts='posts'
           />
        </section>
</template>


<script>
import PostPreview from '@/components/Posts/PostPreview'
export default {
    name: 'PostList',
    components:{
        PostPreview
    },
    props: {
        isAdmin: {
            type: Boolean,
            required: false
        },
        posts: {
            type:Array,
            required: true
        }
    }
}
</script>

<style scoped>
.post-list{
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
</style>