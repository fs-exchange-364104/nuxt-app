export default function(context){
    console.log('[middleware] Auth')
    console.log(context.store.state.token)
   if(!context.store.state.token){
       context.redirect('/admin/auth')
   }
}