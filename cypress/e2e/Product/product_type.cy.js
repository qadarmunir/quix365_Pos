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
        cy.product_type_form().then((sweet_alert)=>{                   //call generic function
            if(sweet_alert)
            {
                cy.get('.sweet-alert').contains('Product Type has been Added successfully.')
                cy.get('.confirm').click()
            }
        })    
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
        cy.product_type_form().then((error_msg)=>{
            if(error_msg)
            {
                cy.get(':nth-child(1) > .error').should('have.text','The name has already been taken.')
                cy.get('#name').clear().type('product_subtype')
                cy.get('@save_btn').click()
                cy.get('.sweet-alert').contains('Product Type has been Added successfully.')
                cy.get('.confirm').click()
            }

        }); //call generic function
        //edit 
        cy.get('tbody > :nth-child(1) > :nth-child(6)') //catch body 
        cy.get('a[title="Edit"]').first().click({ force: true }); // Click on edit button
        cy.get('#loopp')
        .select('My_Parent_product_type', { force: true })

        cy.get('#btn_change_text').click();
        
    });
    it.only('Associate product type with product and verify', ()=>{
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
        cy.get('li.show > .dropdown-menu > :nth-child(1) > .sub_link').as('product_details_page').click()
        cy.get('.module-actions > .btn-primary').as('click_add_product_page').click()
        cy.fixture('addproduct').then((product_data)=>{
            // Generate a unique product name using a timestamp or random value
            const uniqueProductName = `Product ${Date.now()}`;
            // Generate a unique bar code using for loop
            const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let uniqueBarcode = '';
            
            for (let i = 0; i < 6; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              uniqueBarcode += characters.charAt(randomIndex);
            }
            
              
            // Check if the product name in the fixture is 'Product 12', and if so, update it.
            if (product_data.p_name === 'Product 12' && product_data.barcode==='123456789') {
                product_data.p_name = uniqueProductName; // Update the product name
    
                // Update other properties within DATA_2 as needed
                product_data.barcode = uniqueBarcode;
                product_data.supplier_code ;
                product_data.custom_field ;
                product_data.product_cost ;
            }
    
            // Add the product with the updated data.
            cy.Add_Products_DATA(
                product_data.p_name,
                product_data.barcode,
                product_data.supplier_code,
                product_data.custom_field,
                product_data.product_cost
            )   
            cy.get(':nth-child(4) > :nth-child(1) > :nth-child(2) > .select2 > .selection > .select2-selection > .select2-selection__rendered > .select2-search > .select2-search__field').click().type('product_subtype{enter}') //select product type
            cy.get(':nth-child(4) > :nth-child(1) > :nth-child(2) > .select2 > .selection > .select2-selection > .select2-selection__rendered').contains('product_subtype')
            cy.get('.button-group > .btn-primary').click() //save product
         cy.get('@select_product_dropdown').click()
         cy.get('@product_type_page').click()
         //edit
         cy.get('tbody > :nth-child(1) > :nth-child(6)') //catch body 
         cy.get('a[title="Edit"]').first().click({ force: true }); // Click on edit button
         cy.get('#assign_product_tab > .nav-link').click(); //open assigne product tab
         cy.get('#a_products > .whitebox-modal').contains(uniqueProductName)
         cy.get('#btn > .material-icons').click()// cacel sitting

        });
        
    });
});
