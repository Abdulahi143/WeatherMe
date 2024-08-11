import fs from "fs";

const config = `export default {
  API_KEY: ‘${process.env.API_KEY}‘,
};`;

fs.writeFileSync("src/config.js", config);
