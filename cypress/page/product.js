export default class ProductsPage {
  visit() {
    cy.visit("/products");
  }

  selectCategory(category, subcategory) {
    cy.get('a[href="/products"]').click();
    cy.contains(category).click();
    cy.contains(subcategory).click();
  }

  getProductList() {
    return cy.get(".features_items .productinfo");
  }

  verifyProductlist() {
    this.getProductList()
      .should("be.visible") // Ensure the product list is visible
      .should("have.length.gt", 0) // At least one product
      .and("contain.text", "Dress"); // Contains expected keyword dress
  }

  clickFirstProduct() {
    cy.get('a[href="/product_details/3"]').first().click();
  }

  verifyProductDetailPage() {
    cy.get(".product-information").within(() => {
      // Verify product name exists
      cy.get("h2").should("exist");
      // Verify price format
      cy.get("span span").should("contain", "Rs.");
      // Verify availability is in stock
      cy.contains("Availability:").should("exist");
      cy.get("p").should("contain", "In Stock");

      // Verify category information
      cy.contains("Category:").should("exist");
    });
  }

  //   addToCart(category, subcategory) {
  //     this.selectCategory(category, subcategory);

  //     // Ensure the "Add to cart" button is visible and clickable
  //     cy.get(".add-to-cart").first().click();

  //     // Verify the modal appears and confirms the addition
  //     cy.get(".modal-content").should("contain", "Added!");

  //     // Close the modal by clicking "Continue Shopping"
  //     cy.get(".modal-footer .btn")
  //       .contains("Continue Shopping")
  //       .click({ force: true });
  //   }

  addToCart(category, subcategory, productIndex = 0) {
    this.selectCategory(category, subcategory);

    cy.get(".features_items .product-image-wrapper")
      .eq(productIndex)
      .scrollIntoView()
      .trigger("mouseover")
      .find(".product-overlay .add-to-cart")

      .click({ force: true });

    // Wait for modal and handle it
    cy.get("#cartModal", { timeout: 20000 }).should("be.visible");
    cy.contains("Continue Shopping").click();
  }
}
