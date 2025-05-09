import { loginUser } from "../page/login";
import ProductsPage from "../page/product";
import CartPage from "../page/cart";

describe("Cart and Quantity Management", () => {
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();

  before(() => {
    // Log in before running cart tests
    loginUser();
  });

  it("should add multiple items, update quantity, and manage cart", () => {
    // 1. Add first item from Women > Dress
    productsPage.visit();
    productsPage.addToCart("Women", "Dress", 0);

    // 2. Add second item from Men > Tshirts
    productsPage.visit();
    productsPage.addToCart("Men", "Tshirts", 1);

    productsPage.visit();
    productsPage.addToCart("Men", "Jeans", 1);

    // 3. Verify cart page loaded and at least two items present
    cartPage.visit();
    cy.url().should("include", "/view_cart");
    cy.get("#cart_info_table tbody tr").should("have.length.at.least", 2);

    // 4. Change quantity of first item to 3
    productsPage.visit();
    for (let i = 0; i < 2; i++) {
      productsPage.visit();
      productsPage.addToCart("Women", "Dress", 0);
    }

    // 5. Verify quantity updated in cart UI
    cartPage.visit();
    cy.get("#cart_info_table tbody tr")
      .first()
      .find(".cart_quantity")
      .should("contain.text", "3");

    // 6. Verify total price for each item in cart
    cy.get("#cart_info_table tbody > tr").each(($row) => {
      const priceText = $row.find(".cart_price").text().replace("Rs. ", "");
      const quantityText = $row.find(".cart_quantity").text();
      const totalText = $row.find(".cart_total").text().replace("Rs. ", "");

      const price = parseFloat(priceText);
      const quantity = parseInt(quantityText);
      const total = parseFloat(totalText);

      expect(total).to.eq(price * quantity);
    });

    // 7. Remove second product and verify cart updates
    cy.get("#cart_info_table tbody tr").eq(2).find(".cart_delete a").click(); //remove third product

    cy.get("#cart_info_table tbody tr").should("have.length", 2); //length 2 beacuse we also count tr for header.

    // 8. Remove first product and verify cart is empty
    //need to empty cart for retesting cart management
    cy.get("#cart_info_table tbody tr").eq(1).find(".cart_delete a").click();
    cy.get("#cart_info_table tbody tr").eq(0).find(".cart_delete a").click();
    cy.contains("Cart is empty!").should("be.visible");
  });
});
