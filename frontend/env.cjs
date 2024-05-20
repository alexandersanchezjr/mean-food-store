const fs = require('fs');
const dotenv = require('dotenv').config();
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const isProd = process.env.IS_PRODUCTION === 'true';

const envPath = isProd ? '' : '.development';

const envFile = `export const environment = {
    serverUrl: '${process.env.SERVER_URL}',
    production: ${process.env.IS_PRODUCTION},
    foodsPath: '${process.env.FOODS_PATH}',
    tagsPath: '${process.env.TAGS_PATH}',
    searchPath: '${process.env.SEARCH_PATH}',
    loginPath: '${process.env.LOGIN_PATH}',
    registerPath: '${process.env.REGISTER_PATH}',
    orderPath: '${process.env.ORDER_PATH}',
    createOrderPath: '${process.env.CREATE_ORDER_PATH}',
    newOrderForCurrentUserPath: '${process.env.NEW_ORDER_FOR_CURRENT_USER_PATH}',
    payOrderPath: '${process.env.PAY_ORDER_PATH}',
    stripeKey: '${process.env.STRIPE_KEY}',
  };
`;

const targetPath = path.join(__dirname, `../frontend/src/environments/environment${envPath}.ts`);
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated the ${envPath} environment file`);
  }
});
