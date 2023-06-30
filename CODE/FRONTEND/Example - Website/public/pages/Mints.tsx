import { useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as SwapMintsIcon } from "public/assets/swapmints.svg";
import { ReactComponent as FilterMintsIcon } from "public/assets/filtermints.svg";
import { ReactComponent as TimeMintsIcon } from "public/assets/timemints.svg";
import { ReactComponent as OpenUrlIcon } from "public/assets/openUrl.svg";

import { ReactComponent as EtherScanIcon } from "public/assets/etherscan.svg";
import { ReactComponent as LooksRareIcon } from "public/assets/looksrare.svg";
import { ReactComponent as OpenSeaIcon } from "public/assets/opensea.svg";
import { ReactComponent as InfoIcon } from "public/assets/info.svg";

import { ReactComponent as AlertIcon } from "public/assets/alert.svg";
import { ReactComponent as ProfilePic } from "public/assets/profilePic.svg";

import { FreeEnum } from "public/interfaces/Mints";
import LiveMint from "public/components/LiveMint";
import TopMint from "public/components/TopMint";
import DistributionCircle from "public/components/DistributionCircle";

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

const Mints = () => {
	const [selectTimeOpen, setSelectTimeOpen] = useState(false);
	const [selectFiltersOpen, setSelectFiltersOpen] = useState(false);
	const [free, setShowFree] = useState<FreeEnum>(FreeEnum.All);
	const [sortActive, setSortActive] = useState(false);

	useEffect(() => {
		const handleClick = (e: any) => {
			if (e.target.id == "" && (["svg", "path"].includes(e.target.nodeName) || !e.target.className.includes("filterItem"))) {
				setSelectFiltersOpen(false);
				setSelectTimeOpen(false);
			}
		};

		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, []);

	return (
		<InnerContainer>
			<LeftContainer>
				<TitleContainer>
					<Title>Top Mints</Title>
					<RightTitleContainer>
						<FreeButtonsContainer>
							<FreeButton active={free === FreeEnum.All} onClick={() => setShowFree(FreeEnum.All)}>
								All
							</FreeButton>
							<FreeButton active={free === FreeEnum.Free} onClick={() => setShowFree(FreeEnum.Free)}>
								Free
							</FreeButton>
						</FreeButtonsContainer>
						<Divider />
						<TopMintsButtonContainer>
							<TopMintsButtonOuter>
								<TopMintsButton
									id="changeTimeBtn"
									onClick={() => {
										setSelectTimeOpen(!selectTimeOpen);
										setSelectFiltersOpen(false);
									}}
								>
									<TimeMintsIcon />
								</TopMintsButton>
								<ChangeTimeDropDown open={selectTimeOpen} />
							</TopMintsButtonOuter>
							<TopMintsButtonOuter>
								<TopMintsButton
									id="selectFilterBtn"
									onClick={() => {
										setSelectFiltersOpen(!selectFiltersOpen);
										setSelectTimeOpen(false);
									}}
								>
									<FilterMintsIcon />
								</TopMintsButton>
								<SelectFilterDropDown open={selectFiltersOpen} />
							</TopMintsButtonOuter>
							<TopMintsButtonOuter>
								<TopMintsButton
									onClick={() => {
										setSortActive(!sortActive);
									}}
								>
									<SwapMintsIcon style={{ transform: `rotate(${sortActive ? "180deg) translateX(-2px)" : "0deg)"}` }} />
								</TopMintsButton>
							</TopMintsButtonOuter>
						</TopMintsButtonContainer>
					</RightTitleContainer>
				</TitleContainer>
				<TopMintsContainer>
					{[...Array(16)].map(() => (
						<TopMint
							name="CryptoPunks"
							imgURL="https://cryptopunks.app/cryptopunks/cryptopunk1871.png"
							averagePrice={31.5}
							totalPendings={21}
							value={333}
						/>
					))}
				</TopMintsContainer>
			</LeftContainer>
			<MiddleContainer>
				<SelectedMintInfoContainer>
					<SelectedMintTopContainer>
						<LeftSelectedMintContainer>
							<MintProfilePicture src="https://cryptopunks.app/cryptopunks/cryptopunk1871.png" />
							<StaggerdText>
								<MintTitle>CryptoPunks</MintTitle>
								<Wallet>
									0x09as023dadac934casdsac32cacscasaca <StyledOpenUrlIcon />
								</Wallet>
							</StaggerdText>
						</LeftSelectedMintContainer>
						<RightSelectedMintContainer>
							<StaggerdText style={{ gap: "7px" }}>
								<FloorPrice>Floor Price</FloorPrice>
								<FloorPriceValue>45.115 ETH</FloorPriceValue>
							</StaggerdText>
							<FloorPriceLine />
						</RightSelectedMintContainer>
					</SelectedMintTopContainer>
					<SelectedMintTagsContainer>
						<TagContainer>2,134 Total Supply</TagContainer>
						<TagContainer style={{ border: "1px solid rgba(255, 255, 255, 0.1)", background: "#222528", color: "white" }}>
							7.5% Royalty
						</TagContainer>
						<Seperator />
						<SelectedMintActionButton>
							<EtherScanIcon />
						</SelectedMintActionButton>
						<SelectedMintActionButton>
							<LooksRareIcon />
						</SelectedMintActionButton>
						<SelectedMintActionButton>
							<OpenSeaIcon />
						</SelectedMintActionButton>
						<SelectedMintActionButton>
							<InfoIcon />
						</SelectedMintActionButton>
					</SelectedMintTagsContainer>
					<SeperationLine />
					<SelectedMintDescription>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
						metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
						sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent
						auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor
						urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
					</SelectedMintDescription>
					<SelectedMintAlertContainer>
						<AlertIcon /> Always DYOR and confirm all URLs are legit, including OpenSea.
					</SelectedMintAlertContainer>
				</SelectedMintInfoContainer>
				<TopMintersContainer>
					<TopMintersHeader>
						<TopMintersTitle>Top Minters</TopMintersTitle>
						<Seperator />
						<TopMintersHeaderLabel>Address</TopMintersHeaderLabel>
						<TopMintersHeaderLabel>Minted</TopMintersHeaderLabel>
						<TopMintersHeaderLabel>Avg. Mint Price</TopMintersHeaderLabel>
						<TopMintersHeaderLabel>Last Mint</TopMintersHeaderLabel>
						<TopMintersHeaderLabel>Method</TopMintersHeaderLabel>
					</TopMintersHeader>
					<TopMintersInnerContainer>
						{[...Array(16)].map(() => (
							<TopMintersListRow>
								<div>1</div>
								<div>#1234</div>
								<div>
									0XA8AD...AD2A <StyledOpenUrlIcon />
								</div>
								<div>23</div>
								<div>0.67</div>
								<div>45m ago</div>
								<div>Mint</div>
							</TopMintersListRow>
						))}
					</TopMintersInnerContainer>
				</TopMintersContainer>
				<MiddleLowerContainer>
					<MiddleLowerInnerContainer>
						<MiddleLowerContainerTitle>Holders Distribution</MiddleLowerContainerTitle>
						<LastUpdatedHoldersDistribution>Last updated: 2m ago</LastUpdatedHoldersDistribution>
						<HoldersDistributionContainer>
							<DistributionCircle items={holdersDistributionItems} />
							<HoldersLegend>
								{holdersDistributionItems.map((item, i) => (
									<HoldersLegendItem key={i}>
										<div>
											<HoldersLegendDot background={item.color} /> {item.extra}
										</div>
										<HoldersPercentage>{item.percentage}%</HoldersPercentage>
									</HoldersLegendItem>
								))}
							</HoldersLegend>
						</HoldersDistributionContainer>
					</MiddleLowerInnerContainer>
					<MiddleLowerInnerContainer>
						<MiddleLowerContainerTitle style={{ left: "21px" }}>Whale/Fame Holders Minted</MiddleLowerContainerTitle>
						<WhaleFameHoldersInnerContainer>
							{[...Array(5)].map(() => (
								<WhaleFameHolder>
									<ProfilePic />
									<WhaleFameHolderDetails>
										<WhaleFameAddress>0XA8AD...AD2A</WhaleFameAddress>
										<WhaleFameAmountMinted>
											<span>1</span> minted
										</WhaleFameAmountMinted>
									</WhaleFameHolderDetails>
									<StyledOpenUrlIcon className="open" />
								</WhaleFameHolder>
							))}
						</WhaleFameHoldersInnerContainer>
					</MiddleLowerInnerContainer>
				</MiddleLowerContainer>
			</MiddleContainer>
			<RightContainer>
				<TitleContainer>
					<Title>
						Live Mints <Circle />
					</Title>
					<Connected>Connected</Connected>
				</TitleContainer>
				<LiveMintsContainer>
					{[...Array(16)].map(() => (
						<LiveMint
							name="CryptoPunks"
							imgURL="https://cryptopunks.app/cryptopunks/cryptopunk1871.png"
							gasPrice={13}
							ethValue={"(0.0021 ~ $0.14)"}
							price={0}
						/>
					))}
				</LiveMintsContainer>
			</RightContainer>
		</InnerContainer>
	);
};

export default Mints;

const InnerContainer = styled.div`
	width: 100%;
	height: calc(100vh - 76px);

	padding-left: 56px;
	padding-right: 56px;

	display: flex;
	align-items: center;
	justify-content: center;

	gap: 20px;
`;

const LeftContainer = styled.div`
	width: 480px;
	min-width: 480px;
	height: 100%;
`;

const MiddleContainer = styled.div`
	width: 804px;
	min-width: 804px;
	height: 100%;

	padding-top: 58px;
`;

const RightContainer = styled.div`
	width: 480px;
	min-width: 480px;
	height: 100%;
`;

const LiveMintsContainer = styled.div`
	height: calc(100% - 57px);
	width: 100%;

	margin-top: 12px;

	overflow-x: hidden;
	overflow-y: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 10px;

	padding-bottom: 12px;

	::-webkit-scrollbar {
		width: 0;
	}
`;

const TopMintsContainer = styled.div`
	height: calc(100% - 57px);
	width: 100%;

	margin-top: 10px;

	overflow-x: hidden;
	overflow-y: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 10px;

	padding-bottom: 12px;

	::-webkit-scrollbar {
		width: 0;
	}
`;

const TitleContainer = styled.div`
	width: 100%;

	margin-top: 23px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 18px;
	line-height: 22px;

	color: #ffffff;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 7px;
`;

const Circle = styled.div<{ color?: string }>`
	background: ${(props) => props.color || "#63C393"};

	width: 10px;
	height: 10px;
	border-radius: 50%;
`;

const Connected = styled.div`
	font-weight: 700;
	font-size: 10px;
	line-height: 12px;

	color: #8a8c8e;
`;

const TopMintsButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 6px;
`;

const RightTitleContainer = styled.div`
	display: flex;
	align-items: center;
`;

const Divider = styled.div`
	background: #2d3034;
	border-radius: 5px;
	width: 2px;
	height: 25px;

	margin-left: 9px;
	margin-right: 9px;
`;

const TopMintsButton = styled.button`
	outline: none;
	border: none;

	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	background: #222528;
	border-radius: 3px;

	cursor: pointer;

	&:hover {
		filter: brightness(130%);
	}

	& > svg,
	& > svg * {
		pointer-events: none;
	}
`;

const TopMintsButtonOuter = styled.div`
	width: 25px;
	height: 25px;

	position: relative;
`;

const FreeButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 6px;
`;

const FreeButton = styled.button<{ active: boolean }>`
	outline: none;
	border: none;

	width: 50px;
	height: 25px;

	background: ${(props) => (props.active ? "linear-gradient(90deg, #f03246 0%, #f06e32 100%), rgba(240, 77, 61, 0.1)" : "transparent")};
	border-radius: 2px;

	font-weight: 700;
	font-size: 10px;
	line-height: 12px;

	color: ${(props) => (props.active ? "#ffffff" : "#8A8C8E")};

	cursor: pointer;

	${(props) =>
		!props.active &&
		`
    &:hover {
        background: #222528;
    }
    `}
`;

const SelectedMintInfoContainer = styled.div`
	width: 100%;
	height: 329px;

	background: #161a1e;
	border-radius: 5px;

	padding: 15px 20px 17px 20px;
`;

const SelectedMintTopContainer = styled.div`
	background: #17191b;
	border-radius: 5px;

	width: 100%;
	height: 58px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const LeftSelectedMintContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 17px;
`;

const RightSelectedMintContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 13px;

	margin-right: 8px;
`;

const MintProfilePicture = styled.img`
	width: 46px;
	height: 46px;

	overflow: hidden;

	border-radius: 4px;
`;

const StaggerdText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	gap: 4px;
`;

const MintTitle = styled.div`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;

	color: #ffffff;
`;

const Wallet = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 7px;

	font-weight: 600;
	font-size: 14px;
	line-height: 17px;

	color: #8b8c8d;

	& > span {
		color: rgba(240, 110, 50, 1);
	}
`;

const FloorPriceLine = styled.div`
	width: 4px;
	height: 50px;

	background: linear-gradient(90deg, #f03246 0%, #f06e32 100%), linear-gradient(94.52deg, #637eda 0%, #4a66c5 100%);
	border-radius: 1px;
`;

const FloorPrice = styled.div`
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;
	color: #8b8c8d;

	margin-right: 6px;
`;

const FloorPriceValue = styled.div`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: #ffffff;
`;

const SelectedMintTagsContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 19px;
`;

const TagContainer = styled.div`
	height: 25px;

	background: rgba(240, 77, 61, 0.1);
	border-radius: 3px;

	display: flex;
	align-items: center;
	justify-content: center;

	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	color: #b8522d;

	padding: 0 14px;

	margin-right: 8px;
`;

const Seperator = styled.div`
	width: 2px;
	height: 25px;

	background: #383a3d;
	border-radius: 2px;

	margin-left: 1px;
	margin-right: 9px;
`;

const SelectedMintActionButton = styled.button`
	outline: none;
	border: none;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 25px;
	height: 25px;

	background: #222528;
	border-radius: 3px;

	cursor: pointer;
	margin-right: 5px;

	&:hover {
		filter: brightness(130%);
	}

	padding: 0;
`;

const SeperationLine = styled.div`
	width: 100%;
	height: 1px;

	background: rgba(196, 196, 196, 0.1);
	transform: matrix(1, 0, 0, -1, 0, 0);

	margin-top: 14px;
`;

const SelectedMintDescription = styled.div`
	height: 105px;
	width: 100%;
	font-weight: 600;
	font-size: 12px;

	color: #8b8c8d;

	margin-top: 14px;
`;

const SelectedMintAlertContainer = styled.div`
	width: 767px;
	height: 42px;

	background: #222528;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 3px;

	margin-top: 19px;

	font-weight: 700;
	font-size: 11px;

	color: #f86868;

	display: flex;
	align-items: center;

	padding-left: 17px;

	& svg {
		width: 20px;
		height: auto;
		margin-right: 11px;
	}
`;

const TopMintersContainer = styled.div`
	width: 100%;
	height: 329px;

	background: #161a1e;
	border-radius: 5px;

	margin-top: 10px;
`;

const TopMintersHeader = styled.div`
	width: 100%;
	height: 54px;

	background: #1b1f23;
	border-radius: 5px 5px 0px 0px;

	display: flex;
	align-items: center;
	padding-left: 27px;
	position: relative;
	& > div:nth-child(3) {
		left: 21.2%;
	}
	& > div:nth-child(4) {
		left: 41.2%;
	}
	& > div:nth-child(5) {
		left: 52.2%;
	}
	& > div:nth-child(6) {
		left: 69.9%;
	}
	& > div:nth-child(7) {
		left: 88.9%;
	}
`;

const TopMintersTitle = styled.div`
	font-weight: 700;
	font-size: 16px;

	color: #ffffff;

	margin-right: 20px;
`;

const TopMintersHeaderLabel = styled.div`
	font-weight: 600;
	font-size: 11.3607px;

	color: #8b8c8d;

	position: absolute;
`;

const TopMintersInnerContainer = styled.div`
	height: calc(100% - 67px);
	width: 100%;
	padding-top: 3px;

	padding-right: 20px;
	padding-left: 20px;

	& > div:last-child {
		border-bottom: none;
	}

	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
`;

const TopMintersListRow = styled.div`
	height: 51px;
	width: 100%;
	border-bottom: 1px solid rgba(196, 196, 196, 0.1);

	display: flex;
	align-items: center;
	position: relative;

	& > div {
		position: absolute;
	}

	& > div:nth-child(1) {
		font-weight: 800;
		font-size: 13px;

		color: #ffffff;
		left: 6px;
	}

	& > div:nth-child(2) {
		font-weight: 500;
		font-size: 11.36px;

		color: #ffffff;
		left: 20px;
	}

	& > div:nth-child(3) {
		font-weight: 700;
		font-size: 11.36px;

		color: #ffffff;
		left: 151px;

		svg {
			margin-left: 10px;
		}
	}

	& > div:nth-child(4) {
		font-weight: 500;
		font-size: 12.17px;

		color: #ffffff;
		left: 314px;
	}

	& > div:nth-child(5) {
		font-weight: 500;
		font-size: 12.17px;

		color: #ffffff;
		left: 401px;
	}

	& > div:nth-child(6) {
		font-weight: 500;
		font-size: 12.17px;

		color: rgba(255, 255, 255, 0.75);
		left: 540px;
	}

	& > div:nth-child(7) {
		font-weight: 700;
		font-size: 12px;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 51px;
		height: 25px;

		background: rgba(240, 77, 61, 0.1);
		border-radius: 3px;

		color: #b8522d;
		left: 697px;
	}
`;

const MiddleLowerContainer = styled.div`
	width: 100%;
	margin-top: 10px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const MiddleLowerInnerContainer = styled.div`
	width: 397px;
	height: 216px;

	background: #161a1e;
	border-radius: 5px;
	position: relative;
`;

const MiddleLowerContainerTitle = styled.div`
	font-weight: 700;
	font-size: 16px;
	color: #ffffff;
	position: absolute;
	top: 16px;
	left: 26px;
`;

const LastUpdatedHoldersDistribution = styled.div`
	font-weight: 600;
	font-size: 10px;

	color: #8b8c8d;

	position: absolute;
	top: 20px;
	right: 24px;
`;

const HoldersDistributionContainer = styled.div`
	position: absolute;
	left: 26px;
	bottom: 22px;

	width: calc(100% - 52px);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const HoldersLegend = styled.div`
	width: 136px;
	height: 120px;

	overflow-y: auto;

	& > div:last-child {
		margin-bottom: 0;
	}
`;

const HoldersLegendItem = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;

	& > div:nth-child(1) {
		font-weight: 700;
		font-size: 14px;

		color: #ffffff;

		display: flex;
		align-items: center;
	}

	margin-bottom: 16px;
`;

const HoldersLegendDot = styled.div<{ background: string }>`
	width: 12px;
	height: 12px;

	background: ${(props) => props.background};
	border-radius: 30px;

	margin-right: 9px;
`;

const HoldersPercentage = styled.div`
	font-weight: 700;
	font-size: 14px;

	color: #8a8c8e;
`;

const WhaleFameHoldersInnerContainer = styled.div`
	width: calc(100% - 28px);
	margin-left: 14px;
	margin-top: 49px;

	& > div:nth-child(odd) {
		margin-right: 6px;
	}
`;

const WhaleFameHolder = styled.div`
	width: calc(50% - 3px);
	height: 46px;

	background: #1b1f23;
	border: 1px solid rgba(255, 255, 255, 0.06);
	border-radius: 3px;
	margin-bottom: 8px;
	float: left;
	padding-left: 7px;

	display: flex;
	align-items: center;
	gap: 10px;
	position: relative;

	& > svg.open {
		position: absolute;
		right: 13px;
		bottom: 8px;
	}
`;

const WhaleFameHolderDetails = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	gap: 3px;
`;

const WhaleFameAddress = styled.div`
	font-weight: 700;
	font-size: 11.36px;

	color: #ffffff;
`;

const WhaleFameAmountMinted = styled.div`
	font-weight: 600;
	font-size: 10px;

	color: rgba(139, 140, 141, 1);

	& span {
		color: rgba(184, 82, 45, 1);
	}
`;

const StyledOpenUrlIcon = styled(OpenUrlIcon)`
	cursor: pointer;
`;

/// ChangeTime Component
interface IChangeTimeDropDown {
	open: boolean;
}

const ChangeTimeDropDown = ({ open }: IChangeTimeDropDown) => {
	const [activeItem, setActiveItem] = useState(0);

	return (
		<ChangeTimeDropDownContainer open={open} id="changeTime">
			<ChangeTimeDropDownItem
				className="filterItem"
				active={activeItem == 0}
				onClick={() => {
					setActiveItem(0);
				}}
			>
				1M
			</ChangeTimeDropDownItem>
			<ChangeTimeDropDownItem
				className="filterItem"
				active={activeItem == 1}
				onClick={() => {
					setActiveItem(1);
				}}
			>
				5M
			</ChangeTimeDropDownItem>
			<ChangeTimeDropDownItem
				className="filterItem"
				active={activeItem == 2}
				onClick={() => {
					setActiveItem(2);
				}}
			>
				30M
			</ChangeTimeDropDownItem>
			<ChangeTimeDropDownItem
				className="filterItem"
				active={activeItem == 3}
				onClick={() => {
					setActiveItem(3);
				}}
			>
				1H
			</ChangeTimeDropDownItem>
			<ChangeTimeDropDownItem
				className="filterItem"
				active={activeItem == 4}
				onClick={() => {
					setActiveItem(4);
				}}
			>
				4H
			</ChangeTimeDropDownItem>
			<ChangeTimeDropDownItem
				className="filterItem"
				active={activeItem == 5}
				onClick={() => {
					setActiveItem(5);
				}}
			>
				1D
			</ChangeTimeDropDownItem>
		</ChangeTimeDropDownContainer>
	);
};

const ChangeTimeDropDownContainer = styled.div<{ open: boolean }>`
	width: 244px;
	height: 42px;

	background: #222528;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.25);
	border-radius: 3px;

	position: absolute;
	top: 31px;
	right: 0;

	display: ${(props) => (props.open ? "flex" : "none")};
	justify-content: space-between;
	align-items: center;

	padding: 0px 15px;

	z-index: 20;
`;

const ChangeTimeDropDownItem = styled.div<{ active?: boolean }>`
	height: 25px;
	width: 35px;
	display: flex;
	justify-content: center;
	align-items: center;

	background: ${(props) => (props.active ? "rgba(240, 77, 61, 0.1)" : "transparent")};
	color: ${(props) => (props.active ? "#F06735" : "#8A8C8E")};
	border-radius: 2px;

	cursor: pointer;

	font-weight: 700;
	font-size: 10px;
`;

/// SelectFilter Component
interface ISelectFilterDropDown {
	open: boolean;
}

const SelectFilterDropDown = ({ open }: ISelectFilterDropDown) => {
	const [activeFilter, setActiveFilter] = useState<number | null>(null);

	return (
		<SelectFilterDropDownContainer open={open} id="selectFilter">
			<FilterItem>
				Pending
				<FilterItemCheckbox
					className="filterItem"
					selected={activeFilter == 0}
					onClick={() => {
						if (activeFilter == 0) {
							setActiveFilter(null);
						} else {
							setActiveFilter(0);
						}
					}}
				/>
			</FilterItem>
			<FilterItem>
				Total Mints
				<FilterItemCheckbox
					className="filterItem"
					selected={activeFilter == 1}
					onClick={() => {
						if (activeFilter == 1) {
							setActiveFilter(null);
						} else {
							setActiveFilter(1);
						}
					}}
				/>
			</FilterItem>
			<FilterItem>
				Average Price
				<FilterItemCheckbox
					className="filterItem"
					selected={activeFilter == 2}
					onClick={() => {
						if (activeFilter == 2) {
							setActiveFilter(null);
						} else {
							setActiveFilter(2);
						}
					}}
				/>
			</FilterItem>
			<FilterItem>
				Mints Percentage
				<FilterItemCheckbox
					className="filterItem"
					selected={activeFilter == 3}
					onClick={() => {
						if (activeFilter == 3) {
							setActiveFilter(null);
						} else {
							setActiveFilter(3);
						}
					}}
				/>
			</FilterItem>
		</SelectFilterDropDownContainer>
	);
};

const SelectFilterDropDownContainer = styled.div<{ open: boolean }>`
	width: 244px;
	height: 136px;

	background: #222528;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.25);
	border-radius: 3px;

	position: absolute;
	top: 31px;
	right: 0;

	display: ${(props) => (props.open ? "flex" : "none")};
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	padding: 17px 22px;

	z-index: 20;
`;

const FilterItem = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;

	font-weight: 700;
	font-size: 12px;

	color: #8a8c8e;
`;

const FilterItemCheckbox = styled.div<{ selected: boolean }>`
	background: ${(props) => (props.selected ? "#F06735" : "#333537")};
	border-radius: 20px;
	width: 16px;
	height: 16px;
	border-radius: 50%;

	cursor: pointer;
`;
