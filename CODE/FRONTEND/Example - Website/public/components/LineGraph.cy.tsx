import React from "react";
import LineGraph from "./LineGraph";

describe("<LineGraph />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<LineGraph
				data={{
					data: [0.05, 0.12, 0.24, 0.2, 0.16, 0.08, 0.2, 0.05],
					labels: [1, 2, 3, 4, 5, 6, 7, 8],
				}}
				width="400px"
				height="300px"
			/>
		);
	});
});
