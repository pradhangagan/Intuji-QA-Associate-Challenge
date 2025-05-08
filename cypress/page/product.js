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
      .and("contain.text", "Dress"); // Contains expected keyword
  }

  clickFirstProduct() {
    cy.get('a[href="/product_details/3"]').first().click();
  }
  // cy.get(this.elements.productCard).first().click();

  verifyProductDetailPage() {
    cy.get(".product-information").within(() => {
      // Verify product name exists
      cy.get("h2").should("exist");
      // Verify price format (assuming currency symbol)
      cy.get("span span").should("contain", "Rs.");
      // Verify availability is in stock
      cy.contains("Availability:").should("exist");
      cy.get("p").should("contain", "In Stock");

      // Verify category information
      cy.contains("Category:").should("exist");
    });
  }
}
