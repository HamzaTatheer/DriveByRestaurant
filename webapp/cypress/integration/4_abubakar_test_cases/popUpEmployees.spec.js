/// <reference types="Cypress" />

context("Place order", { scrollBehavior: "center" }, () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("button").contains("Login").click();
      cy.contains("Phone no").parent().find("input").type("03000094204");
      cy.contains("Password").parent().find("input").type("123123123123");
      cy.get("button").contains("Login").click();
      cy.wait(2000);
    });

});