import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";


export default component$(() => {
  return (
    <>
      <div class="flex sm:flex-row flex-col h-screen w-full">
        <div class="hidden sm:relative sm:w-1/4 w-full sm:flex flex-col justify-between items-center text-center text-black  text-lg sm:text-6xl  p-4 h-1/2 sm:h-full bg-[#ffff00]">
          <div class="sm:absolute top-0 -right-1/3 bg-[#ffff00] px-10 py-2 rounded-full">
            <p class='m-0 text-3xl font-mono'>Ingresar</p>
          </div>
          <div class="sm:h-1/6"></div>
          <img src="/doctor.png" class="h-[200px] sm:h-auto" alt="" />
          <Link href="/">
          <img src="/Logo-Original-M.png" class="sm:w-auto w-[200px]" alt="" />
          </Link>
        </div>
        <div class="sm:w-3/4 sm:px-48 px-8 w-full h-screen sm:h-full bg-black flex flex-col justify-center items-center">
          


        <form class="w-full text-white">
            
          <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_id" id="floating_id" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating_id" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cedula</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
              <input type="password" name="repeat_contraseña" id="floating_repeat_contraseña" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:  dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating_repeat_contraseña" class="peer-focus:font-medium absolute text-sm  dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus :dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
          </div>
            <Link href="/inscribir" class="my-10 block"><p class="text-yellow-200">¿Aún no estas inscrito?</p></Link>
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
