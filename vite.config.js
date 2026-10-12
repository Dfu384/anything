import {defineConfig} from 'vite';
import {createApi} from './server/api.js';
export default defineConfig({plugins:[{name:'odd-angle-api',configureServer(server){server.middlewares.use(createApi());},configurePreviewServer(server){server.middlewares.use(createApi());}}]});
