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
};

export default theme;
