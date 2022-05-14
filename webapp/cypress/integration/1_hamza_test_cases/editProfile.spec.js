/// <reference types="cypress" />
import {baseUrl} from "../../../cypress.json";

describe("Check if edit profile works",()=>{



    describe("Check if change username works",()=>{
        beforeEach(()=>{
            cy.visit("/");
        })

        it("change username to new empty user name",{scrollBehavior:"center"},()=>{
            cy.get('button').contains('Login').click();
            cy.contains('Phone no').parent().find('input').type("03040392819");
            cy.contains('Password').parent().find('input').type("123123123123");
            cy.get('button').contains('Login').click();
            cy.wait(2000)
            cy.url().then((url)=>{             
                    cy.wait(2000)
                    cy.get('.menuButton').contains('Profile Settings').click();
                    cy.wait(2000)
                    //cy.get('input[placeholder="name"]').type("");
                    cy.get('input[placeholder="name"]').parent().parent().parent().find("button").click();
                    cy.on('window:alert', (str) => {
                        expect(str).to.not.equal(`Successful`)
                        //cy.off('window:alert');
                    })

                    cy.wait(2000)
                    cy.get('.menuButton').contains('Logout').click();            
                    cy.get('button').contains('Login').click();
                    cy.contains('Phone no').parent().find('input').type("03040392819");
                    cy.contains('Password').parent().find('input').type("123123123123");
                    cy.get('button').contains('Login').click();
                    cy.wait(2000);
                    cy.contains("Welcome").parent().should('contain.text','omarakmal')
            })
         })

         it("change username to new correct user name",{scrollBehavior:"center"},()=>{
            cy.get('button').contains('Login').click();
            cy.contains('Phone no').parent().find('input').type("03040392819");
            cy.contains('Password').parent().find('input').type("123123123123");
            cy.get('button').contains('Login').click();
            cy.wait(2000)
            cy.url().then((url)=>{             
                    cy.wait(2000)
                    cy.get('.menuButton').contains('Profile Settings').click();
                    cy.wait(2000)
                    cy.get('input[placeholder="name"]').type("newname");
                    cy.get('input[placeholder="name"]').parent().parent().parent().find("button").click();
                    cy.wait(2000)
                    cy.get('.menuButton').contains('Logout').click();
            
                    cy.get('button').contains('Login').click();
                    cy.contains('Phone no').parent().find('input').type("03040392819");
                    cy.contains('Password').parent().find('input').type("123123123123");
                    cy.get('button').contains('Login').click();
                    cy.wait(2000);
                    cy.get('.menuButton').contains('Profile Settings').click();
                    cy.wait(2000)
                    cy.get('input[placeholder="name"]').type("omarakmal");
                    cy.get('input[placeholder="name"]').parent().parent().parent().find("button").click();                
            })
    })




    })
    
    


})