/// <reference types="Cypress" />

context("View order history", { scrollBehavior: "center" }, () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("button").contains("Login").click();
    cy.contains("Phone no").parent().find("input").type("03328409924");
    cy.contains("Password").parent().find("input").type("12345678");
    cy.get("button").contains("Login").click();
    cy.wait(2000);
  });

  it("view order history", () => {
    cy.get(".menuButton").contains("Order History").click();
    cy.wait(2000);

    cy.url().then((url) => {
      expect(url).to.equal("http://localhost:3001/customer/orderHistory");
    });
    cy.get(".orderbox_details")
      .children("p")
      .contains("Chunky Burger x 1 - Rs 3000");
  });
});
