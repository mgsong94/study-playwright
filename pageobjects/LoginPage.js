class LoginPage {
  constructor(page) {
    // 여기다가 변수를 선언해야 이 클래스의 모든 범위에서 사용할 수 있다.
    this.page = page;
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.loginButton = page.locator("[value = 'Login']");
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
  
  async validLogin(username, password) {
    await this.userName.fill("tysong0904@gmail.com");
    await this.password.fill("Mingi!94");
    await this.loginButton.click();
    // 이를 위한 2가지 방법
    // 방법 1 : 브라우저에서 요소를 업로드하기 위한 network 통신이 끝나고 idle 상태임을 체크
    await this.page.waitForLoadState('networkidle'); 
  }
}

module.exports = {LoginPage};