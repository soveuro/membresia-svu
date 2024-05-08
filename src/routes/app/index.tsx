import { component$, useSignal, useStore, useStyles$, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, server$, useNavigate } from "@builder.io/qwik-city";
import style from "./style.css?inline";
import { routeLoader$ } from '@builder.io/qwik-city';
//@ts-ignore
import jwt from "jsonwebtoken";
import { db } from "~/db/config";
import { isLogged } from "~/hooks/isLogged";

const logout = server$(function(){
  //@ts-ignore
  this.cacheControl({
    public: false,
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 0,
  })
  this.cookie.set("jwt","",{
    path:"/",
    secure:true,
    httpOnly:true,
    sameSite:"strict"
  });
  console.log((this as any).cookie, "logout")
})

const useGetCookie = routeLoader$(async function (requestEvent){
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


    const [result1,result2,result3] = await Promise.all([
      db(
        env.get("PRIVATE_TURSO_DB_URL"),
        env.get("PRIVATE_TURSO_DB_AUTH_TOKEN"),
        `SELECT * FROM users WHERE id=${uid};`
      ),
      db(
        env.get("PRIVATE_TURSO_DB_URL"),
        env.get("PRIVATE_TURSO_DB_AUTH_TOKEN"),
        `SELECT * FROM registration_request WHERE id=${uid};`
      ),
      db(
        env.get("PRIVATE_TURSO_DB_URL"),
        env.get("PRIVATE_TURSO_DB_AUTH_TOKEN"),
        `SELECT * FROM payments WHERE client_id=${uid};`
      )
    ])
    
    const user = {...result2.rows[0],...result1.rows[0]}
    
    if(result2.rows.length>0) {
      user.admisionStatus = 0
    }
    
    if(result1.rows.length>0) {
      user.admisionStatus = 1
    } 

    user.payments = result3.rows as any

    return {user,ok:true,message:"session loaded"}


  }catch(error){
    console.log(error)
    cookie.delete("jwt")
    throw redirect(302, "/ingresar")
  }
  

});

const useIsLogged = routeLoader$(isLogged)

export default component$( function () {
  const nav = useNavigate()
  const {uid} = useIsLogged().value

    //@ts-ignore
  const {user,ok,message} = useGetCookie().value as any

  const isBarVisible = useSignal(false)
  useStyles$(style)

  const userPhoto = useSignal("")

  useVisibleTask$(async()=>{
    const photo = await fetch("https://res.cloudinary.com/daydr8ynq/image/upload/h_200,w_200/v1/doctors/"+user.id)
    if(photo.ok) userPhoto.value=photo.url
    else userPhoto.value="/user.svg"
  })


  return (
    <>
      <div class="flex relative sm:flex-row flex-col h-screen w-full">
        <div class={"hidden overflow-auto sm:min-h-screen sm:relative sm:w-1/4 w-full sm:flex flex-col justify-between items-center text-center text-black  text-lg sm:text-2xl  p-4 h-1/2 bg-[#ffff00]"+` ${isBarVisible.value&&"menu"}`}>

          <div class="sm:h-1/6 w-full items-center flex flex-col justify-start flex-auto">
            <div class="rounded-full mb-8 overflow-hidden">
              <img src={userPhoto.value} class="rounded-full h-[200px] w-[200px]" alt="" />
            </div>
            <p class='mb-8'>{user?.first_names} {user?.last_names}</p>
            <buttton onClick$={()=>(window as any).location = "/app/modificar"} class="px-8 cursor-pointer font-bold rounded w-full mb-8 bg-black text-[#ffff00] text-base">Editar datos</buttton>
            <div class="px-8 block cursor-pointer font-bold rounded w-full mb-8 bg-black text-[#ffff00] text-base" >
              <label class="cursor-pointer" htmlFor="foto" >
                Cambiar foto
              </label>
              <input accept=".png,.jpg,.jpeg" onInput$={()=>{}} type="file" id="foto" hidden />
            </div>
            <buttton onClick$={()=>{
              nav("/app/pagar")
            }} class="px-8 cursor-pointer font-bold rounded w-full mb-8 bg-black text-[#ffff00] text-base">Registrar pago</buttton>
            <buttton onClick$={async()=>{
              await logout();
              (window as any).location ="/ingresar"
            }} class="px-8 cursor-pointer font-bold rounded w-full mb-8 bg-black text-[#ffff00] text-base">Cerrar sesión</buttton>
          </div>
          <Link href="/">
            <img src="/Logo-Original-M.png" class="sm:w-auto w-[200px]" alt="" />
          </Link>

        </div>
        <div class="sm:w-3/4 sm:px-8 px-8 w-full py-8 overflow-auto sm:overflow-hidden min-h-screen sm:h-full bg-black flex flex-col sm:flex-row justify-start items-center">
          <div class='sm:w-[calc(50%-16px*2)] mb-8 w-full h-full sm:m-4 bg-[#ffff00]' style={{backdropFilter:"blur(10px)",backgroundColor:"#ffff00"}}>
            <h2 class='m-8 font-mono text-2xl'>Datos</h2>
            <ul class="flex flex-col justify-evenly m-4">
              <li class='sm:mt-[3vh] font-semibold mt-4'>Nombre: {user?.first_names} {user?.last_names}</li>
              <li class='sm:mt-[3vh] font-semibold mt-4'>Estado de registro: {user?.admisionStatus?<span class="text-green-600">verificado</span>:<span class="text-yellow-600">por comprobar</span>}</li>
              <li class='sm:mt-[3vh] font-semibold mt-4'>Sexo: {user.value?.sex?.toLowerCase() ==="m"? "Masculino" :user.value?.sex?.toLowerCase() ==="f"?"Femenino":"no especifica" }</li>
              <li class='sm:mt-[3vh] font-semibold mt-4'>Cedula: {user?.id}</li>
              <li class='sm:mt-[3vh] font-semibold mt-4'>Nacionalidad: {user?.nationality?.toLowerCase()=="v"?"Venezolano":"Extranjero"}</li>
              <li class='sm:mt-[3vh] font-semibold mt-4'>Fecha de nacimiento: {user?.birthday}</li>
              <li class='sm:mt-[3vh] font-semibold mt-4'>Direccion: {user?.address}</li>
              <li class='sm:mt-[3vh] font-semibold mt-4'>Telefono: 0{user?.phone}</li>
              <li class='sm:mt-[3vh] font-semibold mt-4'>Correo: {user?.email}</li>
              <li class='sm:mt-[3vh] font-semibold mt-4'>Cedula: {user?.id}</li>
              <li class='sm:mt-[3vh] font-semibold mt-4'>Relación: {user?.relationship}</li>
            </ul>
          </div>
          <div class='sm:w-[calc(50%-16px*2)] sm:overflow-auto mb-8 w-full sm:h-full sm:m-4 bg-[#ffff00]' style={{backdropFilter:"blur(10px)",backgroundColor:"#ffff00"}}>
            <h2 class='m-8 font-mono text-2xl'>Pagos registrados</h2>
            
            {user?.payments.length>0 
            
            ? user?.payments.map((payment:any,index:number)=>{
              return (
                <div class='m-4'>
                  <ul class="rounded-2xl px-3 py-3 bg-white">
                    <li class='my-4'>Codigo de referencia: {payment?.reference}</li>
                    <li class='my-4'>Fecha: {payment?.date}</li>
                    <li class='my-4'>Monto: ${payment?.amount}</li>
                    <li class='my-4'>Producto: {payment?.product}</li>
                    <li class='my-4'>Estado: {payment?.verified
                    ?<span class="text-green-600">verificado</span>
                    :<span class="text-yellow-600">por comprobar</span>}</li>
                  </ul>
                </div>
              )
            }) 
            
            :<div class='m-4'>
              <p class="rounded-2xl px-3 py-10 bg-white">Usted no tiene pagos registrados.</p>
            </div> }

            
          </div>
        </div>

      </div>
      <div class="menu_btn absolute z-[999] bottom-10 left-4">
          <img src="/menu.svg" class="w-12 h-12 cursor-pointer" onClick$={()=>isBarVisible.value=!isBarVisible.value} alt="" />
        </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
