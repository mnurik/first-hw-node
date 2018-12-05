import { User, Product } from "./models";

new User();
new Product();

const configs = require('./config/config.json');
console.log(configs.name);
