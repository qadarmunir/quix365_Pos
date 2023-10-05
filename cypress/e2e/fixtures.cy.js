describe('Orangehrm_suit',()=>{
    //direct access fixtures
    // it.only('Login',()=>{
    //     cy.fixture('orangehrm.json').then((data)=>{

    //         cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //         cy.get("input[placeholder='Username']").type(data.Username);
    //         cy.get("input[placeholder='Password']").type(data.Password);
    //         cy.get("button[type='submit']").click()
    //         cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module").should('have.text', data.expected)

    //     })
       
    // })

    //access multiple hooks using before direct function
    let hrmdata;
    before(()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.fixture('orangehrm').then((data)=>{
            hrmdata =data;
        })
    })
     it('Login', ()=>{
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
            cy.get("input[placeholder='Username']").type(hrmdata.Username);
            cy.get("input[placeholder='Password']").type(hrmdata.Password);
            cy.get("button[type='submit']").click()
            cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module").should('have.text', hrmdata.expected)

    })
    
})