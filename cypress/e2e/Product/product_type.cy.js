describe('Product_Type', ()=>{
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs ', 'g.qadar.qa@gmail.com', '12345678')
         //open product_type page alias
         cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click();
         cy.get('li.show > .dropdown-menu > :nth-child(2) > .sub_link').as('product_type_page').click();
         cy.get('#clearsform').as('Add_product_type_page_btn').click();
         cy.get('#btn_change_text').as('save_btn').click(); //save button
         cy.get('#btn > .material-icons').click() //cancel button
         //cy.fixture('download (25).jpg').as('fileToUpload');
    });
    // afterEach(()=>{
    //     cy.get('.w-30').click({force:true});
    //     cy.get('[href="https://qadarjs.quix365.com/en/admin/logout"]').click({force:true});
    // });
    it('Add_Product_parent_Type',()=>{
        cy.get('@select_product_dropdown').click()
        cy.get('@product_type_page').click()
        cy.get('@Add_product_type_page_btn').click()
        cy.product_type_form(); //call generic function
    });
    it.skip('Validations assertations', ()=>{
        cy.get('@select_product_dropdown').click()
        cy.get('@product_type_page').click()
        cy.get('@Add_product_type_page_btn').click()
        cy.get('input[type=file]')
        .selectFile('cypress/fixtures/download (25).jpg', { force: true })
        //cy.get('img[src="path-to-uploaded-image.jpg"]').should('exist');
        cy.get('@save_btn').click()
        cy.get(':nth-child(1) > .error').should('have.text', 'The name field is required.') // empty assertation
        cy.get('.__mandatory_aestrick_label').type('My_Parent_product_type') //duplicate name 
        cy.get('@save_btn').click()
        cy.get(':nth-child(1) > .error').should('have.text','The name has already been taken.') // duplicate name assertation
    });
    it.skip('delete/cancel_product type',()=>{
        cy.get('tbody > :nth-child(1) > :nth-child(6)')
        cy.get('a[title="Delete"]').first().click({ force: true }); // Click delete button
        cy.get('.cancel').contains('No, cancel please!').click();   //click on cancel button
        cy.get('a[title="Delete"]').first().click({ force: true }); // Click delete button
        cy.get('.sweet-alert').should('be.visible')
        .contains('Record will be permanently deleted.')
        cy.get('.confirm').contains('Yes, delete it!').click();
        cy.get('.sweet-alert').should('be.visible')
        .contains('Product Type has been deleted successfully.')
        cy.get('.confirm').click({ force: true }) // Click delete button
    });
    // it.only('Edit_product_type_an_create_subtype', ()=>{
    //     cy.get('tbody > :nth-child(1) > :nth-child(6)')
    //     cy.get('a[title="Edit"]').first().click({ force: true }); // Click delete button
    //     cy.get('#loopp').select('My_Parent_product_type').should('be.selected');//
    //});
    it('add product type associated it with subtype by edit button', ()=>{
        cy.get('@select_product_dropdown').click()
        cy.get('@product_type_page').click()
        cy.get('@Add_product_type_page_btn').click()
        cy.product_type_form(); //call generic function
        //edit 
        cy.get('tbody > :nth-child(1) > :nth-child(6)') //catch body 
        cy.get('a[title="Edit"]').first().click({ force: true }); // Click on edit button
        //cy.get('.__mandatory_aestrick_label')
        cy.get('#name').clear().type('product_subtype')
        cy.get('#loopp')
        .select('My_Parent_product_type', { force: true })
        //.invoke('val')
        //.should('eq', 'My_Parent_product_type')
        //cy.get(':nth-child(2) > .controls > label').click({force:true})
        //.select('My_Parent_product_type')//  select parent type
        cy.get('#btn_change_text').click();
        //cy.get('@save_btn').click()
    });
});