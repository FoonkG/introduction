import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StatContainer from "../components/StatsContainer";

import { ReactComponent as TotalCheckoutsIcon } from "@/App/assets/dashboard/checkouts.svg";
import { ReactComponent as TotalDeclinesIcon } from "@/App/assets/dashboard/declines.svg";
import { ReactComponent as TotalSpentIcon } from "@/App/assets/dashboard/spent.svg";
import { ReactComponent as FavoriteStoreIcon } from "@/App/assets/dashboard/store.svg";

import { ReactComponent as RemoveCheckoutItem } from "@/App/assets/removecheckout.svg";
import { ReactComponent as UserDropdownIcon } from "@/App/assets/userdropdown.svg";

import Input from "../components/Input";
import Selector from "../components/Selector";
import { checkoutdata, graphdata } from "../mockData";
import ChartComponent from "../components/Chart";

const Dashboard = () => {
	const [totalCheckouts, setTotalCheckouts] = useState<string>();
	const [totalDeclines, setTotalDeclines] = useState<string>();
	const [totalAmountSpent, setTotalAmountSpent] = useState<string>();
	const [favoriteSite, setFavoriteSite] = useState<string>();

	const [openUserMenu, setOpenUserMenu] = useState(false);

	const [searchValue, setSearchValue] = useState("");
	const [selectorValue, setSelectorValue] = useState("Day");

	useEffect(() => {
		//Fetch all the data for below
		setTotalCheckouts("225");
		setTotalDeclines("114");
		setTotalAmountSpent("$8750");
		setFavoriteSite("KITH");
	}, []);

	useEffect(() => {
		switch (selectorValue) {
			case "Day": //Fetch day data
				break;
			case "Week": //Fetch week data
				break;
			case "All": //Fetch all data
				break;
		}
	}, [selectorValue]);

	function getCoords(e: any) {
		let bounds = e.target.getBoundingClientRect();
		return { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
	}

	return (
		<Container
			onClick={(e) => {
				setOpenUserMenu(false);
				e.stopPropagation();
			}}
		>
			<TopContainer>
				<TopLeftContainer>
					<StatContainer
						icon={<TotalCheckoutsIcon />}
						background="linear-gradient(91.08deg, #47C8F9 -1.3%, #65D5FF 50.93%, #47C8F9 104.26%)"
						border="linear-gradient(91.08deg, #47C8F9 -1.3%, #65D5FF 50.93%, #47C8F9 104.26%)"
						title="Total Checkouts"
						value={totalCheckouts}
					/>
					<StatContainer
						icon={<TotalDeclinesIcon />}
						background="linear-gradient(91.08deg, #F50181 -1.3%, #EF3A99 50.93%, #F50181 104.26%)"
						border="linear-gradient(91.08deg, #F50181 -1.3%, #EF3A99 50.93%, #F50181 104.26%)"
						title="Total Declines"
						value={totalDeclines}
					/>
					<StatContainer
						icon={<TotalSpentIcon />}
						background="linear-gradient(91.08deg, #D601EF -1.3%, #DE44F0 50.93%, #D601EF 104.26%)"
						border="linear-gradient(91.08deg, #D601EF -1.3%, #DE44F0 50.93%, #D601EF 104.26%)"
						title="Total Amount Spent"
						value={totalAmountSpent}
					/>
					<StatContainer
						icon={<FavoriteStoreIcon />}
						gap="6px"
						background="rgba(0, 0, 0, 0.6)"
						border="linear-gradient(99.03deg, #5BD1FE -2.51%, #F2228F 51.19%, #DA1DF0 106.03%)"
						title="Favorite Site"
						value={favoriteSite}
					/>
				</TopLeftContainer>
				<UserContainer
					onClick={(e) => {
						setOpenUserMenu(!openUserMenu);
						e.stopPropagation();
					}}
				>
					<UserInfoContainer>
						<IconWrapper>
							<UserIcon src="http://www.guadeloupe-decouverte.eu/images/racoon-03.jpg" />
							<UserStatus color="#5BA364" />
						</IconWrapper>
						<StaggeredUser>
							<UserGreeting>Welcome back,</UserGreeting>
							<Username>GGG#0405</Username>
						</StaggeredUser>
					</UserInfoContainer>
					<UserDropdownIcon />
					{openUserMenu && (
						<UserMenu>
							<UserMenuItem
								onClick={(e) => {
									alert("Settings");
									setOpenUserMenu(false);
									e.stopPropagation();
								}}
							>
								Settings
							</UserMenuItem>
							<UserMenuItem
								onClick={(e) => {
									alert("Dashboard");
									setOpenUserMenu(false);
									e.stopPropagation();
								}}
							>
								Dashboard
							</UserMenuItem>
						</UserMenu>
					)}
				</UserContainer>
			</TopContainer>
			<Header>
				<HeaderTitle>Recent Checkouts</HeaderTitle>
				<Input
					width="405px"
					type="text"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder="Search product, order, ..."
				/>
				<HeaderTitle>
					<Selector value={selectorValue} onChange={(value) => setSelectorValue(value)} options={["Day", "Week", "All"]} />
				</HeaderTitle>
			</Header>
			<CheckoutContainer>
				{checkoutdata.map((el, i) => {
					return (
						<CheckoutItem>
							<CheckoutText>{el.id}</CheckoutText>
							<CheckoutText>{el.storeName}</CheckoutText>
							<CheckoutText>{el.productName}</CheckoutText>
							<CheckoutText>{el.size}</CheckoutText>
							<CheckoutText>{el.orderNumber}</CheckoutText>
							<CheckoutText>
								<RemoveCheckoutItem />
							</CheckoutText>
						</CheckoutItem>
					);
				})}
			</CheckoutContainer>
			<ChartContainer>
				<ChartComponent data={graphdata} />
			</ChartContainer>
		</Container>
	);
};

export default Dashboard;

const Container = styled.div`
	width: 100%;
	height: 100%;

	color: white;

	display: flex;
	flex-direction: column;
`;

const TopContainer = styled.div`
	height: 208px;
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding-left: 47px;
	padding-right: 47px;

	background: rgba(45, 45, 45, 0.6);
`;

const TopLeftContainer = styled.div`
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 28px;
`;

const UserContainer = styled.div`
	width: 300px;
	height: 80px;

	background: #313131;
	border-radius: 10px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding-left: 10px;
	padding-right: 16px;

	cursor: pointer;

	position: relative;

	&:hover {
		filter: brightness(110%);
	}
`;

const UserMenu = styled.div`
	position: absolute;
	right: 0;
	top: 100%;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	border-radius: 5px;

	gap: 2px;

	overflow: hidden;
`;

const UserMenuItem = styled.div`
	width: 176px;
	height: 43px;

	padding-left: 30px;

	display: flex;
	align-items: center;

	font-weight: 500;
	font-size: 20px;
	line-height: 24px;

	color: #cccccc;

	background: #515151;
`;

const UserInfoContainer = styled.div`
	display: flex;
	align-items: center;
`;

const IconWrapper = styled.div`
	position: relative;
`;

const UserIcon = styled.img`
	width: 60px;
	height: 60px;

	border-radius: 50%;
`;

const UserStatus = styled.div<{ color: string }>`
	position: absolute;
	right: -3px;
	bottom: 6px;

	width: 18px;
	height: 18px;

	border: 2px solid #282828;
	border-radius: 50%;

	background: ${({ color }) => color};
`;

const StaggeredUser = styled.div`
	margin-left: 12px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	gap: 2px;
`;

const UserGreeting = styled.div`
	font-weight: 500;
	font-size: 17px;
	line-height: 21px;

	color: #757575;
`;

const Username = styled.div`
	font-weight: 500;
	font-size: 23px;
	line-height: 28px;

	color: #cccccc;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding-left: 30px;
	padding-right: 30px;

	margin-top: 20px;
`;

const HeaderTitle = styled.div`
	font-weight: 700;
	font-size: 25px;
	line-height: 30px;

	color: #cccccc;
`;

const CheckoutContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	gap: 16px;

	margin-top: 20px;

	height: 310px;
	width: 100%;

	padding-left: 30px;
	padding-right: 30px;

	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0;
	}
`;

const CheckoutItem = styled.div`
	width: 100%;
	height: 63px;
	min-height: 63px;

	background: rgba(50, 50, 50, 0.8);
	border-radius: 10px;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	padding-left: 20px;
`;

const CheckoutText = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	padding-right: 10px;

	&:nth-child(1) {
		font-weight: 400;
		font-size: 25px;
		line-height: 30px;

		color: #cccccc;

		width: 182px;
		max-width: 182px;
	}

	&:nth-child(2) {
		font-weight: 600;
		font-size: 25px;
		line-height: 30px;

		color: #cccccc;

		width: 349px;
		max-width: 349px;
	}

	&:nth-child(3) {
		font-weight: 400;
		font-size: 25px;
		line-height: 30px;

		color: #cccccc;

		width: 438px;
		max-width: 438px;
	}

	&:nth-child(4) {
		font-weight: 400;
		font-size: 25px;
		line-height: 30px;

		color: #cccccc;

		width: 253px;
		max-width: 253px;
	}

	&:nth-child(5) {
		font-weight: 400;
		font-size: 25px;
		line-height: 30px;

		color: #cccccc;

		width: 310px;
		max-width: 310px;
	}

	&:nth-child(6) {
		height: 100%;
		display: flex;
		align-items: center;
	}
`;

const ChartContainer = styled.div`
	width: 100%;
	height: 360px;
	margin-top: 20px;

	padding-left: 30px;
	padding-right: 30px;
`;
