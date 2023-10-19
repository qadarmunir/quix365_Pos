//const { contains } = require("cypress/types/jquery");

describe('Add product testcases', ()=>{
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarps ', 'g.qadar.qa@gmail.com', '12345678')
        
         //open product page
    });
    it('select date ',()=>{
        cy.get('body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)').click()
        
        cy.get('body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1) > span:nth-child(1)').click()
        cy.get('.module-actions > .btn').click() // add quotation module
        //cy.get('#expires_at').click() //expire date  
        const dateToSelect = '2023-10-25'; // Replace with your desired date
        cy.get('#expires_at').invoke('val', dateToSelect); // Use the .invoke() method to set the date value
        cy.get('#expires_at').should('have.value', dateToSelect);  // You can assert the value if needed
        // dropdown selector
        cy.get('#supplier_id').select('Demo Supplier 2').should('have.value', '2');
    });   

});    