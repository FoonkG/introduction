import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ipcRenderer } from "electron";

import { ReactComponent as NavBarLogo } from "@/App/assets/navbarlogo.svg";

import { ReactComponent as DashboardIcon } from "@/App/assets/dashboard.svg";
import { ReactComponent as TasksIcon } from "@/App/assets/tasks.svg";
import { ReactComponent as ProxiesIcon } from "@/App/assets/proxies.svg";
import { ReactComponent as AccountSettingsIcon } from "@/App/assets/accountsettings.svg";
import { ReactComponent as SettingsIcon } from "@/App/assets/settings.svg";

import { ReactComponent as NotificationIcon } from "@/App/assets/notifications.svg";

import { Navigation } from "../types/Navigation";
import Notifications from "./Notifications";

interface INavBar {
	selected: Navigation;
	onSelect: (navigation: Navigation) => void;
	notificationsCounter: number;
	showNotifications: boolean;
	setShowNotifications: (showNotifications: boolean) => void;
}

const NavBar = ({ selected, onSelect, notificationsCounter, showNotifications, setShowNotifications }: INavBar) => {
	const [version, setVersion] = useState("V 0.0.0.0");
	const [time, setTime] = useState("00:00:00");

	const updateTime = () => {
		const date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		setTime(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
	};

	useEffect(() => {
		//Set time on render
		updateTime();

		//Fetch the version number from the server on render
		//TODO: Replace with a fetch call to the server
		setVersion("V 1.9.0.6");
	}, []);

	useEffect(() => {
		//Update timer every second
		const interval = setInterval(() => {
			updateTime();
		}, 1000);
		return () => clearInterval(interval);
	}, [time]);

	return (
		<Container>
			<TopContainer>
				<ButtonContainer>
					<Button
						color="#EC695F"
						onClick={() =>
							ipcRenderer.send("toMain", [
								{
									command: "close",
								},
							])
						}
					/>
					<Button
						color="#F4BF4F"
						onClick={() =>
							ipcRenderer.send("toMain", [
								{
									command: "minimize",
								},
							])
						}
					/>
				</ButtonContainer>
				<NavContainer>
					<StyledNavBarLogo />
					<LinkContainer>
						<NavItem active={selected === Navigation.Dashboard} onClick={() => onSelect(Navigation.Dashboard)}>
							<DashboardIcon />
						</NavItem>
						<NavItem active={selected === Navigation.Tasks} onClick={() => onSelect(Navigation.Tasks)}>
							<TasksIcon />
						</NavItem>
						<NavItem active={selected === Navigation.Proxies} onClick={() => onSelect(Navigation.Proxies)}>
							<ProxiesIcon />
						</NavItem>
						<NavItem active={selected === Navigation.AccountSettings} onClick={() => onSelect(Navigation.AccountSettings)}>
							<AccountSettingsIcon />
						</NavItem>
						<NavItem active={selected === Navigation.Settings} onClick={() => onSelect(Navigation.Settings)}>
							<SettingsIcon />
						</NavItem>
						<NotificationContainer
							active={showNotifications}
							onClick={(e) => {
								e.stopPropagation();
								setShowNotifications(!showNotifications);
							}}
						>
							<NotificationsWrapper>
								<NotificationIcon />
								<NotificationCounter active={showNotifications}>{notificationsCounter}</NotificationCounter>
							</NotificationsWrapper>
							{showNotifications && <Notifications />}
						</NotificationContainer>
					</LinkContainer>
				</NavContainer>
			</TopContainer>
			<BottomContainer>
				<Time>{time}</Time>
				<Version>{version}</Version>
			</BottomContainer>
		</Container>
	);
};

export default NavBar;

const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const TopContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	width: 100%;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	width: 100%;

	gap: 10px;

	margin-top: 18px;
	margin-left: 21px;
`;

const Button = styled.button<{ color: string }>`
	width: 20px;
	height: 20px;

	background: ${({ color }) => color};

	border-radius: 50%;
`;

const NavContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;

const StyledNavBarLogo = styled(NavBarLogo)`
	margin-top: 39px;
`;

const LinkContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	gap: 50px;

	margin-top: 70px;
`;

const NavItem = styled.div<{ active: boolean }>`
	&:nth-child(1) {
		width: 44px;
		height: 44px;
	}

	&:nth-child(2) {
		width: 40px;
		height: 24.5px;
	}

	&:nth-child(3) {
		width: 37px;
		height: 26px;
	}

	&:nth-child(4) {
		width: 43px;
		height: 43px;
	}

	&:nth-child(5) {
		width: 45px;
		height: 45px;
	}

	cursor: pointer;

	&:hover {
		filter: brightness(${({ active }) => (active ? "1" : "1.3")});
	}

	& > svg {
		fill: ${({ active }) => (active ? "#47C8FA" : "#797979")};
	}

	svg path {
		fill: ${({ active }) => (active ? "#47C8FA" : "#797979")};
	}
`;

const NotificationContainer = styled.div<{ active: boolean }>`
	width: 33px;
	height: 41px;

	position: relative;

	& svg path {
		fill: ${({ active }) => (active ? "#47C8FA" : "#797979")};
	}
`;

const NotificationsWrapper = styled.div`
	cursor: pointer;
	&:hover {
		filter: brightness(115%);
	}
`;

const NotificationCounter = styled.div<{ active: boolean }>`
	padding: 1.5px 5px 1.5px 5px;

	position: absolute;
	top: 1px;
	right: -5px;

	background: ${({ active }) => (active ? "#47C8FA" : "#797979")};
	border: 1px solid #222121;

	border-radius: 50%;

	font-weight: 400;
	font-size: 15px;
	line-height: 18px;

	color: ${({ active }) => (active ? "#242323" : "#fffefe")};
`;

const BottomContainer = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	gap: 18px;
`;

const Time = styled.div`
	font-size: 22px;
	line-height: 27px;

	color: #cccccc;
`;

const Version = styled.div`
	font-weight: 400;
	font-size: 15px;
	line-height: 18px;

	color: #939090;

	margin-bottom: 14px;
`;
