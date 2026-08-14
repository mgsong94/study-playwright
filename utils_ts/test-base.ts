import {test as baseTest} from '@playwright/test';

// typescript이므로 type이 지정된 interface를 먼저 작성해야 함.
interface TestDataForOrder {
    username: string;
    password: string;
    productName : string;
}

exports.customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>({
    testDataForOrder: {
        username : "tysong0904@gmail.com",
        password : "Mingi!94",
        productName : "ZARA COAT 3"
    }
})