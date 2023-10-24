describe('Product_brand', ()=>{ 
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs ', 'g.qadar.qa@gmail.com', '12345678')
         //open product page
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
    });
    afterEach(()=>{
        cy.get('.w-30').click({force:true});
        cy.get('[href="https://qadarjs.quix365.com/en/admin/logout"]').click({force:true});
    });
    it('Add_Product_brand', ()=>{
        cy.get('@select_product_dropdown').click()

    });

});