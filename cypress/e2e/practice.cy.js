//const { contains } = require("cypress/types/jquery");

describe('Add product testcases', ()=>{
    beforeEach(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs ', 'g.qadar.qa@gmail.com', '12345678')
        
         //open product page
    });
    it.skip('select date ',()=>{
        cy.get('body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)').click()
        
        cy.get('body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1) > span:nth-child(1)').click()
        cy.get('.module-actions > .btn').click() // add quotation module
        //cy.get('#expires_at').click() //expire date  
        const dateToSelect = '2023-10-28'; // Replace with your desired date
        cy.get('#expires_at').invoke('val', dateToSelect); // Use the .invoke() method to set the date value
        cy.get('#expires_at').should('have.value', dateToSelect);  // You can assert the value if needed
        // dropdown selector
        cy.get('#supplier_id').select('Demo Supplier 2').should('have.value', '2');
    });
    // it('Product_Type', ()=>{

    // });
    // it('Product_Brand', ()=>{

    // });
    // it('Product_Tag', ()=>{

    // });
    it('Add_Products_DATAaa',()=>{
        cy.get('.nav > :nth-child(3) > .dropdown-toggle').as('select_product_dropdown').click()
        cy.get('li.show > .dropdown-menu > :nth-child(1) > .sub_link').as('product_details_page').click()
        cy.get('.module-actions > .btn-primary').as('click_add_product_page').click()
         cy.get('.button-group > .btn-primary').as('save_product')
         cy.fixture('addproduct').then((d1)=>{
            cy.Add_Products_DATA(
                d1.p_name='pm123',
                d1.barcode,
                d1.supplier_code,
                d1.custom_field,
                d1.product_cost
            )
            cy.get('@save_product').click()
         })
        // cy.Add_Products_DATA()
        // cy.get('@save_product').click()
    });

});   