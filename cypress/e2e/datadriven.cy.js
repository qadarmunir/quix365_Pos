describe('data_driven', () => {
    it('DD_function', () => {
        cy.fixture('orangehrm1').then((Data_DD) => {
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
            
            Data_DD.forEach((userData) => {
                cy.get("input[placeholder='Username']").type(userData.Username);
                cy.get("input[placeholder='Password']").type(userData.Password);
                cy.get("button[type='submit']").click();

                if (userData.Username === 'Admin' && userData.Password === 'admin123') {
                    cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module").should('have.text', userData.expected);
                    cy.get(".oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon").click();
                    cy.get(':nth-child(4) > .oxd-userdropdown-link').click();
                } else {
                    cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should('have.text', userData.expected);
                }

                // Add a logout step here if necessary
            });
        });
    });
});
