describe("Navigation", () => {
	it("should load the 'Under Construction' Page", () => {
		// Start from the index page
		cy.visit("http://localhost:3000/");

		// Find a link with an href attribute containing "about" and click it
		cy.get(".subtitle").contains("Under Construction");
	});

	it("should navigate to the about page", () => {
		// Start from the index page
		cy.visit("http://localhost:3000/");

		// Find a link with an href attribute containing "about" and click it
		cy.get(".link").click();

		// The new url should include "/about"
		cy.url().should("include", "/nfttool");

		// The new page should contain an h1 with "About page"
		cy.get(".name").contains("Micron Labs");
	});
});
