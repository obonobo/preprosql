const weAreInProduction = process.env.NODE_ENV === "production";
const assetPrefix = weAreInProduction ? "/preprosql" : "";

const redirect = (path = "/") =>
  window && window.location && window.location.replace(`${assetPrefix}${path}`);

export default weAreInProduction;
export { weAreInProduction, assetPrefix, redirect };
