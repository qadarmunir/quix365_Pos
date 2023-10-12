describe('Add product testcases', ()=>{
    before(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarps', 'qadar.q.a1+8@gmail.com', '12345678')
    });
    it.skip('add_product_testcase',()=>{
        cy.fixture('addproduct').then((DATA)=>{

            cy.Add_Products_DATA(

                DATA.p_name==product12,
                DATA.barcode,
                DATA.supplier_code,
                DATA.custom_field,
                DATA.product_cost
            )
        });
    });

    it('Cancel_Delete_product', ()=>{
            cy.get('.nav > :nth-child(3) > .dropdown-toggle').click()     // click on products dropdown
            cy.get('li.show > .dropdown-menu > :nth-child(1) > .sub_link').click({timeout:5000})   // select product drop
            cy.get(':nth-child(2) > :nth-child(8) > .dropdown > .dropdown-toggle > .material-icons').click()
            cy.get('.cancel').click()
            cy.get('p[style="display: block;"]').should('have.text', 'Your record has not been deleted  ')
            cy.get('.confirm').click()


    });
    it.skip('Delete_Product', ()=>{
            cy.get('.nav > :nth-child(3) > .dropdown-toggle').click()     // click on products dropdown
            cy.get('li.show > .dropdown-menu > :nth-child(1) > .sub_link').click({timeout:5000})   // select product drop
            cy.get(':nth-child(2) > :nth-child(8) > .dropdown > .dropdown-toggle > .material-icons').click()
            cy.get('#Product-WygqPGELd3Mb698jZX1n > .btn').click()
            cy.get('p[style="display: block;"]').should('have.text', 'Record will be permanently deleted.')
            cy.get('.confirm').click()
            cy.get('p[style="display: block;"]').should('have.text','Products has been deleted successfully.' )
            cy.get('.confirm').click()
    });
    
});