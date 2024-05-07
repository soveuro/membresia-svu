import jwt from "jsonwebtoken";

export const isLogged = async (requestEvent)=>{
    const {cookie,redirect,request,cacheControl,env} = requestEvent
    cacheControl({
      public: false,
      maxAge: 0,
      sMaxAge: 0,
      staleWhileRevalidate: 0,
    })
    const token = cookie.get("jwt")
  
    if(!token?.value) throw redirect(302,"/ingresar")
    try{
      const {uid,device} = jwt.verify(token?.value, env.get("SECRETORPRIVATEKEY"))
      
  
      if(device!=request.headers.get("user-agent")) {
        cookie.delete("jwt")
        throw redirect(302,"/ingresar")
      }

      return {ok:true, uid}
  
    }catch(e){
  
  
    }
  }