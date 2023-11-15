describe('Gift_card',()=>{
    let generateUniqueCode = Math.floor(Math.random() * 1000000000) + 1;
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs ', 'g.qadar.qa@gmail.com', '12345678')
         //open product page
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
        cy.get(generateUniqueCode).as('generate_Unique_Code')
    });
    // afterEach(()=>{
    //     cy.get('.w-30').click({force:true});
    //     cy.get('[href="https://qadarjs.quix365.com/en/admin/logout"]').click({force:true});
    // });
    it('open_outlet(register) and verify that gift card is shown on "sale process page"', ()=>{
        cy.get('li.show > .dropdown-menu > :nth-child(5) > .sub_link').click() // gift_card button
        cy.get('.col-sm-4 > .btn').should('have.text','Activate Gift Cards').click() // activate button of gift_card
        cy.get('.sweet-alert').contains('Activate gift card feature?')
        //cy.wait(5000)
        cy.get('.confirm').click({timeout: 5000})
        cy.log('Activate gift card feature is enabled')
    })
    it('sale_process' , ()=>{
        //cy.get(':nth-child(3) > .collapsed > .icons').click()
       cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").trigger('mouseover').click({timeout:3000}) // open sale drop_down process
       
       cy.wait(3000)
       //cy.get("body > div:nth-child(3)( > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1) > span:nth-child(1)").click({force:true}) // open register
       cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").click({force:true}) // open register page
       
       //open outlet and register 
       cy.get('#myTab > :nth-child(1) > .nav-link').contains('Lhr Store')
       cy.get(".outlet_register_id.cash_register_box[data-register='1']").should('have.text','Cash Register 1').click({force:true})
       cy.get('.input-group > .form-control').clear().type('0')
       cy.get('.input-group-btn > .btn').click({force:true}) //open button
       
       //close register
       cy.get('#close_register').click() //close register button
       cy.get('.sweet-alert').contains("Just a reminder... If any discrepancies, don't forget to adjust actual counted box before closing the register.")
       cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
       });
       cy.get("body > div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button")
       .click({ force: true })
       .window()
       .its('open')
       .should('not.be.called');
       cy.reload();
       cy.go(-2)

       //sale process page (add card)
       cy.get("div[class='sub-menu collapse show'] li:nth-child(1) a:nth-child(1) span:nth-child(1)").click({force:true}) // pos sale process page 
              
    });
    it('add gift card', ()=>{
        cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").trigger('mouseover').click({timeout:3000}) // open sale drop_down process
        cy.get("div[class='sub-menu collapse show'] li:nth-child(1) a:nth-child(1) span:nth-child(1)").click({force:true}) // pos sale process page 
        cy.get('#enableDivbuttons > .btn-default').click() // add gift card button
        cy.get('.modal-body > .whitebox-modal').contains('Gift Card Number')
        //let gift_card_number = 123456789
        //let generateUniqueCode = Math.floor(Math.random() * 1000000000) + 1;
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

        cy.get('#btn_checkout').click() //add checkout button
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
        cy.go(-1)
    })
    it('open gift card and verify created card',()=>{
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
        cy.get('li.show > .dropdown-menu > :nth-child(5) > .sub_link').click() // gift_card button
             // Click on the <a> element with the specified data-id
        cy.get('a.gift_card')
        .contains(generateUniqueCode.toString()) // Assuming generateUniqueCode is the text content
        .click();

    })
    it('buy product with gift card', ()=>{
        //add product
        cy.get('@select_product_dropdown').should('be.visible').click({ force: true }); 
        cy.get('@product_details_page').should('be.visible').click({ force: true }); 
        cy.get('.module-actions > .btn-primary').as('click_add_product_page').click();
        cy.get('.button-group > .btn-primary').as('save_product').click();
    
        //  Load data from the 'addproduct' fixture file and add a product.
        cy.fixture('addproduct').then((DATA_2) => {
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
            if (DATA_2.p_name === 'Product 12' && DATA_2.barcode==='123456789') {
                DATA_2.p_name = uniqueProductName; // Update the product name
    
                // Update other properties within DATA_2 as needed
                DATA_2.barcode = uniqueBarcode;
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
    })


});