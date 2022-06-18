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

    it("view order history", () => {
        cy.get(".menuButton").contains("Order History").click();
        cy.wait(2000);
    
        cy.url().then((url) => {
          expect(url).to.equal("http://localhost:3001/cashier/chatsupport");
        });
        cy.get(".orderbox_details")
          .children("p")
          .contains("Chunky Burger x 4 - Rs 3000");
      });

});