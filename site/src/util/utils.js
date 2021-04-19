const weAreInProduction = process.env.NODE_ENV === "production";
const assetPrefix = weAreInProduction ? "/preprosql" : "";

export default weAreInProduction;
export { weAreInProduction, assetPrefix };
