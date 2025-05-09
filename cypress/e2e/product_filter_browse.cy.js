import ProductsPage from "../page/product";
import { loginUser } from "../page/login";

describe("Product Browsing & Filtering Test", () => {
  before(() => {
    // Log in before running the tests
    loginUser();
  });
  const productsPage = new ProductsPage();

  it("should filter Women > Dress and verify product details", () => {
    // 1. Navigate to Products page
    productsPage.visit();

    // 2. Filter by Women > Dress
    productsPage.selectCategory("Women", "Dress");

    // 3. Verify filtered product list
    productsPage.verifyProductlist();

    // 4. Click and verify product details
    productsPage.clickFirstProduct();
    productsPage.verifyProductDetailPage();
  });
});
