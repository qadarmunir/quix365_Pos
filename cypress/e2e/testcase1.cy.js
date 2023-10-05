describe('Quix365_Login', ()=>{
  
    it('Login_test case',()=>{
      cy.visit('https://quix365.com/')
      cy.Login('qadarjs', 'qadar.q.a1+9@gmail.com','12345678')
      //cy.Login()
    })
  })