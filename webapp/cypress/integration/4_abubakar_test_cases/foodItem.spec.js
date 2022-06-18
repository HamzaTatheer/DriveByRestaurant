/// <reference types="Cypress" />

context("Pop up food item", { scrollBehavior: "center" }, () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("button").contains("Login").click();
      cy.contains("Phone no").parent().find("input").type("03328409924");
      cy.contains("Password").parent().find("input").type("12345678");
      cy.get("button").contains("Login").click();
      cy.wait(2000);
    });



});