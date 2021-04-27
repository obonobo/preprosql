declare module "triangulr" {
  export default class Triangulr {
    constructor(
      width: number,
      height: number,
      triangleHeight: number,
      pointArea: number,
      color: (path: {
        x: number;
        y: number;
        lines: number;
        cols: number;
        points: Array;
      }) => string
    );
  }
}
