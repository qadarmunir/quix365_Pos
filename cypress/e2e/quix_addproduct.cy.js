//with the help of json file
describe('Add_products', ()=>{
    before(()=>{
        //cy.fixture('')
        cy.visit('https://quix365.com/')
        cy.Login('qadarjs', 'qadar.q.a1+9@gmail.com', '12345678')
        
    })
    it('add 100 products' ,()=>{

      cy.Add_products()
    })
})