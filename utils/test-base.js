const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder: {
        username : "tysong0904@gmail.com",
        password : "Mingi!94",
        productName : "ZARA COAT 3"
    }
})