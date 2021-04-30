// const weAreInProduction = process.env.NODE_ENV === "production";
// const assetPrefix = weAreInProduction ? "/preprosql" : "";

import { CSSProperties } from "react";

const assetPrefix = process.env.ASSET_PREFIX || "";

const urlFor = (path = "/"): string => `${assetPrefix}${path}`;

const redirect = (path = "/"): void =>
  window?.location?.replace(`${assetPrefix}${path}`);

/**
 * Convert template literal backtick-strings to React style objects for use as
 * inline-styles.
 *
 * Utility template literal parser
 *
 * @param {string | TemplateStringsArray | string[]} str
 * @returns
 */
const style = (
  str: string | TemplateStringsArray | string[] = ""
): CSSProperties => {
  const s = {};
  const myString = (str instanceof Array ? str.join("") : str)
    .replace(/ {2,}/g, "")
    .replace(/\n/g, "")
    .trim();

  const formatStringToCamelCase = (someString: string) => {
    const splitted = someString.split("-");
    if (splitted.length === 1) return splitted[0];
    return (
      splitted[0] +
      splitted
        .slice(1)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join("")
    );
  };

  myString.split(";").forEach((el) => {
    const [property, value] = el.split(":");
    if (!property) return;
    const formattedProperty = formatStringToCamelCase(property.trim());
    s[formattedProperty] = value.trim();
  });

  return s;
};

export { assetPrefix, redirect, style, urlFor };
