describe('Product_brand', ()=>{ 
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs ', 'g.qadar.qa@gmail.com', '12345678')
         //open product page
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
        cy.get('li.show > .dropdown-menu > :nth-child(3) > .sub_link').as('product_brand_page').click()
        cy.get('#clearsform').as('add_brand_btn').click()
        cy.get('#form_save > .modal-header > .close').click() //close button
    });
    afterEach(()=>{
        cy.get('.w-30').click({force:true});
        cy.get('[href="https://qadarjs.quix365.com/en/admin/logout"]').click({force:true});
    });
    it('Add_Product_brand', ()=>{
        cy.get('@select_product_dropdown').click()
        cy.get('@product_brand_page').click()
        cy.get('@add_brand_btn').click()

        cy.Add_product_Brand() //call generic function
        cy.wait(3000)
        cy.get('.sweet-alert').contains('Brand has been added successfully.')
        cy.get('.confirm').click()
    });
    it('verify Validations on brand page',()=>{
        cy.get('@select_product_dropdown').click()
        cy.get('@product_brand_page').click()
        cy.get('@add_brand_btn').click()

        cy.Add_product_Brand() //call generic function
        cy.get('.error').should('have.text','The brand name has already been taken.') // duplicate brand name assertation
        cy.get('#brand_name').clear() //without add name tag assertation
        cy.get('#btn_change_text').click() //save button
        cy.get('.error').should('have.text','The brand name field is required.') // duplicate brand name assertation
    });
    it('link product Tag with product', ()=>{
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
            cy.get('#select2-brand-container').click() //catch brand container
            cy.get('.select2-dropdown > .select2-search > .select2-search__field').click().type('mybrand{enter}') //select product brand
            cy.get('#select2-brand-container').contains('mybrand')
            //cy.get(':nth-child(5) > .select2 > .selection > .select2-selection > .select2-selection__rendered > .select2-search > .select2-search__field').click().type('myTag{enter}') //select product type
           // cy.get(':nth-child(5) > .select2 > .selection > .select2-selection > .select2-selection__rendered').contains('myTag')
           // cy.get('#select2-brand-container')
           // cy.get(':nth-child(4) > :nth-child(1) > :nth-child(2) > .select2 > .selection > .select2-selection > .select2-selection__rendered > .select2-search > .select2-search__field').click().type('product_subtype{enter}') //select product type
           // cy.get(':nth-child(4) > :nth-child(1) > :nth-child(2) > .select2 > .selection > .select2-selection > .select2-selection__rendered').contains('product_subtype')
           cy.get('.button-group > .btn-primary').click() //save product
        });   


    });
    it('verify  product is linked with Tag',()=>{
        //verify that tag is associated with product 
        cy.get('@select_product_dropdown').click()
        cy.get('@product_brand_page').click()
        // Confirm the existence of a table row with 'myTag' and '1'
        cy.get('tbody') // Assuming the table with class 'sorting_1'
           .find('tr') // Find all table rows in the tbody
           .each(($row) => { // Iterate through each row
               cy.wrap($row).find('td').eq(0).invoke('text').then((brandName) => {
                   if (brandName.trim() === 'mybrand') { // Check if the first cell contains 'myTag'
                       cy.wrap($row).find('td').eq(1).invoke('text').then((productValue) => {
                          expect(productValue.trim()).to.equal('1'); // Assert the associated product is '1'
                        });
                    }
               });
           });

    });
    it('Delete product', ()=>{
        cy.get('@select_product_dropdown').click()
        cy.get('@product_brand_page').click()
        // Confirm the existence of a table row with 'myTag' and '1'
        cy.get('tbody') // Assuming the table with class 'sorting_1'
           .find('tr') // Find all table rows in the tbody
           .each(($row) => { // Iterate through each row
               cy.wrap($row).find('td').eq(0).invoke('text').then((brandName) => {
                   if (brandName.trim() === 'mybrand') { // Check if the first cell contains 'myTag'
                      cy.wrap($row).find('td').eq(1).next('td').next('td').find('.action-slide a[title="Delete"]').as('delete_btn')            
                    }
               });
           });
        cy.get('@delete_btn').click(); // Click on the 'Delete' button
        cy.get('.sweet-alert').should('be.visible')
        .contains('Record will be permanently deleted.')
        cy.get('.confirm').contains('Yes, delete it!').click();
        cy.get('.sweet-alert').should('be.visible')
        .contains('Brand has been deleted successfully.')
        cy.get('.confirm').click({ force: true }) // Click delete button
    })

});