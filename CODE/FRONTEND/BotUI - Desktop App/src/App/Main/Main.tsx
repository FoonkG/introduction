import React, { useState } from "react";
import styled from "styled-components";
import { positions, Provider as AlertProvider, AlertTemplateProps } from "react-alert";

import MenuBar from "./components/Utils/MenuBar";
import NavBar from "./components/Utils/NavBar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Wallets from "./pages/Wallets";
import Proxies from "./pages/Proxies";
import Settings from "./pages/Settings";

import { eNavigation } from "../interfaces/Navigation/Navigation";

import ErrorIcon from "@/App/assets/alert/error.svg";
import SuccessIcon from "@/App/assets/alert/success.svg";

const AlertTemplate = ({ style, options, message, close }: AlertTemplateProps) => {
	return (
		<AlertContainer style={style} onClick={close} type={options.type || ""}>
			<AlertTextContainer>{message}</AlertTextContainer>
			<AlertStatusImage
				src={(() => {
					switch (options.type) {
						case "error":
							return ErrorIcon;
						default:
							return SuccessIcon;
					}
				})()}
			/>
		</AlertContainer>
	);
};

const options = {
	position: positions.BOTTOM_RIGHT,
	offset: "10px",
	timeout: 4000,
};

const Main = () => {
	const [navigation, setNavigation] = useState<eNavigation>(eNavigation.Dashboard);

	return (
		<AlertProvider template={AlertTemplate} {...options}>
			<Container>
				<MenuBar />
				<NavBar navigation={navigation} setNavigation={(navigation: eNavigation) => setNavigation(navigation)} />
				<ContentContainer>
					{navigation === eNavigation.Dashboard && <Dashboard switchPage={setNavigation} />}
					{navigation === eNavigation.Tasks && <Tasks />}
					{navigation === eNavigation.Wallets && <Wallets />}
					{navigation === eNavigation.Proxies && <Proxies />}
					{navigation === eNavigation.Settings && <Settings />}
				</ContentContainer>
			</Container>
		</AlertProvider>
	);
};

export default Main;

const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	position: relative;

	background: #0d0c10;
	border-radius: 14px;
	overflow: hidden;
`;

const ContentContainer = styled.div`
	width: calc(100% - 260px);
	height: 100%;
`;

const AlertContainer = styled.div<{ type: string }>`
	width: 358px;
	height: 56px;

	background: ${({ type }) => {
		switch (type) {
			case "success":
				return "#37D8BB";
			case "error":
				return "#FF7272";
			case "info":
				return "#88B8FF";
		}
	}};
	border-radius: 8px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 0px 17px 0 28px;

	cursor: pointer;

	transform: translateX(-10px) translateY(-10px);
`;

const AlertTextContainer = styled.div`
	max-width: calc(100% - 40px);

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	font-weight: 700;
	font-size: 14px;

	color: #ffffff;
`;

const AlertStatusImage = styled.img`
	width: 26px;
	height: 26px;
`;
