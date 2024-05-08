import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {routeLoader$, server$, useNavigate } from "@builder.io/qwik-city";
import { compareSync } from "bcrypt";
import { db } from "~/db/config";
import { formToObj } from "~/helpers/formToObj";
import generateJWT from "~/helpers/generateJwt";
import {checkSession}  from "~/hooks/checkSession";
import ImgLogoL from "~/media/Logo-Original-M.png?jsx"
import ImgDoctor from '~/media/doctor.png?jsx';

const login = server$(async function({id,password}){
  //@ts-ignore
  this.cacheControl({
    public: false,
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 0,
  })
  const [result1,result2] = await Promise.all([
    db(
      this.env.get("PRIVATE_TURSO_DB_URL"),
      this.env.get("PRIVATE_TURSO_DB_AUTH_TOKEN"),
      `SELECT * FROM users WHERE id=${id};`
    ),
    db(
      this.env.get("PRIVATE_TURSO_DB_URL"),
      this.env.get("PRIVATE_TURSO_DB_AUTH_TOKEN"),
      `SELECT * FROM registration_request WHERE id=${id};`
    ),
  ])

  const user = {...result2.rows[0],...result1.rows[0]} as any;
  if(user.password===null) user.password=user.id
  
  const isValidPassword = compareSync(String(password),String(user.password))
  if(isValidPassword || (user.password===user.id && password===id)) {
    try{
      const jwt = generateJWT(id,this.request.headers.get("user-agent"),this.env.get("SECRETORPRIVATEKEY"))

      this.cookie.set("jwt",jwt,{
        path:"/",
        secure:true,
        httpOnly:true,
        sameSite:"strict"
      });
  
      return {ok:true,jwt};
    }catch(e){
      return {ok:false}
    }
    

  }

  return {ok:false, message:"invalid password"}
});
const useCheckSession = routeLoader$(checkSession);

export default component$(function (){
  console.log('/index');
  useCheckSession().value;

  const error = useSignal<boolean>(false)
  
  const onLogin = $(async (e:Event)=>{
    e.preventDefault()
    const data = formToObj(e.target)
    const result = await login(data)
    error.value= !result.ok
    if(result.ok) {
      console.log(result.jwt);
      (window as any).location = "/app/user"
    }

  })
  return (
    <>
      <div class="flex sm:flex-row flex-col h-screen w-full">
        {error.value && 
          <div class="p-4 flex items-center right-4 justify-between top-4 absolute z-50 w-5/6 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <div>
              <b>Los credenciales no coinciden</b>.
            </div>
            <div onClick$={()=>{error.value=false}} class="w-8 cursor-pointer sm:h-4 font-bold text-xl flex justify-center items-center">
              <span>
              X
              </span>
            </div>
          </div>
        }
        <div class="hidden sm:relative sm:w-1/4 w-full sm:flex flex-col justify-between items-center text-center text-black  text-lg sm:text-6xl  p-4 h-1/2 sm:h-full bg-[#ffff00]">
          <div class="sm:absolute top-0 -right-1/3 bg-[#ffff00] px-10 py-2 rounded-full">
            <p class='m-0 text-3xl font-mono'>Ingresar</p>
          </div>
          <div class="sm:h-1/6"></div>
          <ImgDoctor/>

          <a href="/">
          <ImgLogoL class="sm:w-auto w-[200px]" alt="" />
          </a>
        </div>
        <div class="sm:w-3/4 sm:px-48 px-8 w-full h-screen sm:h-full bg-black flex flex-col justify-center items-center">
          


        <form preventdefault:submit onSubmit$={onLogin} class="w-full text-white">
            
          <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="id" id="id" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="id" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cedula</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
              <input type="password" name="repeat_contraseña" id="password" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="password" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
          </div>
            <a href="/inscribir" class="my-10 block"><p class="text-yellow-200">¿Aún no estas inscrito?</p></a>
          <button type="submit" class=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:bg-blue-600  dark:hover:bg-blue-700  dark:focus:ring-blue-800">Ingresar</button>
        </form>



        </div>
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
