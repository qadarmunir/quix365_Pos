describe('Add_products', () => {
  before(() => {
    cy.visit('https://quix365.com/');
    // Assuming cy.Login is a custom command for logging in.
    cy.Login('qadarjs', 'qadar.q.a1+9@gmail.com', '12345678');
  });

  it('add 10 products', () => {
    cy.fixture('addproducts').then((products_data) => {
      products_data.forEach((product) => {
        cy.Add_products(
          product.p_name,
          product.barcode,
          product.supplier_code,
          product.custom_field,
          product.product_cost
        );
      });
    });
  });
});
