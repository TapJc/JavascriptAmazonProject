import { Product, Clothing, Appliance } from "../../data/products.js";

describe("Test Suite: Product", () => {
  let product;

  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    });
  });

  it("Product has correct properties", () => {
    expect(product.image).toEqual(
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87,
    });
    expect(product.priceCents).toEqual(1090);
  });

  it("Gets the stars url", () => {
    expect(product.getStarsURL()).toEqual("images/ratings/rating-45.png");
  });

  it("Gets the price", () => {
    expect(product.getPrice()).toEqual("$10.90");
  });

  it("Does not display any extra info", () => {
    expect(product.extraInfoHTML()).toEqual("");
  });
});

describe("Test Suite: Clothing", () => {
  let clothing;

  beforeEach(() => {
    clothing = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
  });

  it("Clothing has correct properties", () => {
    expect(clothing.image).toEqual(
      "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
    );
    expect(clothing.sizeChartLink).toEqual("images/clothing-size-chart.png");
  });

  it("Gets the stars url", () => {
    expect(clothing.getStarsURL()).toEqual("images/ratings/rating-45.png");
  });

  it("Gets the price", () => {
    expect(clothing.getPrice()).toEqual("$7.99");
  });

  it("Does display clothing info", () => {
    expect(clothing.extraInfoHTML())
      .toContain(`<a href="images/clothing-size-chart.png" target="_blank">
      Size Chart
      </a>`);
  });
});

describe("Test Suite: Appliance", () => {
  let appliance;

  beforeEach(() => {
    appliance = new Appliance({
      id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
      image: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
      name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
      rating: {
        stars: 5,
        count: 846,
      },
      priceCents: 3074,
      keywords: ["water boiler", "appliances", "kitchen"],
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
    });
  });

  it("Appliance has correct properties", () => {
    expect(appliance.image).toEqual(
      "images/products/electric-glass-and-steel-hot-water-kettle.webp"
    );
    expect(appliance.instructionsLink).toEqual(
      "images/appliance-instructions.png"
    );
    expect(appliance.warrantyLink).toEqual("images/appliance-warranty.png");
  });

  it("Gets the starts url", () => {
    expect(appliance.getStarsURL()).toEqual("images/ratings/rating-50.png");
  });

  it("Gets the price", () => {
    expect(appliance.getPrice()).toEqual("$30.74");
  });

  it("Does display appliance info", () => {
    expect(appliance.extraInfoHTML()).toContain(
      `<a href="images/appliance-instructions.png" target="_blank">`
    );
    expect(appliance.extraInfoHTML()).toContain(`Instructions`);
    expect(appliance.extraInfoHTML()).toContain(
      `<a href="images/appliance-warranty.png" target="_blank">`
    );
    expect(appliance.extraInfoHTML()).toContain("Warranty");
  });
});
