/// <reference types="Cypress" />

context("Place order", { scrollBehavior: "center" }, () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("button").contains("Login").click();
    cy.contains("Phone no").parent().find("input").type("03328409924");
    cy.contains("Password").parent().find("input").type("12345678");
    cy.get("button").contains("Login").click();
    cy.wait(2000);
  });

  //Order Food
  it("Order food", () => {
    //cy.get(".MuiBackdrop-root").then((abc)=>{abc.click({ force: true })});

    cy.get(".card .card-body .d-flex div .card-title")
      .contains("Chunky Burger")
      .parent()
      .parent()
      .parent()
      .children(".d-flex")
      .children(".btn")
      .click();

    cy.get("small").contains("1").click();
    cy.wait(2000);
    cy.get(".myButton").click();
    cy.wait(2000);
    cy.url().then((url) => {
      expect(url).to.equal("http://localhost:3001/customer/status");
    });
    cy.wait(2000);
    cy.get(".menuButton").contains("Logout").click();
  });

  //Chat with customer support
  it("Chat with customer support", () => {
    cy.get(".myButton")
      .children("button")
      .contains("Chat with Customer Support")
      .click();
    cy.wait(2000);

    cy.url().then((url) => {
      expect(url).to.equal("http://localhost:3001/customer/chat");
    });

    cy.get(".custom-input input").type("Hello! When will my order be ready?");
    cy.get(".myButton").children("button").contains("send").click();

    cy.get(".chat-container")
      .children("div")
      .contains("03328409924: Hello! When will my order be ready?");
  });
});
