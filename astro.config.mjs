import { defineConfig } from 'astro/config'
import glslify from "vite-plugin-glslify"
// https://astro.build/config
export default defineConfig({
    vite:{
        plugins:[
            glslify()
        ]
    }
})
