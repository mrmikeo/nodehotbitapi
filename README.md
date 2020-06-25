# Node HotBit.io API Helper

[![https://telegram.me/@MrMike_O](https://img.shields.io/badge/💬%20Telegram-MrMike__O-blue.svg)](https://telegram.me/@MrMike_O)


A Promised NodeJS Module for connecting with the HotBit.io Restful API 


## Install via git
```
git clone https://github.com/mrmikeo/nodehotbitapi
cd nodehotbitapi
npm install

node example.js
```

example.js:
```
const hotbitApi = require("./lib/hotbitApi");
const restapi = new hotbitApi.default(key, secret);


(async () => {
  
  var xx = await restapi.xxx();
  
  console.log("xx: " + xx);
  
})();
```

## Install via npm
```
npm install --save https://github.com/mrmikeo/nodehotbitapi
```

```
const hotbitApi = require("nodeHotBitApi");
const restapi = new hotbitApi.default(key, secret);


(async () => {
  
  var xxx = await restapi.xxx();
  
  console.log("xxx: " + xxx);
  
})();
```
