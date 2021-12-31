/// <reference types="cypress" />

describe("Test Search a robot", () => {
  it("Without search we should see 10 robots", () => {
    cy.visit("https://react-robots.vercel.app/");
  });
  it("Searching Robot 1", () => {
    cy.visit("https://react-robots.vercel.app/");
  });
  it("Searching Robot 2", () => {
    cy.visit("https://react-robots.vercel.app/");
  });
});
