export default function(context){
    console.log('[middleware] Check auth');
    context.store.dispatch('initAuth', context.req)
}