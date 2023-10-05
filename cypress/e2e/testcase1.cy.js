describe('Quix365_Login', ()=>{
  before ('Run_before_every_functions', ()=>{
    cy.visit('https://quix365.com/')
    cy.Login('qadarjs', 'qadar.q.a1+9@gmail.com','12345678')

  })
  
    it('verify_url',()=>{
      cy.url().should('include', 'en/admin/dashboard')
    })
    
    

  })