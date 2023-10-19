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
Cypress.Commands.add('Login' , (domain_name, email, password) =>{
    cy.get(':nth-child(5) > .nav-link').click({ multiple: true },{timeout:5000}) //click on website
    cy.get('#site_url').type(domain_name, {timeout:8000},'{enter}')
    cy.wait(7000)
    cy.get('#btnSubmit').click({timeout:8000}) //login btn
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('.btn').click({timeout:5000})

})

// Cypress.Commands.add('Login' , () =>{
//     cy.get(':nth-child(5) > .nav-link').click({timeout:5000}) //click on website
//     cy.get('#site_url').type('qadarjs')
//     cy.wait(3000)
//     cy.get('#btnSubmit').click({timeout:5000}) //login btn
//     cy.get('#email').type('qadar.q.a1+9@gmail.com')
//     cy.get('#password').type('12345678')
//     cy.get('.btn').click({timeout:5000})

// })
Cypress.Commands.add('Add_Products_DATA', (p_name , barcode, supplier_code, custome_field , product_cost)=>{

    cy.get('.controls > .__mandatory_aestrick_label').type(p_name) //product name
    cy.get('.col-md-8 > :nth-child(1) > .pvr-box > .row > :nth-child(2) > .form-float > .controls > label').type(barcode) //barcode
    cy.get('.col-md-8 > :nth-child(1) > .pvr-box > .row > :nth-child(3) > .form-float > .controls > label').type(supplier_code) // supplier code
    cy.get(':nth-child(4) > .form-float > .controls > label').type(custome_field)
    cy.get('div.radio > :nth-child(1) > .option-input').check().should('have.value', '0')  // no variants selected
    cy.log(' Simple product, no variants ')

    cy.get('#chl_type').check().should('be.enabled') // show on POS check
    cy.get('.pvr-box > .row > :nth-child(1) > label').should('have.text', '\n                                Point Of Sale')
    cy.get('#clearform').click() // select outlet
     // cy.xpath("(//input[@name='outlet_ids[]'])[1]").check().should('be.enabled') // select outlet
    cy.get('.col-6 > label').click()
   // cy.get('.col-6 > label').should('have.text', '\n                                        \n                                        Lhr Store\n') //
    cy.get('#sel_outlet').click() // save  sittings
    cy.get('.col-sm-12 > label > .option-input').check().should('be.enabled') // show on ecommerce checkbox
    //cy.get('.col-sm-12 > label').should('have.text', '\n  Ecommerce')
    cy.get(':nth-child(7) > .slider').click()
    cy.get(':nth-child(9) > .slider').click()
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
