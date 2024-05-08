import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { checkSession } from "~/hooks/useCheckSession";

const useCheckSession = routeLoader$(checkSession)


export default component$(() => {
  useCheckSession().value
  return (
    <>
      <div class="flex sm:flex-row flex-col h-screen w-full">
        <div class="sm:w-1/2 w-full flex flex-col justify-center items-center text-center text-black font-bold text-2xl sm:text-5xl  p-4 h-1/2 sm:h-full bg-[#ffff00]">
          <h1 >Bienvenidos a la</h1>
          <img src="/Logo-Original-M.png" alt="" />
        </div>
        <div class="sm:w-1/2 w-full h-1/2 sm:h-full bg-black flex flex-col justify-center items-center text-center">
          <a class="px-8 py-4 font-bold rounded w-2/3 mb-8 bg-[#ffff00] text-xl" href="/ingresar">
            <span >Ingresar</span>
          </a>
          <a class="px-8 py-4 font-bold rounded w-2/3 bg-[#ffff00] text-xl" href="/inscribir">
            <span >Inscribirme</span>
          </a>
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
