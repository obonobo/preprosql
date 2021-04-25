const purple = ({ opacity }) => `rgba(39, 0, 84, ${opacity})`;

const theme = {
  colors: {
    sqlRed: "hsl(0, 100%, 30%)",
    preProBlue: "hsl(240, 100%, 20%)",
    seeThroughPurple: purple({ opacity: 0.623 }),
    createPurple: purple,
  },
  fonts: {
    B612: `
      "B612", Menlo, Monaco,
      Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono,
      Courier New, monospace
    `,
    IBMPlexSerif: `
      IBM Plex Serif
    `,
  },
  shadows: {
    sparse: "0px 11px 67px -4px rgba(0, 0, 0, 0.6)",
  },
  transitions: {
    lifted: "all 1s cubic-bezier(0.075, 0.82, 0.165, 1)",
    // lifted: "all 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955)",
    // lifted: "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
};

export default theme;
