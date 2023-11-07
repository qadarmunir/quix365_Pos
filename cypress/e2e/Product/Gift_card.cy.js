describe('Gift_card',()=>{
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs ', 'g.qadar.qa@gmail.com', '12345678')
         //open product page
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
        cy.get('li.show > .dropdown-menu > :nth-child(3) > .sub_link').as('product_brand_page').click()
        cy.get('#clearsform').as('add_brand_btn').click()
        cy.get('#form_save > .modal-header > .close').click() //close button
    });
    // afterEach(()=>{
    //     cy.get('.w-30').click({force:true});
    //     cy.get('[href="https://qadarjs.quix365.com/en/admin/logout"]').click({force:true});
    // });
    it('open_outlet(register) and verify that gift card is shown on "sale process page"', ()=>{
        cy.get('@select_product_dropdown').click()

    })
});