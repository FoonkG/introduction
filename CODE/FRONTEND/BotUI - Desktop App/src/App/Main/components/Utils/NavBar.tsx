import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import DefaultProfilePicture from "@/App/assets/defaultprofilepicture.svg";

import { ReactComponent as DashboardIcon } from "@/App/assets/dashboardicon.svg";
import { ReactComponent as TasksIcon } from "@/App/assets/tasksicon.svg";
import { ReactComponent as WalletsIcon } from "@/App/assets/walletsicon.svg";
import { ReactComponent as ProxiesIcon } from "@/App/assets/proxiesicon.svg";
import { ReactComponent as SettingsIcon } from "@/App/assets/settingsicon.svg";

import { ReactComponent as RunningTaskGroupIcon } from "@/App/assets/runningtaskgroup.svg";

import { ReactComponent as GasTrackerBackground } from "@/App/assets/gastrackerbackground.svg";
import { ReactComponent as GasTrackerIcon } from "@/App/assets/gastrackericon.svg";

import { eNavigation, INavigation } from "@/App/interfaces/Navigation/Navigation";

const NavBar = ({ navigation, setNavigation }: INavigation) => {
	const botImageRef = useRef<HTMLImageElement>(null);
	const [tasks, setTasks] = useState(0);

	useEffect(() => {
		//Fetch all the running task groups over here and display them in the navbar
		//Fetch the amount of running tasks and display them in the navbar
		setTasks(23);
	}, []);

	return (
		<Container>
			<TopContainer>
				<ProfileContainer>
					<ProfileImage
						ref={botImageRef}
						src=""
						onError={() => {
							if (botImageRef.current) {
								botImageRef.current.src = DefaultProfilePicture;
							}
						}}
					/>
					<StaggeredText>
						<BotName>BotName</BotName>
						<Username>Boss-1#8087</Username>
					</StaggeredText>
				</ProfileContainer>
				<MenuContainer>
					<CategoryTitle>Menu</CategoryTitle>
					<LinkContainer>
						<LinkSelector number={navigation} />
						<Link active={navigation === eNavigation.Dashboard} onClick={() => setNavigation(eNavigation.Dashboard)}>
							<LinkTitleContainer>
								<DashboardIcon />
								Dashboard
							</LinkTitleContainer>
						</Link>
						<Link active={navigation === eNavigation.Tasks} onClick={() => setNavigation(eNavigation.Tasks)}>
							<LinkTitleContainer>
								<TasksIcon />
								Tasks
							</LinkTitleContainer>
							<AmountOfTasks>23</AmountOfTasks>
						</Link>
						<Link active={navigation === eNavigation.Wallets} onClick={() => setNavigation(eNavigation.Wallets)}>
							<LinkTitleContainer>
								<WalletsIcon />
								Wallets
							</LinkTitleContainer>
						</Link>
						<Link active={navigation === eNavigation.Proxies} onClick={() => setNavigation(eNavigation.Proxies)}>
							<LinkTitleContainer>
								<ProxiesIcon />
								Proxies
							</LinkTitleContainer>
						</Link>
						<Link active={navigation === eNavigation.Settings} onClick={() => setNavigation(eNavigation.Settings)}>
							<LinkTitleContainer>
								<SettingsIcon />
								Settings
							</LinkTitleContainer>
						</Link>
					</LinkContainer>
					<CategoryTitle>Running Task Groups</CategoryTitle>
					<RunningTaskContainer>
						{[...Array(3)].map((e, index) => {
							return (
								<RunningTaskGroup>
									<LeftRunningTaskContainer>
										<RunningTaskGroupIcon />
										Task Group 1
									</LeftRunningTaskContainer>
									<RunningTaskStatus color="#06D7A0" />
								</RunningTaskGroup>
							);
						})}
					</RunningTaskContainer>
				</MenuContainer>
			</TopContainer>
			<BottomContainer>
				<GasTrackerContainer>
					<StyledGasTrackerBackground />
					<GasTrackerTitle>
						<GasTrackerIcon /> Gas Tracker
					</GasTrackerTitle>
					<GasTrackerStack>
						<GasTrackerStackTitle>Base Fee:</GasTrackerStackTitle>
						<GasTrackerValueTitle>
							<GasTrackerValue>103</GasTrackerValue> GWEI{" "}
						</GasTrackerValueTitle>
					</GasTrackerStack>
					<GasTrackerStack>
						<GasTrackerStackTitle>Rapid Price:</GasTrackerStackTitle>
						<GasTrackerValueTitle>
							<GasTrackerValue>2341.1</GasTrackerValue> GWEI{" "}
						</GasTrackerValueTitle>
					</GasTrackerStack>
				</GasTrackerContainer>
				<CopyRight>Copyright Botname 2022</CopyRight>
			</BottomContainer>
		</Container>
	);
};

export default NavBar;

const Container = styled.div`
	height: 100vh;
	width: 260px;

	background: #121215;
	border-right: 2px solid #19181d;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const TopContainer = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;

	padding-top: 60px;
	padding-left: 30px;
`;

const ProfileContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	gap: 22px;
`;

const ProfileImage = styled.img`
	width: 50px;
	height: 50px;

	background: #88b8ff;
	border-radius: 5px;
`;

const StaggeredText = styled.div`
	display: flex;
	flex-direction: column;

	gap: 3px;
`;

const BotName = styled.div`
	font-weight: 700;
	font-size: 14px;
	line-height: 17px;

	color: #ffffff;
`;

const Username = styled.div`
	font-weight: 700;
	font-size: 10px;
	line-height: 12px;

	color: #ffffff;
`;

const MenuContainer = styled.div`
	display: flex;
	flex-direction: column;

	padding-left: 7px;
`;

const CategoryTitle = styled.div`
	font-weight: 700;
	font-size: 10px;
	line-height: 12px;
	display: flex;
	align-items: center;

	color: #ffffff;

	margin-top: 25px;
	&:not(:first-child) {
		margin-top: 35px;
	}
`;

const LinkContainer = styled.div`
	margin-top: 17px;
	width: 100%;

	display: flex;
	flex-direction: column;
	gap: 18px;

	position: relative;
`;

const LinkSelector = styled.div<{ number: number }>`
	position: absolute;
	left: -37px;
	top: ${(props) => props.number * 48}px;

	width: 6px;
	height: 30px;

	background: #88b8ff;
	box-shadow: 4px 4px 11px rgba(136, 184, 255, 0.5);
	border-radius: 0px 3px 3px 0px;
`;

const Link = styled.div<{ active: boolean; fill?: boolean }>`
	font-weight: 700;
	font-size: 14px;
	line-height: 17px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	height: 30px;
	width: 190px;

	cursor: pointer;

	color: ${(props) => (props.active ? "#88b8ff" : "#878787")};

	&:nth-child(2) {
		svg > path {
			stroke: ${(props) => (props.active ? "#88b8ff" : "#878787")};
		}
	}

	&:nth-child(3) {
		svg > path {
			stroke: ${(props) => (props.active ? "#88b8ff" : "#878787")};
		}
	}

	&:nth-child(4) {
		svg > path {
			fill: ${(props) => (props.active ? "#88b8ff" : "#878787")};
		}
	}

	&:nth-child(5) {
		svg > path {
			fill: ${(props) => (props.active ? "#88b8ff" : "#878787")};
		}
	}

	&:nth-child(6) {
		svg > * {
			stroke: ${(props) => (props.active ? "#88b8ff" : "#878787")};
		}
	}
`;

const LinkTitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 8px;
`;

const AmountOfTasks = styled.div`
	font-weight: 700;
	font-size: 10px;
	line-height: 12px;

	color: #ffffff;

	width: 25px;
	height: 20px;

	display: flex;
	align-items: center;
	justify-content: center;

	background: #88b8ff;
	border-radius: 0px 3px 3px 3px;
`;

const RunningTaskContainer = styled.div`
	height: 186px;
	width: calc(100% - 38px);

	display: flex;
	flex-direction: column;
	gap: 13px;

	margin-top: 14px;

	overflow-y: auto;
	::-webkit-scrollbar {
		width: 0px;
	}
`;

const RunningTaskGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const LeftRunningTaskContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 8px;

	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	color: #878787;
`;

const RunningTaskStatus = styled.div<{ color: string }>`
	background: ${(props) => props.color};

	width: 12px;
	height: 12px;

	border-radius: 50%;
`;

const BottomContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;

	padding-bottom: 25px;
`;

const GasTrackerContainer = styled.div`
	width: 195px;
	height: 133px;

	margin-bottom: 23px;

	background: #88b8ff;
	box-shadow: 4px 4px 11px rgba(136, 184, 255, 0.5);
	border-radius: 4px;

	position: relative;
	overflow: hidden;

	padding-top: 15px;
	padding-left: 17px;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	gap: 14px;
`;

const StyledGasTrackerBackground = styled(GasTrackerBackground)`
	position: absolute;
	right: 0;
	bottom: -18.21%;
`;

const GasTrackerTitle = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	color: #ffffff;

	gap: 8px;

	padding-left: 4px;
`;

const GasTrackerStack = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	gap: 2px;
`;

const GasTrackerStackTitle = styled.div`
	font-weight: 600;
	font-size: 10px;
	line-height: 12px;

	color: rgba(255, 255, 255, 0.7);
`;

const GasTrackerValueTitle = styled.div`
	font-weight: 700;
	font-size: 14px;
	line-height: 17px;

	color: rgba(255, 255, 255, 0.7);
`;

const GasTrackerValue = styled.span`
	font-weight: 700;
	font-size: 14px;
	line-height: 17px;

	color: #ffffff;
`;

const CopyRight = styled.div`
	font-weight: 700;
	font-size: 10px;
	line-height: 12px;

	color: #878787;
`;
