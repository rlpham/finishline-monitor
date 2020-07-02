const axios = require('axios');
const moment = require('moment');
var Base64 = require('js-base64').Base64;

var config = require('./config.json');

var isInStock = false;
var products = [];

var poll = setInterval(monitor, config.POLL_INTERVAL);

console.log("Monitor Started")
console.log(`Product ID: ${config.PRODUCT_ID}`)
console.log(`Style ID: ${config.STYLE_ID}`)
console.log(`Color ID: ${config.COLOR_ID}`)

function monitor() {

  console.log(`${moment().format('LTS')}: Checking stock`)
  axios({
    method: "GET",
    url: `https://www.finishline.com/store/browse/json/productSizesJson.jsp?productId=${config.PRODUCT_ID}&styleId=${config.STYLE_ID}&colorId=${config.COLOR_ID}`
  }).then((response) => {
    //not in stock but just loaded
    if(response.data.productSizes[0].productId === `${config.STYLE_ID}-${config.COLOR_ID}` && !isInStock) {
      isInStock = true;
      response.data.productSizes.forEach((value) => {
        if(value.sizeClass === "") {
          products.push({
            "size": value.sizeValue,
            "stockLevel": Base64.decode(value.stockLevel)
          })
        }
      })
      notifyRestock();
      //in stock but just sold out
    } else if(response.data.productSizes[0].productId != `${config.STYLE_ID}-${config.COLOR_ID}` && isInStock) {
      isInStock = false;
      products = [];
    }
  }).catch(e => console.log(e));

}

function notifyRestock() {
  console.log(products);
    var sizes = "";

    products.forEach((value) => {
      sizes += `${value.size} (${value.stockLevel})\n`
    })

    axios({
      method: "POST",
      url: config.WEBHOOK,
      data: {
          embeds: [{
              title: `Item Restock!`,
              color: 9502464,
              footer: {
                text: "finishline-monitor by Bompton#7777"
              },
              thumbnail: {
                url: "https://dynl.mktgcdn.com/p/9mc68tD1fQAi5AZw6QOH8nW3U_YQ7Jg0UWvrDmXd5fI/1008x1008.png"
              },
              fields: [
                {
                  name: "Style Code",
                  value: `${config.STYLE_ID}-${config.COLOR_ID}`
                },
                {
                  name: "Sizes + Current Stock",
                  value: sizes
                },
                {
                  name: "Time",
                  value: moment().format('LTS'),
                  inline: true
                },
                {
                  name: "Action",
                  value: `[Product Page](https://www.finishline.com/store/product/fnl/${config.PRODUCT_ID}?styleId=${config.STYLE_ID}&colorId=${config.COLOR_ID})`
                }
              ]
            }]
      }
    }).catch(e => console.log(e.response));
}