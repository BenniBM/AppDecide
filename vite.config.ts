import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                maximumFileSizeToCacheInBytes: 4000000,
                globPatterns: ["**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2,pdf}"],
                // Ensure network-first strategy for API calls
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/api\./i,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "api-cache",
                            networkTimeoutSeconds: 10,
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
            includeAssets: ["favicon.png"],
            manifest: {
                name: "AppDecide",
                short_name: "AppDecide",
                description: "A tool to help you decide on the best development strategy for your next project.",
                theme_color: "#000",
                background_color: "#000",
                display: "standalone",
                icons: [
                    {
                        src: "32.png",
                        sizes: "32x32",
                        type: "image/png",
                    },
                    {
                        src: "144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "256.png",
                        sizes: "256x256",
                        type: "image/png",
                    },
                    {
                        src: "512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "1024.png",
                        sizes: "1024x1024",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
        exclude: ["lucide-react"],
    },
});
