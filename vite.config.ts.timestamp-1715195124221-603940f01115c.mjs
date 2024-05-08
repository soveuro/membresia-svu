// vite.config.ts
import { defineConfig } from "file:///home/mint/Desktop/membresia-svu/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///home/mint/Desktop/membresia-svu/node_modules/@builder.io/qwik/optimizer.mjs";
import { qwikCity } from "file:///home/mint/Desktop/membresia-svu/node_modules/@builder.io/qwik-city/vite/index.mjs";
import tsconfigPaths from "file:///home/mint/Desktop/membresia-svu/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "my-qwik-basic-starter",
  description: "Demo App with Routing built-in (recommended)",
  engines: {
    node: "^18.17.0 || ^20.3.0 || >=21.0.0"
  },
  "engines-annotation": "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  trustedDependencies: [
    "sharp"
  ],
  "trustedDependencies-annotation": "Needed for bun to allow running install scripts",
  type: "module",
  scripts: {
    build: "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.server": "vite build -c adapters/deno/vite.config.ts",
    "build.types": "tsc --incremental --noEmit",
    deploy: `echo 'Run "npm run qwik add" to install a server adapter'`,
    dev: "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lint: "",
    preview: "qwik build preview && vite preview --open",
    serve: "deno run --allow-net --allow-read --allow-env server/entry.deno.js",
    start: "vite --open --mode ssr",
    qwik: "qwik"
  },
  devDependencies: {
    "@builder.io/qwik": "^1.5.1",
    "@builder.io/qwik-city": "^1.5.1",
    "@types/bcrypt": "^5.0.2",
    "@types/eslint": "^8.56.5",
    "@types/node": "^20.11.24",
    "@typescript-eslint/eslint-plugin": "^7.1.0",
    "@typescript-eslint/parser": "^7.1.0",
    autoprefixer: "^10.4.14",
    eslint: "^8.57.0",
    "eslint-plugin-qwik": "^1.5.1",
    postcss: "^8.4.31",
    prettier: "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.4",
    tailwindcss: "3.3.3",
    typescript: "5.3.3",
    undici: "*",
    vite: "^5.1.4",
    "vite-tsconfig-paths": "^4.2.1"
  },
  dependencies: {
    "@fxts/core": "^0.28.1",
    "@libsql/client": "^0.5.6",
    bcrypt: "^5.1.1",
    jsonwebtoken: "^9.0.2"
  }
};

// vite.config.ts
var { dependencies = {}, devDependencies = {} } = package_default;
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: []
    },
    // This tells Vite how to bundle the server code.
    ssr: command === "build" && mode === "production" ? {
      // All dev dependencies should be bundled in the server build
      noExternal: Object.keys(devDependencies),
      // Anything marked as a dependency will not be bundled
      // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
      // If a dep-of-dep needs to be external, add it here
      // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
      // external: [...Object.keys(dependencies), 'bcrypt']
      external: Object.keys(dependencies)
    } : void 0,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "no-cache"
      }
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "no-cache"
      }
    },
    //@ts-ignore
    deno: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "no-cache"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWludC9EZXNrdG9wL21lbWJyZXNpYS1zdnVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL21pbnQvRGVza3RvcC9tZW1icmVzaWEtc3Z1L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21pbnQvRGVza3RvcC9tZW1icmVzaWEtc3Z1L3ZpdGUuY29uZmlnLnRzXCI7LyoqXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNvbmZpZyBmb3Igdml0ZS5cbiAqIFdoZW4gYnVpbGRpbmcsIHRoZSBhZGFwdGVyIGNvbmZpZyBpcyB1c2VkIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBhbmQgZXh0ZW5kcyBpdC5cbiAqL1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCB0eXBlIFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgcXdpa1ZpdGUgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay9vcHRpbWl6ZXJcIjtcbmltcG9ydCB7IHF3aWtDaXR5IH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWstY2l0eS92aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcblxuY29uc3QgeyBkZXBlbmRlbmNpZXMgPSB7fSwgZGV2RGVwZW5kZW5jaWVzID0ge30gfSA9IHBrZyBhcyBhbnkgYXMge1xuICBkZXBlbmRlbmNpZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGRldkRlcGVuZGVuY2llczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbn07XG5cbi8qKlxuICogTm90ZSB0aGF0IFZpdGUgbm9ybWFsbHkgc3RhcnRzIGZyb20gYGluZGV4Lmh0bWxgIGJ1dCB0aGUgcXdpa0NpdHkgcGx1Z2luIG1ha2VzIHN0YXJ0IGF0IGBzcmMvZW50cnkuc3NyLnRzeGAgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSk6IFVzZXJDb25maWcgPT4ge1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtxd2lrQ2l0eSgpLCBxd2lrVml0ZSgpLCB0c2NvbmZpZ1BhdGhzKCldLFxuICAgIC8vIFRoaXMgdGVsbHMgVml0ZSB3aGljaCBkZXBlbmRlbmNpZXMgdG8gcHJlLWJ1aWxkIGluIGRldiBtb2RlLlxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgLy8gUHV0IHByb2JsZW1hdGljIGRlcHMgdGhhdCBicmVhayBidW5kbGluZyBoZXJlLCBtb3N0bHkgdGhvc2Ugd2l0aCBiaW5hcmllcy5cbiAgICAgIC8vIEZvciBleGFtcGxlIFsnYmV0dGVyLXNxbGl0ZTMnXSBpZiB5b3UgdXNlIHRoYXQgaW4gc2VydmVyIGZ1bmN0aW9ucy5cbiAgICAgIGV4Y2x1ZGU6IFtdLFxuICAgIH0sXG4gICAgLy8gVGhpcyB0ZWxscyBWaXRlIGhvdyB0byBidW5kbGUgdGhlIHNlcnZlciBjb2RlLlxuICAgIHNzcjpcbiAgICAgIGNvbW1hbmQgPT09IFwiYnVpbGRcIiAmJiBtb2RlID09PSBcInByb2R1Y3Rpb25cIlxuICAgICAgICA/IHtcbiAgICAgICAgICAgIC8vIEFsbCBkZXYgZGVwZW5kZW5jaWVzIHNob3VsZCBiZSBidW5kbGVkIGluIHRoZSBzZXJ2ZXIgYnVpbGRcbiAgICAgICAgICAgIG5vRXh0ZXJuYWw6IE9iamVjdC5rZXlzKGRldkRlcGVuZGVuY2llcyksXG4gICAgICAgICAgICAvLyBBbnl0aGluZyBtYXJrZWQgYXMgYSBkZXBlbmRlbmN5IHdpbGwgbm90IGJlIGJ1bmRsZWRcbiAgICAgICAgICAgIC8vIFRoZXNlIHNob3VsZCBvbmx5IGJlIHByb2R1Y3Rpb24gYmluYXJ5IGRlcHMgKGluY2x1ZGluZyBkZXBzIG9mIGRlcHMpLCBDTEkgZGVwcywgYW5kIHRoZWlyIG1vZHVsZSBncmFwaFxuICAgICAgICAgICAgLy8gSWYgYSBkZXAtb2YtZGVwIG5lZWRzIHRvIGJlIGV4dGVybmFsLCBhZGQgaXQgaGVyZVxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGUsIGlmIHNvbWV0aGluZyB1c2VzIGBiY3J5cHRgIGJ1dCB5b3UgZG9uJ3QgaGF2ZSBpdCBhcyBhIGRlcCwgeW91IGNhbiB3cml0ZVxuICAgICAgICAgICAgLy8gZXh0ZXJuYWw6IFsuLi5PYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLCAnYmNyeXB0J11cbiAgICAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgc2VydmVyOiB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC8vIERvbid0IGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gZGV2IG1vZGVcbiAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwibm8tY2FjaGVcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwcmV2aWV3OiB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC8vIERvIGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gcHJldmlldyAobm9uLWFkYXB0ZXIgcHJvZHVjdGlvbiBidWlsZClcbiAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwibm8tY2FjaGVcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBkZW5vOntcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLy8gRG8gY2FjaGUgdGhlIHNlcnZlciByZXNwb25zZSBpbiBwcmV2aWV3IChub24tYWRhcHRlciBwcm9kdWN0aW9uIGJ1aWxkKVxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJuby1jYWNoZVwiLFxuICAgICAgfSxcbiAgICB9XG4gIH07XG59KTtcbiIsICJ7XG4gIFwibmFtZVwiOiBcIm15LXF3aWstYmFzaWMtc3RhcnRlclwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiRGVtbyBBcHAgd2l0aCBSb3V0aW5nIGJ1aWx0LWluIChyZWNvbW1lbmRlZClcIixcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCJeMTguMTcuMCB8fCBeMjAuMy4wIHx8ID49MjEuMC4wXCJcbiAgfSxcbiAgXCJlbmdpbmVzLWFubm90YXRpb25cIjogXCJNb3N0bHkgcmVxdWlyZWQgYnkgc2hhcnAgd2hpY2ggbmVlZHMgYSBOb2RlLUFQSSB2OSBjb21wYXRpYmxlIHJ1bnRpbWVcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llc1wiOiBbXG4gICAgXCJzaGFycFwiXG4gIF0sXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llcy1hbm5vdGF0aW9uXCI6IFwiTmVlZGVkIGZvciBidW4gdG8gYWxsb3cgcnVubmluZyBpbnN0YWxsIHNjcmlwdHNcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInF3aWsgYnVpbGRcIixcbiAgICBcImJ1aWxkLmNsaWVudFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImJ1aWxkLnByZXZpZXdcIjogXCJ2aXRlIGJ1aWxkIC0tc3NyIHNyYy9lbnRyeS5wcmV2aWV3LnRzeFwiLFxuICAgIFwiYnVpbGQuc2VydmVyXCI6IFwidml0ZSBidWlsZCAtYyBhZGFwdGVycy9kZW5vL3ZpdGUuY29uZmlnLnRzXCIsXG4gICAgXCJidWlsZC50eXBlc1wiOiBcInRzYyAtLWluY3JlbWVudGFsIC0tbm9FbWl0XCIsXG4gICAgXCJkZXBsb3lcIjogXCJlY2hvICdSdW4gXFxcIm5wbSBydW4gcXdpayBhZGRcXFwiIHRvIGluc3RhbGwgYSBzZXJ2ZXIgYWRhcHRlcidcIixcbiAgICBcImRldlwiOiBcInZpdGUgLS1tb2RlIHNzclwiLFxuICAgIFwiZGV2LmRlYnVnXCI6IFwibm9kZSAtLWluc3BlY3QtYnJrIC4vbm9kZV9tb2R1bGVzL3ZpdGUvYmluL3ZpdGUuanMgLS1tb2RlIHNzciAtLWZvcmNlXCIsXG4gICAgXCJmbXRcIjogXCJwcmV0dGllciAtLXdyaXRlIC5cIixcbiAgICBcImZtdC5jaGVja1wiOiBcInByZXR0aWVyIC0tY2hlY2sgLlwiLFxuICAgIFwibGludFwiOiBcIlwiLFxuICAgIFwicHJldmlld1wiOiBcInF3aWsgYnVpbGQgcHJldmlldyAmJiB2aXRlIHByZXZpZXcgLS1vcGVuXCIsXG4gICAgXCJzZXJ2ZVwiOiBcImRlbm8gcnVuIC0tYWxsb3ctbmV0IC0tYWxsb3ctcmVhZCAtLWFsbG93LWVudiBzZXJ2ZXIvZW50cnkuZGVuby5qc1wiLFxuICAgIFwic3RhcnRcIjogXCJ2aXRlIC0tb3BlbiAtLW1vZGUgc3NyXCIsXG4gICAgXCJxd2lrXCI6IFwicXdpa1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBidWlsZGVyLmlvL3F3aWtcIjogXCJeMS41LjFcIixcbiAgICBcIkBidWlsZGVyLmlvL3F3aWstY2l0eVwiOiBcIl4xLjUuMVwiLFxuICAgIFwiQHR5cGVzL2JjcnlwdFwiOiBcIl41LjAuMlwiLFxuICAgIFwiQHR5cGVzL2VzbGludFwiOiBcIl44LjU2LjVcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjExLjI0XCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjEuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl43LjEuMFwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTRcIixcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcXdpa1wiOiBcIl4xLjUuMVwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzFcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMi41XCIsXG4gICAgXCJwcmV0dGllci1wbHVnaW4tdGFpbHdpbmRjc3NcIjogXCJeMC41LjRcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiMy4zLjNcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCI1LjMuM1wiLFxuICAgIFwidW5kaWNpXCI6IFwiKlwiLFxuICAgIFwidml0ZVwiOiBcIl41LjEuNFwiLFxuICAgIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiOiBcIl40LjIuMVwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBmeHRzL2NvcmVcIjogXCJeMC4yOC4xXCIsXG4gICAgXCJAbGlic3FsL2NsaWVudFwiOiBcIl4wLjUuNlwiLFxuICAgIFwiYmNyeXB0XCI6IFwiXjUuMS4xXCIsXG4gICAgXCJqc29ud2VidG9rZW5cIjogXCJeOS4wLjJcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBSUEsU0FBUyxvQkFBcUM7QUFDOUMsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxnQkFBZ0I7QUFDekIsT0FBTyxtQkFBbUI7OztBQ1AxQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLElBQ1QsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLHNCQUFzQjtBQUFBLEVBQ3RCLFNBQVc7QUFBQSxFQUNYLHFCQUF1QjtBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUFBLEVBQ0Esa0NBQWtDO0FBQUEsRUFDbEMsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLElBQ1QsT0FBUztBQUFBLElBQ1QsZ0JBQWdCO0FBQUEsSUFDaEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsUUFBVTtBQUFBLElBQ1YsS0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsS0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsTUFBUTtBQUFBLElBQ1IsU0FBVztBQUFBLElBQ1gsT0FBUztBQUFBLElBQ1QsT0FBUztBQUFBLElBQ1QsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLHlCQUF5QjtBQUFBLElBQ3pCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLGVBQWU7QUFBQSxJQUNmLG9DQUFvQztBQUFBLElBQ3BDLDZCQUE2QjtBQUFBLElBQzdCLGNBQWdCO0FBQUEsSUFDaEIsUUFBVTtBQUFBLElBQ1Ysc0JBQXNCO0FBQUEsSUFDdEIsU0FBVztBQUFBLElBQ1gsVUFBWTtBQUFBLElBQ1osK0JBQStCO0FBQUEsSUFDL0IsYUFBZTtBQUFBLElBQ2YsWUFBYztBQUFBLElBQ2QsUUFBVTtBQUFBLElBQ1YsTUFBUTtBQUFBLElBQ1IsdUJBQXVCO0FBQUEsRUFDekI7QUFBQSxFQUNBLGNBQWdCO0FBQUEsSUFDZCxjQUFjO0FBQUEsSUFDZCxrQkFBa0I7QUFBQSxJQUNsQixRQUFVO0FBQUEsSUFDVixjQUFnQjtBQUFBLEVBQ2xCO0FBQ0Y7OztBRDlDQSxJQUFNLEVBQUUsZUFBZSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxJQUFJO0FBU3BELElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQWtCO0FBQzdELFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUFBO0FBQUEsSUFFakQsY0FBYztBQUFBO0FBQUE7QUFBQSxNQUdaLFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQTtBQUFBLElBRUEsS0FDRSxZQUFZLFdBQVcsU0FBUyxlQUM1QjtBQUFBO0FBQUEsTUFFRSxZQUFZLE9BQU8sS0FBSyxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BTXZDLFVBQVUsT0FBTyxLQUFLLFlBQVk7QUFBQSxJQUNwQyxJQUNBO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixTQUFTO0FBQUE7QUFBQSxRQUVQLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBO0FBQUEsUUFFUCxpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsTUFBSztBQUFBLE1BQ0gsU0FBUztBQUFBO0FBQUEsUUFFUCxpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
