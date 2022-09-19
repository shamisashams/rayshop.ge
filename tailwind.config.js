const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
      ...defaultColors,
      ...{
        "custom-orange": "#ED5C2F",
        "custom-blue": "#3FA0CD",
        "custom-yellow": "#d99301",
        "custom-slate": {
          100: "#F8F8F8",
          200: "#F5F5F5",
          300: "#EFEFEF",
        },
      },
    };

module.exports = {
    // content: ["./resources/js/**/*.{html,js,jsx}"],
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            colors: colors,
        },
    },
    plugins: [],
};

// module.exports = {
//     content: ["./resources/**/*.{html,js,jsx}"],
//     theme: {
//       extend: {
//         colors: colors,
//       },
//     },
//     plugins: [],
//   };
