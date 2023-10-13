describe('Add product testcases', ()=>{
    //global variables
    let select_product_dropdown ;
    let product_details_page ;
    let  click_add_product_page ;
    let save_product;
    before(()=>{
        cy.visit('https://quix365.com/')
        cy.Login('qadarps', 'qadar.q.a1+8@gmail.com', '12345678')
        //open product page
        select_product_dropdown =cy.get('.nav > :nth-child(3) > .dropdown-toggle').click();
        product_details_page =cy.get('li.show > .dropdown-menu > :nth-child(1) > .sub_link').click()
        click_add_product_page=cy.get('.module-actions > .btn-primary').click()
        save_product=cy.get('.button-group > .btn-primary').click()
    });
    it('Add_product_page_validation', ()=>{
        cy.select_product_dropdown
        cy.product_details_page
        cy.click_add_product_page
        cy.save_product
        cy.get('#error_product_name').should('have.text', '*Please enter a product name.')
        .then((error_msg_of_product)=>{
            if (error_msg_of_product)
             {
                cy.fixture('addproduct').then((DATA_1)=>{
                   const white_space = ' ';
                    DATA_1.p_name= 'ABC';
                    cy.Add_Products_DATA(
                        DATA_1.p_name,
                        DATA_1.barcode,
                        DATA_1.supplier_code,
                        DATA_1.custom_field,
                        DATA_1.product_cost= white_space
                    )
                    cy.save_product
                    cy.get('#single_cost_error').should('have.text', '*Please enter your cost.')
                    DATA_1.product_cost= '0'
                    cy.Add_Products_DATA(
                        DATA_1.p_name,
                        DATA_1.barcode,
                        DATA_1.supplier_code,
                        DATA_1.custom_field,
                        DATA_1.product_cost
                    )
                    cy.get('#single_cost_error').should('have.text','*Your cost must be greater than 0.')
                    cy.save_product

                });
            }
        });

    });

    // it('add_simple_product_testcase',()=>{
    //     cy.select_product_dropdown
    //     cy.product_details_page
    //     cy.click_add_product_page

    //     cy.fixture('addproduct').then((DATA)=>{
    //          // Generate a unique product name using a timestamp or random value
    //          const uniqueProductName = `Product ${Date.now()}`;
    //             // Generate a unique product cost (you can use a random value)
    //          const uniqueProductCost = 10 + Math.random() * 10;

    //         cy.Add_Products_DATA(
    //             DATA.p_name ,
    //             DATA.barcode,
    //             DATA.supplier_code,
    //             DATA.custom_field,
    //             DATA.product_cost
    //         )
    //          //condition about product if it  is already exist.
    //     if(DATA.p_name=='Product 11' && DATA.product_cost==' ')
    //         {
    //             cy.get('#error_product_name').should('have.text', 'The product name has already been taken.')
    //             cy.get('#your_cost').should('have.text', '*Please enter your cost.')

            //     Data.p_name = uniqueProductName; // Update the product name
            //    Data.product_cost = uniqueProductCost;    // Modify the product cost

            //     DATA.forEach((DATA_CHANGE)=>{
            //         DATA_CHANGE.p_name= uniqueProductName;
            //         DATA_CHANGE.product_cost = uniqueProductCost;

            //     })
            }
        });
    });

    it.skip('Cancel_Delete_product', ()=>{
            cy.get('.nav > :nth-child(3) > .dropdown-toggle').click()     // click on products dropdown
            cy.get('li.show > .dropdown-menu > :nth-child(1) > .sub_link').click({timeout:5000})   // select product drop
            cy.get(':nth-child(2) > :nth-child(8) > .dropdown > .dropdown-toggle > .material-icons').click()
            cy.get('#Product-WygqPGELd3Mb698jZX1n > .btn').click()
            cy.get('p[style="display: block;"]').should('have.text', 'Record will be permanently deleted.')
            cy.get('.cancel').click()
            cy.get('p[style="display: block;"]').should('have.text', 'Your record has not been deleted  ')
            cy.get('.confirm').click()


    });
    it.skip('Delete_Product', ()=>{
            cy.get('.nav > :nth-child(3) > .dropdown-toggle').click()     // click on products dropdown
            cy.get('li.show > .dropdown-menu > :nth-child(1) > .sub_link').click({timeout:5000})   // select product drop
            cy.get(':nth-child(2) > :nth-child(8) > .dropdown > .dropdown-toggle > .material-icons').click()
            cy.get('#Product-WygqPGELd3Mb698jZX1n > .btn').click()
            cy.get('p[style="display: block;"]').should('have.text', 'Record will be permanently deleted.')
            cy.get('.confirm').click({timeout:5000})
            cy.get('p[style="display: block;"]').should('have.text','Products has been deleted successfully.' )
            cy.get('.confirm').click()
    });
    it.skip('Product_With_Variant' , ()=>{

        cy.fixture('addproduct').then((DATA1)=>{
            

        });
    });
});