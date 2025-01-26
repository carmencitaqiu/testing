module.exports = {
  content: [
    "./src/views/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  // darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      zIndex: {
      },
      spacing: {

      },
      margin: {
        "1.5": "6px"
      },
      borderRadius: {
        "lg1": "10px"
      },
      fontSize: {
        "xs1": "13px",
        "sm1": "15px",
        "xl1": "22px",
        "xl2": "32px",
        "xl3": "28px",
        "4.5xl": "40px"
      },
      boxShadow: {
        "shadow-1": "0px 4px 36px 0px rgba(0, 0, 0, 0.06)",
        "shadow-2": "0px 2px 24px 0px rgba(0, 0, 0, 0.06)"
      },
      colors: {
        "red-1": "#FD4F4F",
        "blue-light": "#EBF7FA",
        "blue-dark": "#1f3b4b",
        "black-1": "rgba(0,0,0,0.95)",
        "black-2": "rgba(0,0,0,0.85)",
        "border-1": "#D9D9D9",
        "black-3": "rgba(0,0,0,0.55)",
        "black-4": "rgba(0,0,0,0.40)",
        "black-5": "rgba(0,0,0,0.20)",
        "black-6": "#161823",
        "black-7": "rgba(0,0,0,0.06)",
        "black-8": "rgba(0,0,0,0.03)",
        "black-9": "rgba(0,0,0,0.5)",
        "black-10": "rgba(29, 31, 36, 0.5)",
        "black-11": "rgba(0,0,0,0.08)",
        "black-12": "#0D0D0D",
        "white-1": "#F5F5F5",
        "white-2": "rgba(255,255,255,0.06)",
        "white-3": "rgba(255,255,255,0.4)",
        "green-1": "#5ADD68",
        "green-2": "rgba(62,242,103,0.06)",
        "green-3": "rgba(90,221,104,0.08)",
        "green-4": "#9fdee2",
        "yellow-1": "#FFAB6E",
        "brand-1": "#0A2FEF",
        "brand-2": "rgba(10,47,239,.12)",
        "brand-1-disabled":"rgba(10, 47, 239, .4)",
        "orange-1": "rgba(255,139,55,.9)",
        "orange-2": "rgba(255,139,55,0.08)",
        "gray-1": "rgba(0,0,0,0.04)",
        "gray-2": "rgba(0,0,0,0.34)"
      },
      fontFamily: {
        "roboto": [
          "Roboto",
        ]
      },
      letterSpacing: {
      },
      lineHeight: {

      },
      height: {
        "22": "84px",
        "13": "52px",
        "21": "84px",
      },
      minWidth: {
        "modal": "750px"
      },
      transitionProperty: {
        "fontsize": "fontsize"
      },
      width: {
        "13": "52px",
        "26": "108px",
        "110": "440px"
      },
      zIndex: {
      },
      flex: {
        "2": "2 2 0%"
      }
    }
  },
  plugins: [
  ],
}