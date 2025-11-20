import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      safelist: [
        "speaking:ring-pink-400",
        "speaking:shadow-[0_0_30px_rgba(255,100,150,0.6)]",

        // ⭐ Gradients you use
        "from-indigo-500",
        "to-purple-500",
        "from-green-500",
        "to-teal-500",
        "from-orange-500",
        "to-yellow-500",
        "from-red-500",
        "to-rose-500",
        "from-blue-500",
        "to-cyan-500",
        "from-pink-500",
        "to-rose-500",

        "bg-gradient-to-br",
      ],
    }),
  ],

  // ⭐ ADD THIS SECTION FOR FASTAPI BACKEND
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
