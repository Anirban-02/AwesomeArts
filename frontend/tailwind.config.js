/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      backgroundImage:{
        'b1':"url('../public/img/bg1.jpg')",
        'b2':"url('../public/img/bg2.jpg')",
        'b3':"url('../public/img/bg3.jpg')",
        'b4':"url('../public/img/bg4.jpg')",
        'card1':"url('../public/img/b.jpg')"
      },
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
     
    },
  },
  plugins: [],
};
