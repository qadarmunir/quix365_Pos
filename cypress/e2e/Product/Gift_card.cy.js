describe('Gift_card',()=>{
    let generateUniqueCode = Math.floor(Math.random() * 1000000000) + 1;
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs ', 'g.qadar.qa@gmail.com', '12345678')
         //open product page
        cy.get(generateUniqueCode).as('generate_Unique_Code')
    });
    afterEach(()=>{
        cy.get('.w-30').click({force:true});
        cy.get('[href="https://qadarjs.quix365.com/en/admin/logout"]').click({force:true});
    });
    it('acivate gift card', ()=>{
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').click() //product_module
        cy.get('li.show > .dropdown-menu > :nth-child(5) > .sub_link').click() // gift_card button
        cy.get('.col-sm-4 > .btn').should('have.text','Activate Gift Cards').click() // activate button of gift_card
        cy.get('.sweet-alert').contains('Activate gift card feature?')
        cy.wait(3000)
        cy.get('.confirm').click()
        cy.log('Activate gift card feature is enabled')
    })
    it('Open register  through sale_process module' , ()=>{
      cy.open_outlet_register() //call generic fuction

      cy.close_register() //call generic fuction
              
    });
    it('purchase (buy) gift card through procress sale page ', ()=>{
        cy.open_outlet_register_sale_process_page() //call generic fuction

        cy.get('#enableDivbuttons > .btn-default').click() // add gift card button
        cy.get('.modal-body > .whitebox-modal').contains('Gift Card Number')
        cy.get('#card_number').type('123')
        cy.get('#create_new_gift_card_num').click({timeout:3000})
        cy.get('.sweet-alert').contains("Enter gift card number must be at least 4 digits") // assertation
        cy.get('.confirm').click()

        cy.get('#card_number').clear().type(generateUniqueCode)
        cy.get('.modal-body > .whitebox-modal').contains('Enter Amount')
        cy.get('#amountORbalance_input').type('000') 
        cy.get('#giftcard_to_cart').click() //add button
        cy.get('.sweet-alert').contains("Enter Valid Amount :") // assertation
        cy.get('.confirm').click()

        cy.get('#amountORbalance_input').type('3000')
        cy.get('#giftcard_to_cart').click() //add button 

          //add checkout button
        cy.get('#btn_checkout').click() 
        cy.get(':nth-child(2) > #cash_button').click() // payment thriugh cash button
        cy.get('.sweet-alert').contains("You want to proceed payment through Cash !") // assertation
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen');
           });
           cy.get('.confirm').click({ force: true })
           .window()
           .its('open')
           .should('not.be.called');
           cy.get('.confirm').click({ force: true })
        cy.get('#newsale > .modal-dialog > .modal-content > .modal-header > .close > .material-icons').click() // cancel opening propmt
        cy.close_register() //call generic fuction
    })
    it('Buy product through gift card', ()=>{
        //add product
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').click()
        cy.get('li.show > .dropdown-menu > :nth-child(1) > .sub_link').click()
        cy.get('.module-actions > .btn-primary').click()
         //  Load data from the 'addproduct' fixture file and add a product.
        cy.fixture('addproduct').then((DATA_2) => {
            const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let uniqueProductName = '';
             // Generate a unique product name using for loop
            for (let i = 0; i < 6; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              uniqueProductName += characters.charAt(randomIndex);
            }
            let uniqueBarcode = '';
            // Generate a unique bar code using for loop
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                uniqueBarcode += characters.charAt(randomIndex);
              }
            
              
            // // Check if the product name in the fixture is 'Product 12', and if so, update it.
            // if (DATA_2.p_name === 'Product 12' && DATA_2.barcode==='123456789') {
            //     DATA_2.p_name = uniqueProductName; // Update the product name
    
            //     // Update other properties within DATA_2 as needed
            //     DATA_2.barcode = uniqueBarcode;
            //     DATA_2.supplier_code ;
            //     DATA_2.custom_field ;
            //     DATA_2.product_cost ;
            // } 
                        // Add the product with the updated data.
            cy.Add_Products_DATA(
                DATA_2.p_name=uniqueProductName,
                DATA_2.barcode=uniqueBarcode,
                DATA_2.supplier_code,
                DATA_2.custom_field,
                DATA_2.product_cost
            );
            cy.get('.button-group > .btn-primary').click({timeout:3000}); //  Save the product.
            cy.wait(3000)
             //generic function
            //cy.open_sale_process_page()
            cy.go(-1)
            cy.open_outlet_register_sale_process_page() //call generic fuction  
            cy.wait(3000)
            cy.get('#_search_the_product').type(uniqueProductName,'{timeout:3000}')
            cy.get('.selected_list_item')
            .contains(uniqueProductName) // Locate the specific item in the dropdown
            .click(); // Click on the found item  
            cy.wait(3000)       
            cy.get('#btn_checkout').click() 
            cy.get(':nth-child(7) > .col-md-9 > .row > :nth-child(4) > .btn').click() //payment through gift_card
            cy.get('.col-sm-9 > .form-float > .controls > label').type('1234')
            cy.get('#div_gift_card_number').contains('Enter Valid Gift Card number')// assertation
            cy.get('#gift_card_number').clear().type(generateUniqueCode)
            cy.get('#disable_gift_cart').click() // chagre gift card button
            //cy.get(':nth-child(2) > #cash_button').click() // payment thriugh cash button
            //cy.get('.sweet-alert').contains("You want to proceed payment through Cash !") // assertation
            cy.get('.sweet-alert').contains("You want to proceed payment through Gift Card !") // assertation  
            cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen')
            cy.get('.confirm').click({ force: true })
            .window()
            .its('open')
            .should('not.be.called');
          });
            cy.get('#disable_gift_cart').click() // charge gift card button
            cy.get('.confirm').click({ force: true })
            cy.get('#newsale > .modal-dialog > .modal-content > .modal-header > .close > .material-icons').click() // cancel opening propmt
            cy.close_register() //call generic fuction     
        });
    })
    it('open gift card page and verify payment is dedicted through this g_card',()=>{
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
        cy.get('li.show > .dropdown-menu > :nth-child(5) > .sub_link').click() // gift_card button
        cy.get('#data-table_length > label > .form-control').select('100').should('have.value', '100');
             // Click on the <a> element with the specified data-id
        cy.get('a.gift_card')
        .contains(generateUniqueCode.toString()) // Assuming generateUniqueCode is the text content
        .click();
        // gift card details page cancellation button
        cy.get('#gift_card_history > .modal-dialog > .modal-content > .modal-header > .close').click();
   });
   it('deactivate gift card module and verify button  on sale process page',()=>{
    cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
    cy.get('li.show > .dropdown-menu > :nth-child(5) > .sub_link').click() // gift_card button
    //deactivate gift card button
    cy.get('.col-sm-6 > .counter_active').click();
    cy.get('.sweet-alert').contains('Once deactivate, new gift cards cannot be sold and already sold gift cards cannot be redeemed.')
    cy.wait(2000) 
    cy.get('.confirm').focus().click({ force: true })
    cy.open_sale_process_page() // call generic function
    cy.log('there is no gift card button')
  });
  // it('test',() => {
  //   cy.open_outlet_register_sale_process_page() //call generic fuction  
  // })
})