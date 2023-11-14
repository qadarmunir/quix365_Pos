describe('Gift_card',()=>{
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs ', 'g.qadar.qa@gmail.com', '12345678')
         //open product page
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
    });
    // afterEach(()=>{
    //     cy.get('.w-30').click({force:true});
    //     cy.get('[href="https://qadarjs.quix365.com/en/admin/logout"]').click({force:true});
    // });
    it.skip('open_outlet(register) and verify that gift card is shown on "sale process page"', ()=>{
        cy.get('li.show > .dropdown-menu > :nth-child(5) > .sub_link').click() // gift_card button
        cy.get('.col-sm-4 > .btn').should('have.text','Activate Gift Cards').click() // activate button of gift_card
        cy.get('.sweet-alert').contains('Activate gift card feature?')
        //cy.wait(5000)
        cy.get('.confirm').click({timeout: 5000})
        cy.log('Activate gift card feature is enabled')
    })
    it('sale_process' , ()=>{
        //cy.get(':nth-child(3) > .collapsed > .icons').click()
       cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").trigger('mouseover').click({timeout:3000}) // open sale drop_down process
       
       cy.wait(3000)
       //cy.get("body > div:nth-child(3)( > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1) > span:nth-child(1)").click({force:true}) // open register
       cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").click({force:true}) // open register page
       
       cy.get('#myTab > :nth-child(1) > .nav-link').contains('Lhr Store')
       cy.get(".outlet_register_id.cash_register_box[data-register='1']").should('have.text','Cash Register 1').click({force:true})
    //    cy.get('.input-group > .form-control').click()
    //    .should('have.text','0.00')
       cy.get('.input-group-btn > .btn').click() //open button
       //close register
       cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").trigger('mouseover').click({timeout:3000}) // open sale drop_down process
       cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").click({force:true}) // open register page
       cy.get('#close_register').click() //close register button
       cy.get('.sweet-alert').contains("Just a reminder... If any discrepancies, don't forget to adjust actual counted box before closing the register.")
       cy.get("body > div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button")
       .invoke('removeAttr', 'iframe') // Fix typo here: 'src', not 'scr'
       .click({ force: true });
       // Check if a new window or tab has been opened

      // cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1) > span:nth-child(1)").click({force:true}) // pos sale process page 
    });
});