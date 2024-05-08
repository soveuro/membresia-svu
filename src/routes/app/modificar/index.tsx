import { component$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import jwt from "jsonwebtoken";
import { isLogged } from "~/hooks/isLogged";

const datos = {
  id: "",
  nacionality: "",
  first_name: "",
  last_name: "",
  egress:"",
  birthday:"",
  email:"",
  phone:"",
}

const useIsLogged = routeLoader$(isLogged)
export default component$(() => {
  const nav = useNavigate()
  
  useIsLogged().value
    return (
      <>
        <form preventdefault:submit class="min-w-full bg-black min-h-screen px-10 py-8 text-white">
          <div class='flex justify-between'>

            
            <div class="flex-auto mr-8">
              <div class="h-6"></div>
              <div class="relative z-0  w-full mb-5 group">
                  <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_id" id="floating_id" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  peer" placeholder=" " />
                  <label for="floating_id" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cedula</label>
              </div>
              
            </div>
            <div class='flex text-black flex-col flex-auto relative'>
              <label for="nacionalidad" class="text-white mb-3">Nacionalidad</label>
              <select id="nacionalidad" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700  dark:border-gray-600  dark:placeholder-gray-400  dark:  dark:focus:ring-blue-500 dark:focus:border-blue-500">

                <option value={'V'}>Venezolano</option>
                <option value={'E'}>Extranjero</option>
              </select>
            </div>
          </div>
          
          
          <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_address" id="floating_address" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="floating_address" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Direción de residencia</label>
          </div>
          
          <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="egress" id="egress" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="egress" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Universidad de egreso</label>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombres</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellidos</label>
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="floating_phone" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Numero de telefono</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="email" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="floating_company" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo</label>
            </div>
          </div>
          <div class="relative z-0 w-full mb-5 group">
              <input type="date" name="birthd" id="birthd" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="birthd" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cumpleaños</label>
          </div>

            <button onClick$={()=> (window as any).location = "/app"} class=" bg-white sm:mr-8 text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Regresar</button>

          <button type="submit" class="mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:bg-blue-600  dark:hover:bg-blue-700  dark:focus:ring-blue-800">Guardar</button>

        </form>
      </>
    );
  });
  

