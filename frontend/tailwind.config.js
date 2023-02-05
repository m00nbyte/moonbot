/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/react-tailwindcss-select/dist/index.esm.js'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                body: ['Rubik', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
                rubik: ['Rubik', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                fira: ['Fira Code', 'monospace']
            }
        }
    },
    plugins: [require('tailwindcss-iconify').default(), require('tailwind-hamburgers')]
};
