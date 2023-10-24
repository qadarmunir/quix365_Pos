describe('Product_Type', ()=>{
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs ', 'g.qadar.qa@gmail.com', '12345678')
         //open product_type page alias
         cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click();
         cy.get('li.show > .dropdown-menu > :nth-child(2) > .sub_link').as('product_type_page').click();
         cy.get('#clearsform').as('Add_product_type_page_btn').click();
         cy.get('#btn > .material-icons').click() //cancel button
         //cy.fixture('download (25).jpg').as('fileToUpload');
    });
    // afterEach(()=>{
    //     cy.get('.w-30').click({force:true});
    //     cy.get('[href="https://qadarjs.quix365.com/en/admin/logout"]').click({force:true});
    // });
    it('Add_Product_Type', ()=>{
        cy.get('@select_product_dropdown').click()
        cy.get('@product_type_page').click()
        cy.get('@Add_product_type_page_btn').click()
        cy.get('input[type=file]')
        .selectFile('cypress/fixtures/download (25).jpg', { force: true })
        cy.get('img[src="path-to-uploaded-image.jpg"]').should('exist');
    });
});