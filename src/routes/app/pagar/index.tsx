import { component$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";

const datos = {
  id: "",
  nacionality: "",
  first_name: "",
  last_name: "",
  monto:"",
  birthdate:"",
  email:"",
  phone:"",
}

export default component$(() => {
  const nav = useNavigate()

    return (
      <>
        <form class=" min-w-full bg-black min-h-screen px-10 py-8 text-white">
      
          <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_reference" id="floating_reference" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating_reference" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Referencia</label>
          </div>
          
          <div class="relative z-0 w-full mb-5 group">
              <input type="number" name="monto" id="monto" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="monto" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Monto</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
              <input type="date" name="date" id="date" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="date" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha</label>
          </div>
          <div class='flex text-black flex-col flex-auto relative'>
              <label for="nacionalidad" class="text-white mb-3">Producto</label>
              <select id="nacionalidad" required class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700  dark:border-gray-600  dark:placeholder-gray-400  dark:  dark:focus:ring-blue-500 dark:focus:border-blue-500">

                <option value={'curso'}>Curso</option>
                <option value={'anualidad'}>Anualidad</option>
              </select>
            </div>
          

          <button onClick$={()=>nav("/app")} class="mt-8 sm:mr-8 bg-white text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Regresar</button>
          <button type="submit" class="mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:bg-blue-600  dark:hover:bg-blue-700  dark:focus:ring-blue-800">Guardar</button>

        </form>
      </>
    );
  });
  

