import Vuex from 'vuex'
import Cookie from 'js-cookie';
import axios from 'axios';
const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts:[],
            token: null
        },
        mutations:{
            setPosts(state,posts){
                state.loadedPosts = posts;
            },
            addPost(state,post){
                state.loadedPosts.push(post)
            },
            editPost(state,editedPost){
                const postIndex = state.loadedPosts.findIndex(post=>{
                    return post.id === editedPost.id
                })
                state.loadedPosts[postIndex] = editedPost;
            },
            setToken(state,token){
                state.token = token
            },
            clearToken(state){
                state.token = null;
            }
        },
        actions:{
            nuxtServerInit(vuexContext, context){
                return context.app.$axios
                .$get('/posts.json')
                .then(data => {
                    const postArray = [];
                    for(const key in data) {
                        postArray.push({...data[key], id:key});
                        console.log(data)
                    }
                    vuexContext.commit('setPosts', postArray)
                })
                .catch(e => console.log(e))
            },
            setPosts(vuexContext,posts){
                vuexContext.commit('setPosts', posts)
            },
            addPost(vuexContext,post){
                const createdPost = {
                    ...post,
                    updatedPost: new Date()
                };
                return this.$axios
                .$post('/posts.json?auth=' + vuexContext.state.token, createdPost)
                .then(data => 
                    vuexContext.commit('addPost',{...createdPost, id:data.name}))
                .catch(error => console.log(error))
            },
            editPost(vuexContext,editedPost){
                return this.$axios
                .$put('/posts/' 
                + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
                .then(res => vuexContext.commit('editPost', editedPost))
                .catch(e=> console.log(e))
            },
            async authenticateUser(vuexContext,authData){
                if(!authData.isLogin){
                    await this.$fire.auth.createUserWithEmailAndPassword(authData.email, authData.password)
                    .then((userCredential) => {
                    const response = userCredential.user.auth.currentUser;
                    vuexContext.commit('setToken',response.accessToken); 
                    localStorage.setItem('token',response.accessToken);
                    localStorage.setItem('tokenExpiration',new Date().getTime() 
                    + response.stsTokenManager.expirationTime );
                    Cookie.set('jwt',response.accessToken);
                    Cookie.set('expirationDate',new Date().getTime() + Number.parseInt(response.stsTokenManager.expirationTime)*1000);
                  })
                  .catch((error) => {console.log(error)});
                    }else{
                    await this.$fire.auth.signInWithEmailAndPassword(authData.email, authData.password)
                    .then((userCredential) => {
                    const response = userCredential.user.auth.currentUser;
                    vuexContext.commit('setToken',response.accessToken);
                    localStorage.setItem('token',response.accessToken);
                    localStorage.setItem('tokenExpiration',new Date().getTime() 
                    + response.stsTokenManager.expirationTime );
                    Cookie.set('jwt',response.accessToken);
                    Cookie.set('expirationDate',new Date().getTime() + Number.parseInt(response.stsTokenManager.expirationTime)*1000);
                    return this.$axios.post('http://localhost:3000/api/track-data',{data: 'auth success'})
                  })
                  .catch((error) => {console.log(error)});
                }
            },
            setLogOutTimer(vuexContext,duration){
                setTimeout(()=>{
                    vuexContext.commit('clearToken')
                }, duration)
            },
            initAuth(vuexContext,req){
                let token;
                let expirationDate;
                console.log(req)
                if(req){
                    if(!req.headers.cookie){
                        return
                    }
                const jwtCookie = req.headers.cookie
                .split(';')
                .find(c => c.trim().startsWith('jwt='));
                if(!jwtCookie){
                    return
                }
                token = jwtCookie.split('=')[1];
                expirationDate = req.headers.cookie
                .split(';')
                .find(c => c.trim().startsWith('expirationDate='))
                .split('=')[1];
                console.log(token,expirationDate)
                }else{
                token = localStorage.getItem('token');
                expirationDate = localStorage.getItem('tokenExpiration');
                }
                if(new Date().getTime() > +expirationDate || !token){
                    console.log('No token or invalid token');
                    vuexContext.commit('clearToken');
                    return
                }
                vuexContext.commit('setToken', token);
            },
            logout(vuexContext){
                vuexContext.commit('clearToken');
                Cookie.remove('token');
                Cookie.remove('expirationDate');
                if(process.client){
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration')
                }
            }
        },
        getters:{
            loadedPosts(state) {
                return state.loadedPosts;
            },
            isAuthenticated(state){
                return state.token != null
            }
        }
    })
}

export default createStore