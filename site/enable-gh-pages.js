#!/usr/bin/env node

const fs = require("fs");

const file = "next.config.js";
const data = fs.readFileSync(file);
fs.writeFileSync(
  file,
  data
    .toString()
    .replace(
      new RegExp(`// basePath: "/preprosql",`, "g"),
      `basePath: "/preprosql",`,
    )
    .replace(
      new RegExp(`// assetPrefix: "/preprosql/"`, "g"),
      `assetPrefix: "/preprosql/"`,
    ),
);
