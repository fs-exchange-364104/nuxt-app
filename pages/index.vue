<template>
    <div class="home-page">
        <section class="intro">
            <h1>Get the latest tech news</h1>
        </section>
        <PostList :posts='loadedPosts'/>
    </div>
</template>

<script>
export default {
    middleware:'log',
    computed: {
        loadedPosts(){
            return this.$store.getters.loadedPosts
        }
    }
}
</script>

<style scoped>
.intro{
    height: 300px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-size: cover;
    background-position: center;
    background-image: url('assets/images/main-page-background.jpg');
}
.intro h1{
    position: absolute;
    top:10%;
    left: 5%;
    width: 90%;
    font-size: 1.5rem;
    color: black;
    background-color: antiquewhite;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px black;
    border: 1px solid black
}
@media (min-width:768px) {
    .intro h1{
        font-size: 2rem;
    }
}

</style>