/// <reference types="cypress" />
import {baseUrl} from "../../../cypress.json";

describe("Check if login functionality works",()=>{
    beforeEach(()=>{
        cy.visit("/");
    })

    it("Login functionality works for admin",{scrollBehavior:"center"},()=>{
        cy.get('button').contains('Login').click();
        cy.contains('Phone no').parent().find('input').type("03000000000");
        cy.contains('Password').parent().find('input').type("123123123123");
        cy.get('button').contains('Login').click();
        cy.wait(2000)

        cy.url().then((url)=>{
                expect(url).to.equal(baseUrl+"/admin")                   
                cy.get('.menuButton').contains('Logout').click();
                cy.wait(2000)
                cy.url().then((url)=>{
                    expect(url).to.equal(baseUrl+"/") 
                })
        })    
    })

    it("Login functionality works for cashier",{scrollBehavior:"center"},()=>{
        cy.get('button').contains('Login').click();
        cy.contains('Phone no').parent().find('input').type("03006969690");
        cy.contains('Password').parent().find('input').type("123123123123");
        cy.get('button').contains('Login').click();
        cy.wait(2000)

        cy.url().then((url)=>{
                expect(url).to.equal(baseUrl+"/cashier")                   
                cy.get('.menuButton').contains('Logout').click();
                cy.wait(2000)
                cy.url().then((url)=>{
                    expect(url).to.equal(baseUrl+"/") 
                })
        })    
    })

    it("Login functionality works for customer",{scrollBehavior:"center"},()=>{
        cy.get('button').contains('Login').click();
        cy.contains('Phone no').parent().find('input').type("03040392819");
        cy.contains('Password').parent().find('input').type("123123123123");
        cy.get('button').contains('Login').click();
        cy.wait(2000)

        cy.url().then((url)=>{
                expect(url).to.equal(baseUrl+"/customer")                   
                cy.get('.menuButton').contains('Logout').click();
                cy.wait(2000)
                cy.url().then((url)=>{
                    expect(url).to.equal(baseUrl+"/") 
                })
        })    
    })
})