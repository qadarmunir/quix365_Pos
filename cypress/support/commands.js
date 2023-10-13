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
    cy.get(':nth-child(5) > .nav-link').click({ multiple: true },{timeout:5000}) //click on website
    cy.get('#site_url').type(domain_name, {timeout:8000})
    //cy.wait(7000)
    cy.get('#btnSubmit').click({timeout:8000}) //login btn
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
Cypress.Commands.add('Add_Products_DATA', (p_name , barcode, supplier_code, custome_field , product_cost)=>{

    cy.get('.controls > .__mandatory_aestrick_label').type(p_name) //product name
    cy.get('.col-md-8 > :nth-child(1) > .pvr-box > .row > :nth-child(2) > .form-float > .controls > label').type(barcode) //barcode
    cy.get('.col-md-8 > :nth-child(1) > .pvr-box > .row > :nth-child(3) > .form-float > .controls > label').type(supplier_code) // supplier code
    cy.get(':nth-child(4) > .form-float > .controls > label').type(custome_field)
    cy.get('div.radio > :nth-child(1) > .option-input').check().should('have.value', '0')  // no variants selected
    cy.log(' Simple product, no variants ')

    cy.get('#chl_type').check().should('be.enabled') // show on POS check
    cy.get('.pvr-box > .row > :nth-child(1) > label').should('have.text', '\n                                Point Of Sale')
    cy.get('#clearform').click() // select outlet
     // cy.xpath("(//input[@name='outlet_ids[]'])[1]").check().should('be.enabled') // select outlet
    cy.get('.col-6 > label').click()
   // cy.get('.col-6 > label').should('have.text', '\n                                        \n                                        Lhr Store\n') //
    cy.get('#sel_outlet').click() // save  sittings
    cy.get('.col-sm-12 > label > .option-input').check().should('be.enabled') // show on ecommerce checkbox
    //cy.get('.col-sm-12 > label').should('have.text', '\n  Ecommerce')
    cy.get(':nth-child(7) > .slider').click()
    cy.get(':nth-child(9) > .slider').click()
    cy.get('#your_cost').type(product_cost)
    //cy.get('.button-group > .btn-primary').click() //save sitting

});
// cypress.Commands.add('product_with_variant', ()=>{

// })
