# React Test

## unit test

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

test("on initial render, the pay button is disabled", async () => {
  render(
    <TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "5" }} />
  );

  // screen.debug();
  // screen.getByRole("");
  // getByRole 로 엘리먼트 별로 조회할 수 있음
  // 그걸 통해서 찾는 엘리먼트가 button 이라는 롤에 pay 라는 이름을 갖고 있음을 알 수 있음 => 좀 더 명확하게 찾기 좋음
  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
});

test("if an amount and note is entered, the pay button become enabled", async () => {
  render(
    <TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "5" }} />
  );
  // 입력 이벤트를 모방해야 함
  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
```

## integration test

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

test("intergration test for pay button", async () => {
  render(
    <TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "5" }} />
  );

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
```

## end to end test

Tseting Playground 를 활용하면 편하게 테스할 요소를 찾기 좋음.

```js
const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  it("user can make payment", () => {
    // 테스트 시나리오?
    // 1: login
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    // invalid password test
    // cy.findByLabelText(/password/i).type("invalid password");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();

    // 2: check account balance
    let oldBalance;
    cy.get('[data-test="sidenav-user-balance"]')
      .then(($balance) => (oldBalance = $balance.text()))
      .then((balance) => console.log("balance: ", balance));

    // 3: click on pay button
    cy.findByRole("button", { name: /new/i }).click();

    // 4: search for user
    cy.findByRole("textbox").type("devon becker");
    cy.findByText(/devon becker/i).click();

    // 5: add amount and note and click pay
    const paymentAmout = "5.00";
    cy.findByPlaceholderText(/amount/i).type(paymentAmout);
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    // 6: return to transactions
    cy.findByRole("button", { name: /return to transactions/i }).click();

    // 7: go to personal payments
    cy.findByRole("tab", { name: /mine/i }).click();

    // 8: click on payment
    cy.findByText(note).click({ force: true });

    // 9: verify if payment was made
    cy.findByText(`-$${paymentAmout}`).should("be.visible");
    cy.findByText(note).should("be.visible");

    // 10: verify if payment amount was deducted
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat(
        $balance.text().replace(/\$|,/g, "")
      );
      expect(convertedOldBalance - convertedNewBalance).to.equal(
        parseFloat(paymentAmout)
      );
    });
  });
});
```
