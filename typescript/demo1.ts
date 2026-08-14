import { type Locator, type Page } from '@playwright/test';

let message1: string = "Hello";
message1 = "bye";
console.log(message1);

let age1: number = 20;
// age1 = "hello";
console.log(age1);

let isActive: boolean = false;


let numberArray: number[] = [1, 2, 3];

let data: any = "this could be anything";
data = 42;

function add(a: number, b: number): number {
    return a + b;
}
console.log(add(2, 3));
// console.log(add(2, "3"));

// object
let user: { name: string, age: number, location: string } = { name: 'mingi', age: 34, location: 'korea' };
user.location = 'south korea';
console.log(user);

// class
class LoginPage {
    page: Page;
    userName: Locator;
    password: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        // 여기다가 변수를 선언해야 이 클래스의 모든 범위에서 사용할 수 있다.
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("[value = 'Login']");
    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username: string, password: number) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        // 이를 위한 2가지 방법
        // 방법 1 : 브라우저에서 요소를 업로드하기 위한 network 통신이 끝나고 idle 상태임을 체크
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };
