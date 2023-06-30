import { useState } from "react";
import styled from "styled-components";
import NavBar from "public/components/NavBar";

import { Navigation } from "public/interfaces/Navigation";

import Mints from "public/pages/Mints";
import Sales from "public/pages/Sales";
import Trending from "public/pages/Trending";
import Calendar from "public/pages/Calendar";
import Alerts from "public/pages/Alerts";
import Toolkit from "public/pages/Toolkit";

const NFTTool = () => {
	const [navigation, setNavigation] = useState<Navigation>(Navigation.Mints);

	return (
		<Container>
			<NavBar value={navigation} changeValue={(value: Navigation) => setNavigation(value)} />
			<ScrollContainer>
				{navigation === Navigation.Mints && <Mints />}
				{navigation === Navigation.Sales && <Sales />}
				{navigation === Navigation.Trending && <Trending />}
				{navigation === Navigation.Calendar && <Calendar />}
				{navigation === Navigation.Alerts && <Alerts />}
				{navigation === Navigation.Toolkit && <Toolkit />}
			</ScrollContainer>
		</Container>
	);
};

export default NFTTool;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ScrollContainer = styled.div`
	width: 100%;
	height: calc(100vh - 76px);
	overflow: auto;
`;
