import React from "react";
import BarGraph from "./BarGraph";

describe("<BarGraph />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<BarGraph
				width={"432px"}
				height="40px"
				data={{
					data: [30, 5, 10, 20, 15, 10, 20, 30, 5, 10, 20, 15, 10, 20, 5, 9, 4, 8, 9, 10, 15, 10, 20, 5, 9, 4, 8, 9, 10, 15],
					labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
				}}
			/>
		);
	});
});
