describe("Pos_sale_process_page",()=>{
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs ', 'g.qadar.qa@gmail.com', '12345678')
       // cy.get(generateUniqueCode).as('generate_Unique_Code')
    });
    // afterEach(()=>{
    //     cy.get('.w-30').click({force:true});
    //     cy.get('[href="https://qadarjs.quix365.com/en/admin/logout"]').click({force:true});
    // });    
    // it('verify that check is enabled on General page of all payment type ',()=>{
    //     cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(10) > a:nth-child(1) > i:nth-child(1)").click()
    //     cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(10) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1) > span:nth-child(1)").click()
    // });
    it('paymet throuh CASH method',()=>{
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
            cy.open_outlet_register() //call generic fuction 
            cy.visit('https://qadarjs.quix365.com/en/admin/process-sale',{timeout:100000})
            cy.get('#_search_the_product').type(uniqueProductName,'{timeout:3000}')
            cy.get('.selected_list_item')
            .contains(uniqueProductName) // Locate the specific item in the dropdown
            .click(); // Click on the found item  
           // cy.wait(3000) 
           cy.get('#btn_checkout').click()        
            cy.get(':nth-child(2) > #cash_button').click() // payment thriugh cash button
            cy.get('.sweet-alert').contains("You want to proceed payment through Cash !") // assertation 
            cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen')
            cy.get('.confirm').click({ force: true })
            .window()
            .its('open')
            .should('not.be.called');
          });
            //cy.get('#disable_gift_cart').click() // charge gift card button
            cy.get('.confirm').click({ force: true })
            cy.get('#newsale > .modal-dialog > .modal-content > .modal-header > .close > .material-icons').click() // cancel opening propmt
            cy.close_register() //call generic fuction     
        });
    });
    it('paymet throuh CARD method',()=>{
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
            cy.open_outlet_register() //call generic fuction 
            cy.visit('https://qadarjs.quix365.com/en/admin/process-sale',{timeout:100000})
            cy.get('#_search_the_product').type(uniqueProductName,'{timeout:3000}')
            cy.get('.selected_list_item')
            .contains(uniqueProductName) // Locate the specific item in the dropdown
            .click(); // Click on the found item  
            //cy.wait(3000)       
            cy.get('#btn_checkout').click()  
            cy.get(':nth-child(3) > #cash_button').click() // payment thriugh card button
            cy.get('.sweet-alert').contains("You want to proceed payment through Card !") // assertation  
            cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen')
            cy.get('.confirm').click({ force: true })
            .window()
            .its('open')
            .should('not.be.called');
          });
            //cy.get('#disable_gift_cart').click() // charge gift card button
            cy.get('.confirm').click({ force: true })
            cy.get('#newsale > .modal-dialog > .modal-content > .modal-header > .close > .material-icons').click() // cancel opening propmt
            cy.close_register() //call generic fuction     
        });
           
        
    });
    it.skip('practice', ()=>{
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
           // cy.go(-1)   
           cy.open_outlet_register() //call generic fuction 
           //cy.go()
           //cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").focus().trigger('mouseover').click({timeout:3000}) // open sale drop_down process
           // .focus()
           // .trigger('mouseover',{timeout:3000})
           // //.wait(1000)
           //.click({timeout:3000}) // open sale drop_down process
         //   
           cy.visit('https://qadarjs.quix365.com/en/admin/process-sale',{timeout:100000})
           cy.get('#_search_the_product').type(uniqueProductName,{timeout:3000})
           cy.get('.selected_list_item')
           .contains(uniqueProductName) // Locate the specific item in the dropdown
           .click(); // Click on the found item         
           cy.get('#btn_checkout').click()  
           cy.get(':nth-child(3) > #cash_button').click() // payment thriugh card button
           cy.get('.sweet-alert').contains("You want to proceed payment through Card !") // assertation  
           cy.window().then((win) => {
           cy.stub(win, 'open').as('windowOpen')
           cy.get('.confirm').click({ force: true })
           .window()
           .its('open')
           .should('not.be.called');
         });
           //cy.get('#disable_gift_cart').click() // charge gift card button
           cy.get('.confirm').click({ force: true })
           cy.get('#newsale > .modal-dialog > .modal-content > .modal-header > .close > .material-icons').click() // cancel opening propmt
           cy.close_register() //call generic fuction  
        });
    })
});