<template>
    <div class="post-page">
         <PostList :posts="loadedPosts"/>
    </div>
</template>
<script>
export default {

    computed: {
        loadedPosts(){
            return this.$store.getters.loadedPosts
        }
    }
}
</script>

<style scoped>
.post-page{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>