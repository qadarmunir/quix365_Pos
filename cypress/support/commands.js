// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add('Login' , (domain_name, email, password) =>{
//     cy.get(':nth-child(5) > .nav-link').click({ multiple: true },{timeout:5000}) //click on website
//     cy.get('#site_url').type(domain_name)
//     cy.get('#btnSubmit').click({timeout:8000})
//     cy.get('#check_url')
//     cy.get('#site_url_error_icon')
//     .then((url_found)=>{
//      if(url_found)
//         {   
//             cy.get('#email').type(email)
//             cy.get('#password').type(password)
//             cy.get('.btn').click({timeout:5000})
//         }
//         else
//         {
//             cy.get('#site_url').type("{enter}")
//             cy.get('#btnSubmit').click({timeout:8000})
//             cy.get('#email').type(email)
//             cy.get('#password').type(password)
//             cy.get('.btn').click({timeout:5000})
//         }

//     }) //login btn
// })
Cypress.Commands.add('Login', (domain_name, email, password) => {
   cy.get(':nth-child(5) > .nav-link').click({ multiple: true }) // Click on website
   cy.wait(3000)
   cy.get('#site_url').type(domain_name,{ timeout: 10000 });
   //cy.wait(3000)
   cy.get('#check_url').then(($ulr_found)=>{
    if($ulr_found)
    {
      cy.get('#btnSubmit').click({timeout: 10000 });
    }
    else{
        cy.get('#site_url').type(domain_name,{ timeout: 10000 });
        cy.get('#btnSubmit').click({timeout: 10000 });
    }
   })
   
   cy.get('#email').type(email);
   cy.get('#password').type(password);
   cy.get('.btn').click({timeout: 10000 });
});   

 Cypress.Commands.add('Add_Products_DATA', (p_name , barcode, supplier_code, custome_field , product_cost)=>{

    cy.get('.controls > .__mandatory_aestrick_label').type(p_name) //product name
    cy.get('.col-md-8 > :nth-child(1) > .pvr-box > .row > :nth-child(2) > .form-float > .controls > label').type(barcode) //barcode
    cy.get('.col-md-8 > :nth-child(1) > .pvr-box > .row > :nth-child(3) > .form-float > .controls > label').type(supplier_code) // supplier code
    cy.get(':nth-child(4) > .form-float > .controls > label').type(custome_field)
    cy.get('div.radio > :nth-child(1) > .option-input').check().should('have.value', '0')  // no variants selected
    cy.log(' Simple product, no variants ')

    cy.get('#chl_type').check().should('be.enabled') // show on POS check
    cy.get('.pvr-box > .row > :nth-child(1) > label').should('contain','Point Of Sale')
    cy.get('#clearform').click() // select outlet
     // cy.xpath("(//input[@name='outlet_ids[]'])[1]").check().should('be.enabled') // select outlet
     // cy.get('.col-6 > label').click()
     // cy.get('.col-6 > label').should('have.text', '\n                                        \n                                        Lhr Store\n') //
     
    cy.get("input[value='1'][name='outlet_ids[]']").should('be.enabled') //first outlet
    cy.get("input[value='2'][name='outlet_ids[]']").should('be.enabled') //2nd outlet
    cy.get('#sel_outlet').click() // save  sittings
    cy.get('.col-sm-12 > label > .option-input').check().should('be.enabled') // show on ecommerce checkbox
    //cy.get('.col-sm-12 > label').should('have.text', '\n  Ecommerce')
    cy.get(':nth-child(7) > .slider').click() //Enable Toggle show on The Top of the Ecommerce site
    cy.get(':nth-child(9) > .slider').click() // Enable Toggle For Track inventory of that product
    //fill Data of first form of first store
    cy.get('[data-outlet-id="1"] > :nth-child(1)').should('contain', 'Lhr Store')
    // cy.get('#current_stock0').type()
    // cy.get('#reorder_point0').type()
    // cy.get('#reorder_qty0').type()
    // Generate random numbers within the specified range
    const maxValue = 1000; // Define your maximum value
    let randomNum_current_order = Math.floor(Math.random() * maxValue) + 1;
    let randomNum_reorder_point = Math.floor(Math.random() * maxValue) + 1;
    let randomNumreorder_quantity = Math.floor(Math.random() * maxValue) + 1;
            
    // Ensure the generated values do not exceed the maximum value
    randomNum_current_order = Math.min(randomNum_current_order, maxValue);
    randomNum_reorder_point = Math.min(randomNum_reorder_point, maxValue);
    randomNumreorder_quantity = Math.min(randomNumreorder_quantity, maxValue);
            
    // Type the values into the input fields
    cy.get('#current_stock0').type(randomNum_current_order.toString(), { force: true }); // Write current stock
    cy.get('#reorder_point0').type(randomNum_reorder_point.toString(), { force: true }); // Reorder point
    cy.get('#reorder_qty0').type(randomNumreorder_quantity.toString(), { force: true }); // Reorder quantity
    if(randomNum_reorder_point >= randomNum_current_order);
        {
           [randomNum_reorder_point , randomNum_current_order] = [randomNum_current_order,randomNum_reorder_point] //swap the value
            //rewrite swap value
            cy.get('#current_stock0').type(randomNum_current_order.toString(),{force: true}) //write current stock
            cy.get('#reorder_point0').type(randomNum_reorder_point.toString(),{force: true}) //reorder point
        }

    //fill Data of first form of 2nd  store
    //cy.get('[data-outlet-id="2"] > :nth-child(1)').should('have.text','Karachi outlet')
    // Generate random numbers within the specified range
    let randomNum_current_order1 = Math.floor(Math.random() * maxValue) + 1;
    let randomNum_reorder_point1 = Math.floor(Math.random() * maxValue) + 1;
    let randomNumreorder_quantity1 = Math.floor(Math.random() * maxValue) + 1;
                
    // Ensure the generated values do not exceed the maximum value
    randomNum_current_order1 = Math.min(randomNum_current_order1, maxValue);
    randomNum_reorder_point1 = Math.min(randomNum_reorder_point1, maxValue);
    randomNumreorder_quantity1 = Math.min(randomNumreorder_quantity1, maxValue);
                
    // Type the values into the input fields
    cy.get('#current_stock1').type(randomNum_current_order1.toString(), { force: true }); // Write current stock
    cy.get('#reorder_point1').type(randomNum_reorder_point1.toString(), { force: true }); // Reorder point
    cy.get('#reorder_qty1').type(randomNumreorder_quantity1.toString(), { force: true }); // Reorder quantity
    if(randomNum_reorder_point1 >= randomNum_current_order1);
        {
            [randomNum_reorder_point1 , randomNum_current_order1] = [randomNum_current_order1,randomNum_reorder_point1] //swap the value
            //rewrite swap value
            cy.get('#current_stock1').type(randomNum_current_order1.toString(),{force: true}) //write current stock
            cy.get('#reorder_point1').type(randomNum_reorder_point1.toString(),{force: true}) //reorder point
        }
    // cy.get('#current_stock0').type()
    // cy.get('#reorder_point0').type()
    // cy.get('#reorder_qty0').type()

    cy.get('#your_cost').type(product_cost)
    //cy.get('.button-group > .btn-primary').click() //save sitting

});
Cypress.Commands.add('add_variants', ()=>{
  // Ensure that the radio button is selected and then click it
    cy.get('div.radio > :nth-child(2)').should('contain','product with variants')
    cy.get(':nth-child(2) > .option-input').check()
    cy. get('.button-group > .btn-primary').click() // save btn manullay
    //assertation
    cy.get('.sweet-alert').should('contain','Please add variant options!')
    cy.get('.confirm').click()
    cy.get('#showvarients').click() //add variants button
    cy.get('.col-sm-7 > .select2-container > .selection > .select2-selection > .select2-selection__rendered > .select2-search > .select2-search__field').type('Adult{enter}');
    //cy.get('.col-sm-7 > .select2-container > .selection > .select2-selection > .select2-selection__rendered > .select2-search > .select2-search__field').type(' Young{enter}');
    cy.get('#add_varients').click()
    cy.log('second variant could not be added by user')
    cy.get('#make_combinations').click() // sub_variant_save sitting
    cy. get('.button-group > .btn-primary').click() // save btn manullay
})
 Cypress.Commands.add('product_with_variant_fill_form', ()=>{
    cy.get('.col-md-9 > :nth-child(1) > .pvr-box > .row > :nth-child(3) > .form-float > .controls > label').type('123456789') //barcode
    // Generate a unique product cost (you can use a random value)
 
    const minBeforeDecimal = 10;  // Minimum value before the decimal point
    const maxBeforeDecimal = 999;  // Maximum value before the decimal point
    const minAfterDecimal = 0;    // Minimum value after the decimal point
    const maxAfterDecimal = 99;   // Maximum value after the decimal point
    const beforeDecimal = Math.floor(minBeforeDecimal + Math.random() * (maxBeforeDecimal - minBeforeDecimal + 1)); // Generate a random value before the decimal point
    const afterDecimal = (minAfterDecimal + Math.random() * (maxAfterDecimal - minAfterDecimal + 1)).toFixed(2);// Generate a random value after the decimal point with two decimal digits
    const uniqueProductCost = parseFloat(`${beforeDecimal}.${afterDecimal}`); 
    cy.get('#same_vari_price_cost').type(uniqueProductCost) //cost
            //cy.get(':nth-child(4) > td').type()
            const maxValue = 1000; // Define your maximum value

            // Generate random numbers within the specified range
            let randomNum_current_order = Math.floor(Math.random() * maxValue) + 1;
            let randomNum_reorder_point = Math.floor(Math.random() * maxValue) + 1;
            let randomNumreorder_quantity = Math.floor(Math.random() * maxValue) + 1;
            
            // Ensure the generated values do not exceed the maximum value
            randomNum_current_order = Math.min(randomNum_current_order, maxValue);
            randomNum_reorder_point = Math.min(randomNum_reorder_point, maxValue);
            randomNumreorder_quantity = Math.min(randomNumreorder_quantity, maxValue);
            
            // Type the values into the input fields
            cy.get('#vari_current_stock0').type(randomNum_current_order.toString(), { force: true }); // Write current stock
            cy.get('#vari_reorder_point0').type(randomNum_reorder_point.toString(), { force: true }); // Reorder point
            cy.get('#vari_reorder_qty0').type(randomNumreorder_quantity.toString(), { force: true }); // Reorder quantity
            if(randomNum_reorder_point >= randomNum_current_order);
            {
                [randomNum_reorder_point , randomNum_current_order] = [randomNum_current_order,randomNum_reorder_point] //swap the value
                //rewrite swap value
                cy.get('#vari_current_stock0').type(randomNum_current_order.toString(),{force: true}) //write current stock
                cy.get('#vari_reorder_point0').type(randomNum_reorder_point.toString(),{force: true}) //reorder point
            }
});
Cypress.Commands.add('product_type_form',()=>{
    cy.get('input[type=file]')
    .selectFile('cypress/fixtures/download (25).jpg', { force: true })
    //cy.get('img[src="path-to-uploaded-image.jpg"]').should('exist');
    cy.get('.__mandatory_aestrick_label').type('My_Parent_product_type')
    cy.get('@save_btn').click()
});
Cypress.Commands.add('DELETE_Product_TYPE',()=>{
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
Cypress.Commands.add('Add_product_Tag',()=>{
    cy.get('.__mandatory_aestrick_label').type('myTag')
    cy.get('#btn_change_text').click() //save button
})
Cypress.Commands.add('Add_product_Brand',()=>{
    cy.get('.__mandatory_aestrick_label').type('mybrand') //write nam ee of button
    cy.get('#btn_change_text').click() //save button
})
// commands.js
Cypress.Commands.add('open_sale_process_page', () => {
    cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").trigger('mouseover').click({timeout:3000}) // open sale drop_down process
    cy.get("div[class='sub-menu collapse show'] li:nth-child(1) a:nth-child(1) span:nth-child(1)").click({force:true}) // pos sale process page
    cy.get(".outlet_register_id.cash_register_box[data-register='1']").should('have.text','Cash Register 1').click({force:true}) //again open register   
  });
  Cypress.Commands.add('open_outlet_register', ()=>{  
    cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").trigger('mouseover').click({timeout:3000}) // open sale drop_down process page
    cy.wait(3000)
    cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").click({force:true}) // open register page
    //open outlet and register 
    cy.get('#myTab > :nth-child(1) > .nav-link').contains('Lhr Store')
    cy.get(".outlet_register_id.cash_register_box[data-register='1']").should('have.text','Cash Register 1').click({force:true})
    cy.get('.input-group > .form-control').clear().type('0')
    cy.get('.input-group-btn > .btn').click({force:true}) //open button
  })
  Cypress.Commands.add('open_outlet_register_sale_process_page', ()=>{  
    cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").trigger('mouseover').click({timeout:3000}) // open sale drop_down process
    cy.get("div[class='sub-menu collapse show'] li:nth-child(1) a:nth-child(1) span:nth-child(1)").click({force:true}) // pos sale process page
    //open outlet and register 
    cy.get('#myTab > :nth-child(1) > .nav-link').contains('Lhr Store')
    cy.get(".outlet_register_id.cash_register_box[data-register='1']").should('have.text','Cash Register 1').click({force:true})
    cy.get('#open_amount').type('0')
    cy.get('.horizontal-form > .input-group > .input-group-btn > .btn').click({force:true}) 
  })
  Cypress.Commands.add('close_register', ()=>{
    cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").trigger('mouseover').click({timeout:3000}) // open sale drop_down processq  p
    cy.wait(3000)
    cy.get("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").click({force:true}) // open register page
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
  })


  
  



  
