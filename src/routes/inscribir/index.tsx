import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, server$, useNavigate } from "@builder.io/qwik-city";
import { db } from "~/db/config";
import { formToObj } from "~/helpers/formToObj";
import { objToInsertSql } from "~/helpers/objToInsertSql";
import { genSaltSync, hashSync } from "bcrypt";
import generateJWT from "~/helpers/generateJwt";
import { compactObject } from "@fxts/core";
import { checkSession } from "~/hooks/useCheckSession";
import ImgLogoL from "~/media/Logo-Original-M.png?jsx"
import ImgDoctor from '~/media/doctor.png?jsx';


export const useCheckSession = routeLoader$(checkSession)

const register = server$(async function (data: any) {
  this.cacheControl({
    public: false,
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 0,
  })
  const userData = compactObject(data) as any
  const emptyFields = Object.keys(userData).filter(key => key != "nationality" && userData[key].length < 2)
  if (userData.password != userData.repeat_password) return { ok: false, message: "passwords dont match" }
  if (emptyFields.length > 0) return { ok: false, message: "empty fields", data: emptyFields }
  delete userData.repeat_password;


  userData.first_names = userData.first_names.split(" ").map((e: any) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(" ")
  userData.last_names = userData.last_names.split(" ").map((e: any) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(" ")
  try {
    const salt = genSaltSync();

    userData.password = hashSync(String(userData.password), salt);

    const jwt = generateJWT(userData.id, this.request.headers.get("user-agent"), this.env.get("SECRETORPRIVATEKEY"))
    const userExists = await db(
      this.env.get("PRIVATE_TURSO_DB_URL"),
      this.env.get("PRIVATE_TURSO_DB_AUTH_TOKEN"),
      `SELECT * FROM users WHERE ID='${userData.id}'`
    )
    if(userExists)  
      return { ok: false, message: "already registered" };

    const result = await db(
      this.env.get("PRIVATE_TURSO_DB_URL"),
      this.env.get("PRIVATE_TURSO_DB_AUTH_TOKEN"),
      objToInsertSql("registration_request", userData)
    )

    this.cookie.set("jwt", jwt, {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "strict"
    });
    return { ok: true, jwt };
  } catch (e) {
    const repeatedField = (e as Error).message.split("registration_request.")[1]
    console.log(e + "")
    return { ok: false, message: "repeated field", data: repeatedField };
  }

});



export default component$(() => {

  const error = useSignal(false)
  const nav = useNavigate()
  useCheckSession()
  const errorMessage = useSignal(
    <div>
      <b>Datos incompletos</b>, por favor ingrese todos los datos solicidatos.
    </div>
  )

  const onRegister = $(async (e: any) => {
    e.preventDefault()
    document.querySelectorAll("label").forEach(e => e.classList.remove("text-red-500"))
    const inputs = formToObj(e.target)
    const result = await register(inputs)

    if (result.ok) {
      console.log(result.jwt)
      return nav("/app")
    }
    if (result.message == "repeated field") {
      const element = document.querySelector("[for=" + (result as any).data + "]")
      element!.classList.add("text-red-500")
      error.value = true;
      errorMessage.value = (
        <div>
          <b>El siguiente campo ya se encuentra registrado:</b> {element?.innerHTML}.
        </div>
      )
    }

    if (result.message == "passwords dont match") {
      const element = document.querySelector("[for=repeat_password]")
      element!.classList.add("text-red-500")
      error.value = true;
      errorMessage.value = (
        <div>
          <b>Las contraseñas no coinciden</b>.
        </div>
      )
    }

    if(result.message=="already registered"){
      error.value = true;
      errorMessage.value = (
        <div>
          <b>El usuario ya se encuentra registrado</b>.
        </div>
      )
    }


  })

  return (
    <>
      <div class="flex sm:overflow-hidden relative overflow-auto sm:flex-row flex-col h-screen w-full">
        {error.value &&
          <div class="p-4 flex items-center right-4 justify-between top-4 absolute z-50 w-5/6 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errorMessage.value}
            <div onClick$={() => { error.value = false }} class="w-8 cursor-pointer sm:h-4 font-bold text-xl flex justify-center items-center">
              <span>
                X
              </span>
            </div>
          </div>
        }
        <div class="hidden sm:relative sm:w-1/4 w-full sm:flex flex-col justify-between items-center text-center text-black  text-lg sm:text-6xl  p-4 h-1/2 sm:h-full bg-[#ffff00]">
          <div class="sm:absolute top-0 -right-1/3 bg-[#ffff00] px-10 py-2 rounded-full">
            <p class='m-0 text-3xl font-mono'>Inscribirme</p>
          </div>
          <div class="sm:h-1/6"></div>
            <ImgDoctor/>
            <a href="/">

              <ImgLogoL class="sm:w-auto w-[200px]" alt="" />
            </a>

        </div>
        <div class="sm:w-3/4 overflow-auto px-8 w-full min-h-[100%] sm:h-full bg-black flex flex-col justify-start sm:py-0 py-8 sm:justify-center items-center text-center">



          <form preventdefault:submit onSubmit$={onRegister} class="min-w-full mt-8 mb-4 sm:overflow-auto sm:overflow-x-hidden text-white">
            <div class='flex justify-between'>


              <div class="flex-auto mr-8">
                <div class="h-6"></div>
                <div class="relative z-0  w-full mb-5 group">
                  <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="id" id="id" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  peer" placeholder=" " required />
                  <label for="id" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cedula</label>
                </div>

              </div>
              <div class='flex text-black flex-col flex-auto relative'>
                <label for="nationality" class="text-white mb-3">Nacionalidad</label>
                <select id="nationality" required class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700  dark:border-gray-600  dark:placeholder-gray-400  dark:  dark:focus:ring-blue-500 dark:focus:border-blue-500">

                  <option value={'V'}>Venezolano</option>
                  <option value={'E'}>Extranjero</option>
                </select>
              </div>
            </div>



            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="first_names" id="first_names" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="first_names" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombres</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="last_names" id="last_names" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="last_names" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellidos</label>
              </div>
            </div>
            <div class='flex text-black mb-5 flex-col flex-auto relative'>
              <label for="relationship" class="text-white mb-3">Tipo de registro</label>
              <select id="relationship" required class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700  dark:border-gray-600  dark:placeholder-gray-400  dark:  dark:focus:ring-blue-500 dark:focus:border-blue-500">

                <option value={'Miembro titular'}>Miembro titular</option>
                <option value={'Miembro asociado'}>Miembro asociado</option>
                <option value={'No Miembro'}>No Miembro</option>
                <option value={'Residente'}>Residente</option>
                <option value={'Estudiante/Enfermero(a)'}>Estudiante/Enfermera(o)</option>
              </select>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                <input type="tel" name="phone" id="phone" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="phone" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Numero de telefono</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="email" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo</label>
              </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="address" id="address" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="address" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Direción de residencia</label>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="undergraduate_university" id="undergraduate_university" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="undergraduate_university" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 translate-x-[-10rem] scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:translate-x-0 w-full">Universidad de pregrado</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="egress" id="egress" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="egress" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 translate-x-[-10rem]  top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 w-full peer-focus:translate-x-0 peer-focus:-translate-y-6">Hospital de egreso como especialista</label>
              </div>
            </div>
            <div class='flex text-black mb-5 flex-col flex-auto relative'>
              <label for="speciality" class="text-white mb-3">Especialidad</label>
              <select id="speciality" required class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700  dark:border-gray-600  dark:placeholder-gray-400  dark:  dark:focus:ring-blue-500 dark:focus:border-blue-500">

                <option value={'Urologo'}>Urólogo</option>
                <option value={'Ginecologo'}>Ginecólogo</option>
                <option value={null}>Enfermera(o)</option>
              </select>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="working_address" id="working_address" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="working_address" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 w-full peer-focus:translate-x-0 translate-x-[-9rem] peer-focus:-translate-y-6">Dirección de hospital de trabajo</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input type="date" name="birthday" id="birthday" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="birthday" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha de nacimiento</label>
            </div>

            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                <input type="password" name="password" id="password" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="password" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input type="password" name="repeat_password" id="repeat_password" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="repeat_password" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmar password</label>
              </div>
            </div>
            <div class='my-5'>

              <a href="/ingresar" class=" inline-block"><p class="text-yellow-200">¿Ya estas inscrito?</p></a>
            </div>

            <button type="submit" class=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:bg-blue-600  dark:hover:bg-blue-700  dark:focus:ring-blue-800">Registrar</button>

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
