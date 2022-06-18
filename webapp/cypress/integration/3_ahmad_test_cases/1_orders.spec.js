/// <reference types="Cypress" />

context("Order Status", { scrollBehavior: "center" }, () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("button").contains("Login").click();
    cy.contains("Phone no").parent().find("input").type("03000094204");
    cy.contains("Password").parent().find("input").type("123123123123");
    cy.get("button").contains("Login").click();
    cy.wait(2000);
    cy.visit("cashier/orders");
    cy.get("button").contains("Pending").click();
    cy.get("button").contains("Cooking").click();
    cy.get("button").contains("Ready").click();
    cy.wait(2000);
  });

  it("Chat with customer support", () => {
    cy.get(".myButton")
      .children("button")
      .contains("Chat with Customer Support")
      .click();
    cy.wait(2000);

    cy.url().then((url) => {
      expect(url).to.equal("http://localhost:3001/cashier/chatsupport");
    });

    cy.get(".custom-input input").type("Hello! Welcome");
    cy.get(".myButton").children("button").contains("send").click();

    cy.get(".chat-container").children("div").contains("Cashier: Welcome");
  });
});
