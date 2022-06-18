/// <reference types="Cypress" />

context("Place order", { scrollBehavior: "center" }, () => {
  beforeEach(() => {
    cy.visit("admin/employees");
    cy.get("button").contains("Create New").click();
    cy.contains("").parent().find("input").type("03328409924");
    cy.contains("Phone no").parent().find("input").type("03328409924");
    cy.contains("Phone no").parent().find("input").type("03328409924");
    cy.contains("Password").parent().find("input").type("12345678");
    cy.get("button").contains("Login").click();
    cy.wait(2000);
  });
});
