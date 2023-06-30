import React from "react";
import ProgressCircle from "./DistributionCircle";

const holdersDistributionItems = [
	{
		color: "#FFA96B",
		percentage: 53.5,
		extra: "1",
	},
	{
		color: "#AE5EFF",
		percentage: 30.5,
		extra: "2",
	},
	{
		color: "#D9627F",
		percentage: 11.5,
		extra: "3",
	},
	{
		color: "#EE84FF",
		percentage: 4.5,
		extra: "10+",
	},
];

describe("<ProgressCircle />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<ProgressCircle items={holdersDistributionItems} />);
	});
});
