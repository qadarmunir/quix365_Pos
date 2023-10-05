// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('Login' , (domain_name, email, password) =>{
    cy.get(':nth-child(5) > .nav-link').click({timeout:5000}) //click on website
    cy.get('#site_url').type(domain_name)
    cy.get('#btnSubmit').click({timeout:5000}) //login btn
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('.btn').click({timeout:5000})

})

// Cypress.Commands.add('Login' , () =>{
//     cy.get(':nth-child(5) > .nav-link').click({timeout:5000}) //click on website
//     cy.get('#site_url').type('qadarjs')
//     cy.wait(3000)
//     cy.get('#btnSubmit').click({timeout:5000}) //login btn
//     cy.get('#email').type('qadar.q.a1+9@gmail.com')
//     cy.get('#password').type('12345678')
//     cy.get('.btn').click({timeout:5000})

// })
