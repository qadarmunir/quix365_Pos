//const { it } = require("mocha");

//const { beforeEach } = require("mocha");

//const { contains } = require("cypress/types/jquery");

//const { contains } = require("cypress/types/jquery");

//const { beforeEach } = require("mocha");

describe('Add product testcases', ()=>{
    //global variables
    // let select_product_dropdown ;
    // let product_details_page ;
    // let  click_add_product_page ;
    // let save_product;
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarps ', 'g.qadar.qa@gmail.com', '12345678')
         //open product page
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
        cy.get('li.show > .dropdown-menu > :nth-child(1) > .sub_link').as('product_details_page').click()
        // cy.get('.module-actions > .btn-primary').as('click_add_product_page')
        // cy.get('.button-group > .btn-primary').as('save_product')
    });
    afterEach(()=>{
        cy.get('.w-30').click({force:true});
        cy.get('[href="https://qadarps.quix365.com/en/admin/logout"]').click({force:true});
    });
    // it.skip('add_simple_product',()=>{
    //     cy.select_product_dropdown
    //     cy.product_details_page
    //     cy.click_add_product_page
    //     cy.fixture('addproduct').then((DATA_0) => {
    //         cy.Add_Products_DATA(
    //             DATA_0.p_name,
    //             DATA_0.barcode,
    //             DATA_0.supplier_code,
    //             DATA_0.custom_field,
    //             DATA_0.product_cost
    //         );
    //     });
    //  cy.get('.button-group > .btn-primary').click()  //save_product
    
    // });
    it('add_simple_product_with_no_variant_unique_name', () => {
        //open product page by using alias
        cy.get('@select_product_dropdown').should('be.visible').click({ force: true }); 
        cy.get('@product_details_page').should('be.visible').click({ force: true }); 
        cy.get('.module-actions > .btn-primary').as('click_add_product_page').click();
        cy.get('.button-group > .btn-primary').as('save_product').click();
    
        //  Load data from the 'addproduct' fixture file and add a product.
        cy.fixture('addproduct').then((DATA_2) => {
            // Generate a unique product name using a timestamp or random value
            const uniqueProductName = `Product ${Date.now()}`;
        //     // Generate a unique product cost (you can use a random value)
            
        //     const minBeforeDecimal = 10;  // Minimum value before the decimal point
        //     const maxBeforeDecimal = 9999;  // Maximum value before the decimal point
        //     const minAfterDecimal = 0;    // Minimum value after the decimal point
        //     const maxAfterDecimal = 99;   // Maximum value after the decimal point

        //     // Generate a random value before the decimal point
        //     const beforeDecimal = Math.floor(minBeforeDecimal + Math.random() * (maxBeforeDecimal - minBeforeDecimal + 1));

        //     // Generate a random value after the decimal point with two decimal digits
        //     const afterDecimal = (minAfterDecimal + Math.random() * (maxAfterDecimal - minAfterDecimal + 1)).toFixed(2);

        //    // Combine both parts to get the desired value
        //    const uniqueProductCost = parseFloat(`${beforeDecimal}.${afterDecimal}`);

    
            // Check if the product name in the fixture is 'Product 12', and if so, update it.
            if (DATA_2.p_name === 'Product 12') {
                DATA_2.p_name = uniqueProductName; // Update the product name
    
                // Update other properties within DATA_2 as needed
                DATA_2.barcode = 'new_barcode_value';
                DATA_2.supplier_code ;
                DATA_2.custom_field ;
                DATA_2.product_cost ;
            }
    
            // Add the product with the updated data.
            cy.Add_Products_DATA(
                DATA_2.p_name,
                DATA_2.barcode,
                DATA_2.supplier_code,
                DATA_2.custom_field,
                DATA_2.product_cost
            );
    
            //  Save the product.
        cy.get('@save_product').click();
            // Optionally, you can add assertions for successful product creation here.
        });
    });
    
    it('Add_product_page_validation', ()=>{
        //open product page by using alias
        cy.get('@select_product_dropdown').should('be.visible').click({ force: true }); 
        cy.get('@product_details_page').should('be.visible').click({ force: true });  
        cy.get('.module-actions > .btn-primary').as('click_add_product_page').click();
        cy.get('.button-group > .btn-primary').as('save_product').click();
        cy.get('#error_product_name').should('have.text', '*Please enter a product name.')   // product_without_name assertation
        .then((error_msg_of_product)=>{
            if (error_msg_of_product)
              {
                cy.fixture('addproduct').then((DATA_1)=>{
                   const white_space = ' ';  //create new variable tu put space in cost field
                    DATA_1.p_name= 'ABC';
                    cy.Add_Products_DATA(
                        DATA_1.p_name,
                        DATA_1.barcode,
                        DATA_1.supplier_code,          
                        DATA_1.custom_field,
                        DATA_1.product_cost= white_space
                    )
                    //save_product
                    cy.get('@save_product').click()
                    cy.get('#single_cost_error').should('have.text', '*Please enter your cost.')
                   
                    cy.reload();  // Refresh the page
                    DATA_1.product_cost= '0'
                    cy.Add_Products_DATA(
                        DATA_1.p_name,
                        DATA_1.barcode,
                        DATA_1.supplier_code,
                        DATA_1.custom_field,        //price zero assertation
                        DATA_1.product_cost
                    )

                    //save_product
                    cy.get('@save_product').click()
                    cy.get('#single_cost_error').should('have.text','*Your cost must be greater than 0.')
                    
                    cy.reload(); // Refresh the page
                    cy.Add_Products_DATA(
                        DATA_1.p_name='product 12',
                        DATA_1.product_cost= '20',          //duplicate name assertation
                        DATA_1.barcode,
                        DATA_1.supplier_code,
                        DATA_1.custom_field,
                        DATA_1.product_cost
                    )
                    //cy.save_product
                    cy.get('@save_product').click()
                    cy.get('#error_product_name').should('have.text','The product name has already been taken.')

                });
            }
        });

    });

    it('Cancel_Delete_product', () => {    
        //open product page by using alias
        cy.get('@select_product_dropdown').should('be.visible').click({ force: true }); 
        cy.get('@product_details_page').should('be.visible').click({ force: true });

         // Click the delete button for the specific product and confirm the deletion.
         cy.get(':nth-child(2) > :nth-child(8) > .dropdown > .dropdown-toggle > .material-icons').click();
         cy.get('a[title="Delete"]').first().click({ force: true }); // Click delete button
         cy.get('.cancel').contains('No, cancel please!').click();
         cy.get('.sweet-alert').should('be.visible');
         cy.get('.confirm').click({ force: true }) // Click confirm button
         cy.get('.sweet-alert').should('contain','OK').click({ force: true });  // You can add this line if needed.
      });
      
    
    it('Delete_Product', () => {
        //open product page by using alias
        cy.get('@select_product_dropdown').should('be.visible').click({ force: true }); 
        cy.get('@product_details_page').should('be.visible').click({ force: true });
    
        // Click the delete button for the specific product and confirm the deletion.
        cy.get(':nth-child(2) > :nth-child(8) > .dropdown > .dropdown-toggle > .material-icons').click();
        cy.get('a[title="Delete"]').first().click({ force: true }); // Click delete button
        cy.get('.confirm').contains('Yes, delete it!').click();
        cy.get('.sweet-alert').should('be.visible');
        cy.get('.confirm').click({ force: true }) // Click delete button
        cy.get('.sweet-alert').should('contain','OK').click({ force: true });  // You can add this line if needed.  
      });
    it('add_product_with variants', ()=>{

        //open product page by using alias
        cy.get('@select_product_dropdown').should('be.visible').click({ force: true }); 
        cy.get('@product_details_page').should('be.visible').click({ force: true }); 
        cy.get('.module-actions > .btn-primary').as('click_add_product_page').click();
        cy.get('.button-group > .btn-primary').as('save_product').click();
       
        cy.get('#error_product_name').should('have.text', '*Please enter a product name.')   // product_without_name assertation
        cy.fixture('addproduct').then((DATA_3)=>{
         cy.Add_Products_DATA(
            DATA_3.p_name,
            DATA_3.barcode,
            DATA_3.supplier_code,          
            DATA_3.custom_field,
            DATA_3.product_cost
            )
            cy.add_variants() //generic func that click on checkbox and fill form of product variant data

               //1st variant assertation
            cy.get('#variants_validation_error0').should('have.text', '*Please enter your cost.')
            cy.get('.button-group > .btn-primary').click() // save btn manullay
            cy.get('#varient_your_cost0').type('0')
            cy. get('@save_product').click() // save btn manullay 
               
            cy.get('#variants_validation_error0').should('have.text', '*Your cost must be greater than 0.')
            cy.get('#varient_your_cost0').type('20')
            cy. get('@save_product').click() // save btn manullay 

            // //2nd variant assertations
            // cy.get('#variants_validation_error1').should('have.text', '*Please enter your cost.')
            // cy. get('@save_product').click() // save btn manullay
            // cy.get('#varient_your_cost1').type('0')
            // cy.get('.button-group > .btn-primary').click()// save btn manullay 
            // cy.get('#variants_validation_error1').should('have.text', '*Your cost must be greater than 0.')
            // cy.get('#varient_your_cost1').type('30')
            // cy. get('@save_product').click() // save btn manullay

            //duplicate product name error and again fill form
            cy.get('#error_product_name').should('have.text','The product name has already been taken.')
            cy.get('#product_name').clear();
            const uniqueProductName = `Product ${Date.now()}`;
            cy.get('#product_name').type(uniqueProductName);
            cy.add_variants({setTimeout:5000});//generic func that click on checkbox and fill form of product variant data

            //form open 1st variant
            cy.get(':nth-child(2) > td > span > #clearform').focus().click({force: true}, {timeout:3000})
            cy.get('.border').should('contain','Inventory tracking is off')
            .then((inventory_enable_btn)=>{
                if(inventory_enable_btn);
                {
                    cy.get('#variant_info > .modal-dialog > .modal-content > .modal-header > .close > .material-icons').click()
                    cy.get(':nth-child(9) > .slider').click();
                }
            });
         cy.get(':nth-child(2) > td > span > #clearform').focus().click({force: true}, {timeout:3000}) //after assertation  again open child variant
         cy.product_with_variant_fill_form() // call gereric function to fill separate form of product variant 
         cy.get('#variant_info > .modal-dialog > .modal-content > .modal-header > .btn').click({force:true}) // save variant info                 

        //        //form open 2nd variant
        //  cy.wait(5000)
        //  cy.get(':nth-child(4) > td > span > #clearform').focus().click({force: true}, {timeout:3000}) //click on 2nd child
        //  cy.product_with_variant_fill_form() // call generic function
        //  cy.get('#variant_info > .modal-dialog > .modal-content > .modal-header > .btn').click({force:true}) // save variant info 
         cy.get('#update_product_button').click({force:true}) // update profile button
        });
    
    });
    it('Delete variant_of product', ()=>{
        //open product page by using alias
        cy.get('@select_product_dropdown').should('be.visible').click({ force: true }); 
        cy.get('@product_details_page').should('be.visible').click({ force: true }); 
        cy.get('.module-actions > .btn-primary').as('click_add_product_page').click();

        const uniqueProductName = `Product ${Date.now()}`;
        cy.get('#product_name').type(uniqueProductName,{ force: true });
        cy.add_variants({setTimeout:5000});//generic func that click on checkbox and fill form of product variant data

         //form open 1st variant
        cy.get(':nth-child(2) > td > span > #clearform').focus().click({force: true}, {timeout:3000})
        cy.get('.border').should('contain','Inventory tracking is off')
            .then((inventory_enable_btn)=>{
                if(inventory_enable_btn);
                {
                    cy.get('#variant_info > .modal-dialog > .modal-content > .modal-header > .close > .material-icons').click()
                    cy.get(':nth-child(9) > .slider').click();
                }
            });
         cy.get(':nth-child(2) > td > span > #clearform').focus().click({force: true}, {timeout:3000}) //after assertation  again open child variant
         cy.product_with_variant_fill_form() // call gereric function to fill separate form of product variant 
         cy.get('#variant_info > .modal-dialog > .modal-content > .modal-header > .btn').click({force:true}) // save variant info 
         cy.get('#update_product_button').click({force:true}) // update profile button ...main page 
         cy.get(':nth-child(1) > :nth-child(8) > .dropdown > .dropdown-toggle > .material-icons').click()  //click delete and edit option
         cy.get(':nth-child(1) > :nth-child(8) > .dropdown > .dropdown-menu > :nth-child(1) > .btn > .fa').click()
         //cy.get(':nth-child(2) > td > span > #clearform')
         cy.get('td > #clearform').focus().click({force: true}, {timeout:3000}) //after assertation  again open child variant
         cy.get('#del_variant').click({force: true}, {timeout:3000}) //delete variant
         cy.get('#update_product_button').click({force: true}, {timeout:3000}) //update main product after delete variant
         //cy.get('.sweet-alert').should('have.text', 'Please add variant options!')
         //cy.get('.confirm').click({force: true});
         cy.get('.button-group > .btn-default').click({force: true});
    });
});
