const dotenv = require("dotenv");
const fs = require('fs')
const path = require('path')

dotenv.config();

console.log(process.env.APP_PORT);

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,"./openssl_keys/id_rsa_private"))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,"./openssl_keys/id_rsa_public.pub"))

module.exports = { APP_PORT } = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY