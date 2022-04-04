module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#2e2824",
        base: "#72645a",
        "details-dark": "#b19781",
        "details-light": "#d0b195",
        highlights: "#efcba9",
        background: "#f8f7f4",
      },
      minHeight: {
        8: "32px",
        12: "48px",
      },
      height: { "11/12": "91.666667%", 88: "22rem", 104: "26rem" },
      width: { 88: "22rem", 104: "26rem" },
      fontFamily: {
        montserrat: ["sans-serif"],
      },
      maxWidth: {
        "4/5": "80%",
      },
    },
  },
  plugins: [],
};
