import React from "react";
import DropDown from "./DropDown";

describe("<DropDown />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<DropDown
				options={[
					{ value: "Type 1", label: "Type 1" },
					{ value: "Type 2", label: "Type 2" },
				]}
				title="Search Collection"
				onSelect={(val: any) => {
					//
				}}
				search={true}
			/>
		);
	});
});
