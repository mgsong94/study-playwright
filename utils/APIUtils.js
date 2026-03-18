class APIUtils {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  async getToken(loginPayload) {
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload });
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;

    return token;
  }

  async createOrder(orderPayload, token) {
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
      data: orderPayload,
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      }
    });
    const orderResponseJson = await orderResponse.json();
    const orderText = orderResponseJson.orders[0];

    return orderText;
  }
}

// 이걸 해줘야 프로젝트 내 모든 범위에서 사용 가능.
module.exports = {APIUtils};