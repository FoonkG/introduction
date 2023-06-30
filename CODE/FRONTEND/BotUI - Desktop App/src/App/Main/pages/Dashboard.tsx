import React, { useState, useEffect } from "react";
import styled from "styled-components";

import SpentGraph from "../components/Dashboard/SpentGraph";

import { ReactComponent as BagIcon } from "@/App/assets/bag.svg";
import { ReactComponent as PlusIcon } from "@/App/assets/plus.svg";
import { ReactComponent as TotalMintsGraphic } from "@/App/assets/totalMintsGraphic.svg";
import { ReactComponent as TotalSpentVector } from "@/App/assets/totalSpentVector.svg";
import { ReactComponent as SearchIcon } from "@/App/assets/search.svg";
import { eNavigation } from "@/App/interfaces/Navigation/Navigation";

interface IProps {
	switchPage: (page: eNavigation) => void;
}

const Dashboard = ({ switchPage }: IProps) => {
	return (
		<Container>
			<MainContainer>
				<Header style={{ padding: "0 15px 0 13px" }}>
					<HeaderTitle>Hi Boss-1#8087!</HeaderTitle>
					<Time />
				</Header>
				<DataCardsContainer>
					<TotalMintsCard>
						<DataCardIconAndTitleContainer>
							<DataCardIconContainer>
								<BagIcon />
							</DataCardIconContainer>
							<DataCardTitle>Total Mints</DataCardTitle>
						</DataCardIconAndTitleContainer>
						<DataCardDataLabel>232</DataCardDataLabel>
						<StyledTotalMintsGraphic />
						<StyledBagIcon />
					</TotalMintsCard>
					<TotalSpentCard>
						<DataCardIconAndTitleContainer>
							<DataCardIconContainer>
								<BagIcon />
							</DataCardIconContainer>
							<DataCardTitle>Total Spent</DataCardTitle>
						</DataCardIconAndTitleContainer>
						<DataCardDataLabel>3.21 ETH</DataCardDataLabel>
						<StyledTotalSpentVector />
					</TotalSpentCard>
				</DataCardsContainer>
				<GraphContainer>
					<GraphTitle>
						<PurpleDot />
						<div>SPENT IN THE LAST 7 DAYS</div>
						<div>+ 12%</div>
					</GraphTitle>
					<SpentGraph />
					<GraphXAxis>
						<div>Mo</div>
						<div>Tu</div>
						<div>We</div>
						<div>Th</div>
						<div>Fr</div>
						<div>Sa</div>
						<div>Su</div>
					</GraphXAxis>
				</GraphContainer>
				<SuccessList />
			</MainContainer>
			<UpcomingDropsContainer>
				<UpcomingDrops switchPage={switchPage} />
			</UpcomingDropsContainer>
		</Container>
	);
};

const UpcomingDrops = ({ switchPage }: IProps) => {
	const [searchValue, setSearchValue] = useState("");

	return (
		<>
			<Header>
				<HeaderTitle>Upcoming Drops</HeaderTitle>
				<UpcomingDropsSearchBarContainer>
					<SearchIcon />
					<SuccessSearchBarInput
						style={{ width: "74px", margin: 0 }}
						placeholder="Search Drop"
						value={searchValue}
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
					/>
				</UpcomingDropsSearchBarContainer>
			</Header>
			<UpcomingDropsInnerContainer>
				{[...Array(5)].map(() => (
					<UpcomingDropContainer>
						<UpCommingDropBanner img="https://media.discordapp.net/attachments/557143523879813120/1020112102788186112/unknown.png">
							<UpcomingDropImage src="https://nftnow.com/wp-content/uploads/2022/02/Doodles-Guide-Feature-Image.png" />
						</UpCommingDropBanner>
						<UpcomingDropLowerContainer>
							<UpcomingDropTitle>Doodles | OpenSea</UpcomingDropTitle>
							<UpcomingDropSubtitle>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida nam a rutrum ullamcorper nec felis.
							</UpcomingDropSubtitle>
							<UpcomingDropCreateTasksContainer>
								<UpcomingDropTime>Today 6 PM EST</UpcomingDropTime>
								<UpcomingDropCreateTasksButton
									onClick={() => {
										switchPage(eNavigation.Tasks);
									}}
								>
									<PlusIcon /> Tasks
								</UpcomingDropCreateTasksButton>
							</UpcomingDropCreateTasksContainer>
						</UpcomingDropLowerContainer>
					</UpcomingDropContainer>
				))}
			</UpcomingDropsInnerContainer>
		</>
	);
};

const getTime = () => new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric", hour12: true });

const Time = () => {
	const [time, setTime] = useState(getTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(getTime());

			return () => clearInterval(interval);
		}, 1000);
	}, []);

	return <HeaderTime>{time}</HeaderTime>;
};

const SuccessList = () => {
	const [searchValue, setSearchValue] = useState("");
	const [activeTab, setActiveTab] = useState(0);
	return (
		<>
			<SuccessTitle>Success</SuccessTitle>
			<SuccessFilterContainer>
				<SuccessTabsContainer>
					<SuccessTab
						active={activeTab == 0}
						onClick={() => {
							setActiveTab(0);
						}}
					>
						All Success
					</SuccessTab>
					<SuccessTab
						active={activeTab == 1}
						onClick={() => {
							setActiveTab(1);
						}}
					>
						ETH Mints
					</SuccessTab>
				</SuccessTabsContainer>
				<SuccessSearchContainer>
					<SearchIcon />
					<SuccessSearchBarInput
						placeholder="Search Checkout"
						value={searchValue}
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
					/>
				</SuccessSearchContainer>
			</SuccessFilterContainer>
			<SuccessListContainer>
				<SuccessCategoryLabel>Today</SuccessCategoryLabel>
				{[...Array(5)].map(() => (
					<SuccessListItem>
						<SuccessListItemImg src={"https://cdn.discordapp.com/attachments/504196210849218591/1020018954716053585/unknown.png"} />
						<SuccessItemListStaggeredText>
							<div>Doodle #1234</div>
							<div>OpenSea | Wallet 1 | Today 11:23:12 AM</div>
						</SuccessItemListStaggeredText>
						<SuccessItemStatus>Successfully Minted</SuccessItemStatus>
						<ValueAmount>1.2 ETH</ValueAmount>
					</SuccessListItem>
				))}
			</SuccessListContainer>
		</>
	);
};

export default Dashboard;

const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	color: white;
`;

const MainContainer = styled.div`
	width: 695px;
	height: 100%;

	padding: 35px;

	border-right: 2px solid #353438;
`;

const Header = styled.div`
	width: 100%;

	padding: 0;

	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-bottom: 27px;
`;

const HeaderTitle = styled.div`
	font-weight: 700;
	font-size: 16px;

	color: #ffffff;
`;

const HeaderTime = styled.div`
	font-weight: 700;
	font-size: 14px;

	color: #878787;
`;

const UpcomingDropsContainer = styled.div`
	width: calc(100% - 695px);
	height: 100%;

	padding: 35px 32px 35px 35px;
`;

const DataCardsContainer = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const DataCardBluePrint = styled.div`
	height: 138px;

	box-shadow: 4px 4px 11px rgba(136, 184, 255, 0.5);
	border-radius: 4px;

	position: relative;
	overflow: hidden;
`;

const TotalMintsCard = styled(DataCardBluePrint)`
	width: 262px;

	background: #37d8bb;
`;

const TotalSpentCard = styled(DataCardBluePrint)`
	width: 344px;

	background: #ac98ef;
`;

const DataCardIconContainer = styled.div`
	width: 36px;
	height: 36px;

	background: rgba(255, 255, 255, 0.35);
	border-radius: 5px;

	margin-right: 14px;

	display: flex;
	align-items: center;
	justify-content: center;

	& svg {
		width: 20px;
		height: 20px;
	}
`;

const DataCardIconAndTitleContainer = styled.div`
	display: flex;
	align-items: center;

	position: absolute;
	top: 20px;
	left: 20px;
`;

const DataCardTitle = styled.div`
	font-weight: 700;
	font-size: 14px;
	color: #ffffff;
`;

const DataCardDataLabel = styled.div`
	font-weight: 700;
	font-size: 24px;
	color: #ffffff;

	position: absolute;
	bottom: 17px;
	left: 27px;
`;

const StyledTotalMintsGraphic = styled(TotalMintsGraphic)`
	position: absolute;
	top: 25.5px;
	right: 0px;
`;

const StyledTotalSpentVector = styled(TotalSpentVector)`
	position: absolute;
	top: 0px;
	right: 0px;
`;

const StyledBagIcon = styled(BagIcon)`
	position: absolute;
	left: 189px;
	top: 61px;

	width: 104px;
	height: 104px;
`;

const GraphContainer = styled.div`
	width: 624px;
	height: 244px;

	background: #1b1b1e;
	border: 1px solid #2a292e;
	border-radius: 5px;

	margin-top: 20px;

	position: relative;
`;

const GraphXAxis = styled.div`
	display: flex;

	justify-content: space-between;

	position: absolute;
	bottom: 24px;
	left: 50px;
	right: 50px;

	& > div {
		font-weight: 700;
		font-size: 11px;

		color: #878787;
	}
`;

const GraphTitle = styled.div`
	display: flex;
	align-items: center;
	position: absolute;
	top: 22px;
	left: 28px;

	& > div {
		font-weight: 600;
		font-size: 12px;

		color: #06d7a0;
	}

	& > div:nth-child(2) {
		margin-right: 8px;

		color: #878787;
	}
`;

const PurpleDot = styled.div`
	width: 10px;
	height: 10px;

	background: #ac98ef;
	border-radius: 13px;
	margin-right: 7px;
`;

const SuccessTitle = styled(HeaderTitle)`
	margin-left: 12px;
	margin-top: 26px;
`;

const SuccessFilterContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;

	margin-top: 11px;

	border-bottom: 2px solid #353438;
`;

const SuccessTabsContainer = styled.div`
	display: flex;
	align-items: center;
`;

const SuccessTab = styled.div<{ active: boolean }>`
	font-weight: 700;
	font-size: 12px;

	color: ${(props) => (props.active ? "#ac98ef" : "#878787")};

	border-bottom: 2px solid ${(props) => (props.active ? "#ac98ef" : "transparent")};
	padding-bottom: 12px;

	transform: translateY(2px);

	padding-left: 12px;
	padding-right: 12px;
	cursor: pointer;
`;

const SuccessSearchContainer = styled.div`
	display: flex;
	align-items: center;

	transform: translateY(-6px);
`;

const SuccessSearchBarInput = styled.input`
	font-weight: 600;
	font-size: 11px;
	color: #878787;
	outline: none;
	border: none;
	background: transparent;
	margin-left: 8px;

	padding: 0;
`;

const SuccessCategoryLabel = styled.div`
	font-weight: 700;
	font-size: 10px;
	color: #ffffff;

	margin-top: 20px;
	margin-left: 12px;
	margin-bottom: 11px;
`;

const SuccessListContainer = styled.div`
	width: 100%;
	height: 217px;

	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}
`;

const SuccessListItem = styled.div`
	width: 100%;
	height: 50px;

	margin-bottom: 12px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SuccessListItemImg = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 4px;

	margin-right: 12px;
`;

const SuccessItemListStaggeredText = styled.div`
	width: 356px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	margin-right: 12px;

	& > div:nth-child(1) {
		font-weight: 700;
		font-size: 12px;
		color: #ffffff;
	}

	& > div:nth-child(2) {
		font-weight: 700;
		font-size: 10px;
		color: #878787;
	}
`;

const SuccessItemStatus = styled.div`
	font-weight: 700;
	font-size: 12px;
	color: #37d8bb;

	margin-right: 12px;
`;

const ValueAmount = styled.div`
	width: 52px;
	height: 20px;

	background: #88b8ff;
	border-radius: 0px 3px 3px 3px;

	font-weight: 700;
	font-size: 10px;

	display: flex;
	align-items: center;
	justify-content: center;

	color: #ffffff;
`;

const UpcomingDropsSearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 92px;
`;

const UpcomingDropsInnerContainer = styled.div`
	width: 100%;
	height: 743px;
	margin-top: 20px;

	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}
`;

const UpcomingDropContainer = styled.div`
	width: 100%;
	height: 239px;

	background: #1b1b1e;
	border: 1px solid #2a292e;
	border-radius: 5px;

	margin-bottom: 13px;
`;

const UpCommingDropBanner = styled.div<{ img: string }>`
	width: calc(100% + 2px);
	transform: translateX(-1px) translateY(-1px);
	height: 98px;

	background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${(props) => props.img}");
	border-radius: 5px 5px 0px 0px;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const UpcomingDropImage = styled.img`
	width: 52px;
	height: 52px;

	border: 2px solid #ffffff;
	filter: drop-shadow(0px 1px 13px rgba(0, 0, 0, 0.25));
	border-radius: 50%;
	object-fit: cover;
`;

const UpcomingDropLowerContainer = styled.div`
	margin-top: 20px;
	padding: 0 16px 16px 29px;
`;

const UpcomingDropTitle = styled.div`
	font-weight: 700;
	font-size: 16px;
	color: #ffffff;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const UpcomingDropSubtitle = styled.p`
	font-weight: 700;
	font-size: 10px;
	color: #878787;
	width: 100%;
	height: 24px;

	margin-top: 7px;
	margin-bottom: 0;

	overflow: hidden;
	text-overflow: ellipsis;

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

const UpcomingDropCreateTasksContainer = styled.div`
	width: 100%;

	margin-top: 18px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const UpcomingDropTime = styled.div`
	font-weight: 700;
	font-size: 12px;
	color: #ac98ef;
`;

const UpcomingDropCreateTasksButton = styled.button`
	width: 94px;
	height: 36px;

	background: #28282b;
	border-radius: 6px;

	border: none;
	outline: none;

	font-weight: 700;
	font-size: 11px;

	color: #ffffff;

	& svg {
		margin-right: 4px;
	}
`;
