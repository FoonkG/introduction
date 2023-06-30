import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EventEmitter } from "events";

import { Navigation } from "./types/Navigation";

import NavBar from "./components/NavBar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Proxies from "./pages/Proxies";
import AccountSettings from "./pages/AccountSettings";
import Settings from "./pages/Settings";

import { ipcRenderer } from "electron";

export class Import {
	static EE = new EventEmitter();
}

const Main = () => {
	const [navigation, setNavigation] = useState<Navigation>(Navigation.Dashboard);
	const [notifications, setNotifications] = useState<number>(5);

	const [showNotifications, setShowNotifications] = useState(false);

	useEffect(() => {
		ipcRenderer.on("importProxies", (e, proxies: string[]) => {
			console.log(proxies);
			Import.EE.emit("importProxies", proxies);
		});
		ipcRenderer.on("importProfiles", (e, profiles: any[]) => {
			Import.EE.emit("importProfiles", profiles);
		});

		return () => {
			ipcRenderer.removeAllListeners("importProxies");
			ipcRenderer.removeAllListeners("importProfiles");
		};
	}, []);

	return (
		<Container
			onClick={(e) => {
				e.stopPropagation();
				setShowNotifications(false);
			}}
		>
			<DragBar />
			<NavigationContainer>
				<NavBar
					notificationsCounter={notifications}
					selected={navigation}
					onSelect={(navigation: Navigation) => setNavigation(navigation)}
					showNotifications={showNotifications}
					setShowNotifications={(value: boolean) => setShowNotifications(value)}
				/>
			</NavigationContainer>
			<GradientBorder />
			<ContentContainer>
				{navigation === Navigation.Dashboard && <Dashboard />}
				{navigation === Navigation.Tasks && <Tasks />}
				{navigation === Navigation.Proxies && <Proxies />}
				{navigation === Navigation.AccountSettings && <AccountSettings />}
				{navigation === Navigation.Settings && <Settings />}
			</ContentContainer>
		</Container>
	);
};

export default Main;

const Container = styled.div`
	width: 100%;
	height: 100%;

	background: #1c1c1c;
	border-radius: 25px;

	display: flex;
	align-items: center;
	justify-content: center;

	overflow: hidden;

	position: relative;
`;

const GradientBorder = styled.div`
	width: 1px;
	height: 100%;
	background: linear-gradient(180deg, #9e9e9e 0%, rgba(99, 99, 99, 0) 100%);
`;

const NavigationContainer = styled.div`
	width: 128px;
	height: 100%;

	background: linear-gradient(180deg, rgba(38, 38, 38, 1), rgba(46, 45, 45, 0.2));
`;

const ContentContainer = styled.div`
	width: calc(100% - 129px);
	height: 100%;
`;

const DragBar = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;

	height: 18px;

	-webkit-app-region: drag;
`;
