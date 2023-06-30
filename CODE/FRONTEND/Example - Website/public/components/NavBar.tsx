import styled from "styled-components";
import { useState, useEffect } from "react";

import { ReactComponent as NavBarLogo } from "public/assets/navbarlogo.svg";

import { ReactComponent as ItemsIcon } from "public/assets/items.svg";
import { ReactComponent as GasIcon } from "public/assets/gas.svg";
import { ReactComponent as PriceIcon } from "public/assets/price.svg";

import { Navigation } from "public/interfaces/Navigation";

interface INavigation {
	value: Navigation;
	changeValue: (value: Navigation) => void;
}

const NavBar = ({ value, changeValue }: INavigation) => {
	const [price, setPrice] = useState<number>(0);
	const [gas, setGas] = useState<number>(0);
	const [items, setItems] = useState<number>(0);

	useEffect(() => {
		//Fetch all the required data over here
		setPrice(2421.12);
		setGas(2341);
		setItems(142312342);
	}, []);

	return (
		<Container>
			<LeftContainer>
				<NavBarLogo />
				<StackedContainer gap="2px" marginLeft="18px">
					<CompanyName className="name">Micron Labs</CompanyName>
					<Version>Beta</Version>
				</StackedContainer>
				<Divider leftMargin="25px" rightMargin="34px" />
				<LinkContainer>
					<Link
						active={value === Navigation.Mints}
						onClick={() => {
							changeValue(Navigation.Mints);
						}}
					>
						Live Mints
					</Link>
					<Link
						active={value === Navigation.Sales}
						onClick={() => {
							changeValue(Navigation.Sales);
						}}
					>
						Live Sales
					</Link>
					<Link
						active={value === Navigation.Trending}
						onClick={() => {
							changeValue(Navigation.Trending);
						}}
					>
						Trending
					</Link>
					<Link
						active={value === Navigation.Calendar}
						onClick={() => {
							changeValue(Navigation.Calendar);
						}}
					>
						Calendar
					</Link>
				</LinkContainer>
				<Divider leftMargin="34px" rightMargin="29px" />
				<LinkContainer>
					<Link
						active={value === Navigation.Alerts}
						onClick={() => {
							changeValue(Navigation.Alerts);
						}}
					>
						Alerts
					</Link>
					<Link
						active={value === Navigation.Toolkit}
						onClick={() => {
							changeValue(Navigation.Toolkit);
						}}
					>
						Toolkit
					</Link>
				</LinkContainer>
				<FounderOnly>Founder & Premium only</FounderOnly>
			</LeftContainer>
			<RightContainer>
				<InfoItem>
					<PriceIcon />$ {price}
				</InfoItem>
				<InfoItem>
					<GasIcon />
					{gas}
				</InfoItem>
				<InfoItem>
					<ItemsIcon />
					{items}
				</InfoItem>
			</RightContainer>
		</Container>
	);
};

export default NavBar;

const Container = styled.div`
	width: 100%;
	height: 76px;

	padding-left: 30px;
	padding-right: 40px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	background: #161a1e;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const LeftContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	min-width: 1000px;
`;

const StackedContainer = styled.div<{ gap?: string; marginLeft?: string }>`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	gap: ${(props) => props.gap || "0px"};
	margin-left: ${(props) => props.marginLeft || "0px"};
`;

const CompanyName = styled.div`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;

	color: #ffffff;
`;

const Version = styled.div`
	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	color: #8a8c8e;
`;

const Divider = styled.div<{ leftMargin?: string; rightMargin?: string }>`
	margin-left: ${(props) => props.leftMargin || "0px"};
	margin-right: ${(props) => props.rightMargin || "0px"};

	width: 2px;
	height: 28px;

	background: #2d3034;
	border-radius: 5px;
`;

const LinkContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 34px;
`;

const Link = styled.div<{ active: boolean }>`
	font-weight: 700;
	font-size: 14px;
	line-height: 17px;

	color: #8a8c8e;

	${({ active }) =>
		active
			? `
        background: linear-gradient(90deg, #F03246 0%, #F06E32 100%), rgba(255, 255, 255, 0.5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent; 
        `
			: ``}

	cursor: pointer;

	&:hover {
		color: #ffffff;
	}
`;

const FounderOnly = styled.div`
	padding: 5px 15px 5px 15px;

	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	color: #b8522d;

	background: rgba(240, 77, 61, 0.1);
	border-radius: 3px;

	margin-left: 18px;
`;

const RightContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 18px;

	min-width: 260px;
`;

const InfoItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 8px;

	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	color: #ffffff;
`;
