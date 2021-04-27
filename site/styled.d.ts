import "styled-components";

export interface StyleMapping {
  [key: string]: string | ((...args: any[]) => string);
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: StyleMapping;
    fonts: StyleMapping;
    shadows: { sparse: string } & StyleMapping;
    transitions: StyleMapping;
    mixins: StyleMapping;
  }
}
