const purple = ({ opacity = 1 } = {}) => `rgba(39, 0, 84, ${opacity})`;
const blue = ({ opacity = 1 } = {}) => `hsla(240, 100%, 20%, ${opacity})`;

const theme = {
  colors: {
    sqlRed: "hsl(0, 100%, 30%)",
    preProBlue: blue(),
    seeThroughPurple: purple({ opacity: 0.623 }),
    createPurple: purple,
    createBlue: blue,
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
    liftedFast: "all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)",
  },
};

export default theme;
