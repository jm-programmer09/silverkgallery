const data = require('./src/products.json');

let totalproducts = 0;

Object.keys(data.animation).forEach(value => {
  Object.keys(data.animation[value]).forEach(next => {
    if (next === "subcategories") {
      Object.keys(data.animation[value][next]).forEach(subcategory => {
        Object.keys(data.animation[value][next][subcategory]).forEach(product => {
          totalproducts++;
        });
      });

      return;
    }

    // else
    totalproducts++;

  });
});

console.log(totalproducts);
