import { useState } from "react";
import styled from "styled-components";

import { LiveSales } from "public/interfaces/LiveSales";

import { ReactComponent as FilterIcon } from "public/assets/filtericon.svg";
import { ReactComponent as SearchIcon } from "public/assets/search.svg";
import { ReactComponent as EthIcon } from "public/assets/eth.svg";
import { ReactComponent as LooksRareIcon } from "public/assets/looksrare.svg";
import { ReactComponent as OpenSeaIcon } from "public/assets/opensea.svg";
import { ReactComponent as EtherScanIcon } from "public/assets/etherscan.svg";
import LiveSale from "public/components/LiveSale";
import DropDown from "public/components/DropDown";
import LineGraph from "public/components/LineGraph";
import BarGraph from "public/components/BarGraph";

const Sales = () => {
	const [activeItem, setActiveItem] = useState(0);

	return (
		<InnerContainer>
			<LeftContainer>
				<TitleContainer>
					<Title>Live Sales</Title>
					<GreenDot />
				</TitleContainer>
				<LiveSalesFilterContainer>
					<LiveSalesFilterTitleContainer>
						<FilterContainer>
							<FilterIcon />
							Filter
						</FilterContainer>
						<ClearAllButton>Clear All</ClearAllButton>
					</LiveSalesFilterTitleContainer>
					<LiveSalesFilterContent>
						<FilterItem>
							<FilterItemTitle>Collection</FilterItemTitle>
							<DropDown
								options={[
									{ value: "Type 1", label: "Type 1" },
									{ value: "Type 2", label: "Type 2" },
								]}
								title="Search Collection"
								onSelect={(val: any) => {
									if (!Array.isArray(val)) {
										//setModule(val.value);
									}
								}}
								search={true}
								icon={SearchIcon}
							/>
						</FilterItem>
						<FilterItem>
							<FilterItemTitle>Price Range</FilterItemTitle>
							<PriceRangeInputContainer>
								<PriceRangeSide>
									<EthIcon />
									<PriceRangeInput type={"text"} placeholder={"Min ETH"} />
								</PriceRangeSide>
								<PriceRangeSeperation />
								<PriceRangeSide>
									<EthIcon />
									<PriceRangeInput type={"text"} placeholder={"Max ETH"} />
								</PriceRangeSide>
							</PriceRangeInputContainer>
						</FilterItem>
						<FilterItem>
							<FilterItemTitle>Event Types</FilterItemTitle>
							<DropDown
								options={[
									{ value: "Type 1", label: "Type 1" },
									{ value: "Type 2", label: "Type 2" },
								]}
								title="Search Event Types"
								multiSelect={true}
								onSelect={(val: any) => {
									if (!Array.isArray(val)) {
										//setModule(val.value);
									}
								}}
							/>
						</FilterItem>
						<FilterItem>
							<FilterItemTitle>Marketplaces</FilterItemTitle>
							<DropDown
								options={[
									{ value: "Marketplace 1", label: "Marketplace 1" },
									{ value: "Marketplace 2", label: "Marketplace 2" },
								]}
								title="Search Marketplaces"
								multiSelect={true}
								onSelect={(val: any) => {
									if (!Array.isArray(val)) {
										//setModule(val.value);
									}
								}}
							/>
						</FilterItem>
					</LiveSalesFilterContent>
				</LiveSalesFilterContainer>
				<LiveSalesContainer>
					{[...Array(10)].map((x, i) => (
						<LiveSale
							index={i}
							iconURL="https://cryptopunks.app/cryptopunks/cryptopunk1871.png"
							name="CryptoPunks"
							number="#1234"
							timing="3s ago"
							price="31.512 ETH"
							sale={LiveSales.Sale}
							saleName="Sale"
							clickEtherScan={(index: number) => alert(`Clicked EtherScan for id ${index}`)}
							clickOpenSea={(index: number) => alert(`Clicked OpenSea for id ${index}`)}
							clickLooksRare={(index: number) => alert(`Clicked LooksRare for id ${index}`)}
						/>
					))}
				</LiveSalesContainer>
			</LeftContainer>
			<RightContainer>
				<TopActiveCollectionsTitleContainer>
					<Title>Top Active Collections</Title>
					<ChangeTimeContainer>
						<ChangeTimeItem
							active={activeItem == 0}
							onClick={() => {
								setActiveItem(0);
							}}
						>
							5M
						</ChangeTimeItem>
						<ChangeTimeItem
							active={activeItem == 1}
							onClick={() => {
								setActiveItem(1);
							}}
						>
							30M
						</ChangeTimeItem>
						<ChangeTimeItem
							active={activeItem == 2}
							onClick={() => {
								setActiveItem(2);
							}}
						>
							1H
						</ChangeTimeItem>
						<ChangeTimeItem
							active={activeItem == 3}
							onClick={() => {
								setActiveItem(3);
							}}
						>
							1D
						</ChangeTimeItem>
						<ChangeTimeItem
							active={activeItem == 4}
							onClick={() => {
								setActiveItem(4);
							}}
						>
							1W
						</ChangeTimeItem>
					</ChangeTimeContainer>
				</TopActiveCollectionsTitleContainer>
				<TopActiveCollectionsContainer>
					<TopActiveCollectionContainer>
						<TopActiveColTopContainer>
							<TopActiveColIcon src={"https://cryptopunks.app/cryptopunks/cryptopunk1871.png"} />
							<TopActiveColStaggeredContainer>
								<div className="top">CryptoPunks</div>
								<div className="bottom">
									Total Supply: <span>21,234</span>
								</div>
							</TopActiveColStaggeredContainer>
							<TopActiveColButtonContainer>
								<TopActiveColButton onClick={() => null}>
									<LooksRareIcon />
								</TopActiveColButton>
								<TopActiveColButton onClick={() => null}>
									<OpenSeaIcon />
								</TopActiveColButton>
								<TopActiveColButton onClick={() => null}>
									<EtherScanIcon />
								</TopActiveColButton>
							</TopActiveColButtonContainer>
						</TopActiveColTopContainer>
						<SalesAndVolumeContainer>
							<SalesVolumeHalf>
								<StaggeredSalesVolumeText>
									<div className="top">Sales (5M)</div>
									<div className="bottom">62</div>
								</StaggeredSalesVolumeText>
							</SalesVolumeHalf>
							<SalesVolumeHalf>
								<StaggeredSalesVolumeText>
									<div className="top">Volume (5M)</div>
									<div className="bottom">
										<EthIcon /> <span>112.12</span>
									</div>
								</StaggeredSalesVolumeText>
							</SalesVolumeHalf>
						</SalesAndVolumeContainer>
						<LineGraph
							width={"432px"}
							height="100px"
							data={{
								data: [0.05, 0.12, 0.24, 0.2, 0.16, 0.08, 0.2, 0.05],
								labels: [1, 2, 3, 4, 5, 6, 7, 8],
							}}
						/>
						<BarGraph
							width={"432px"}
							height="40px"
							data={{
								data: [30, 5, 10, 20, 15, 10, 20, 30, 5, 10, 20, 15, 10, 20, 5, 9, 4, 8, 9, 10, 15, 10, 20, 5, 9, 4, 8, 9, 10, 15],
								labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
							}}
						/>
					</TopActiveCollectionContainer>
					<TopActiveCollectionContainer>
						<TopActiveColTopContainer>
							<TopActiveColIcon src={"https://cryptopunks.app/cryptopunks/cryptopunk1871.png"} />
							<TopActiveColStaggeredContainer>
								<div className="top">CryptoPunks</div>
								<div className="bottom">
									Total Supply: <span>21,234</span>
								</div>
							</TopActiveColStaggeredContainer>
							<TopActiveColButtonContainer>
								<TopActiveColButton onClick={() => null}>
									<LooksRareIcon />
								</TopActiveColButton>
								<TopActiveColButton onClick={() => null}>
									<OpenSeaIcon />
								</TopActiveColButton>
								<TopActiveColButton onClick={() => null}>
									<EtherScanIcon />
								</TopActiveColButton>
							</TopActiveColButtonContainer>
						</TopActiveColTopContainer>
						<SalesAndVolumeContainer>
							<SalesVolumeHalf>
								<StaggeredSalesVolumeText>
									<div className="top">Sales (5M)</div>
									<div className="bottom">62</div>
								</StaggeredSalesVolumeText>
							</SalesVolumeHalf>
							<SalesVolumeHalf>
								<StaggeredSalesVolumeText>
									<div className="top">Volume (5M)</div>
									<div className="bottom">
										<EthIcon /> <span>112.12</span>
									</div>
								</StaggeredSalesVolumeText>
							</SalesVolumeHalf>
						</SalesAndVolumeContainer>
						<LineGraph
							width={"432px"}
							height="100px"
							data={{
								data: [0.05, 0.12, 0.24, 0.2, 0.16, 0.08, 0.2, 0.05],
								labels: [1, 2, 3, 4, 5, 6, 7, 8],
							}}
						/>
						<BarGraph
							width={"432px"}
							height="40px"
							data={{
								data: [30, 5, 10, 20, 15, 10, 20, 30, 5, 10, 20, 15, 10, 20, 5, 9, 4, 8, 9, 10, 15, 10, 20, 5, 9, 4, 8, 9, 10, 15],
								labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
							}}
						/>
					</TopActiveCollectionContainer>
					<TopActiveCollectionContainer>
						<TopActiveColTopContainer>
							<TopActiveColIcon src={"https://cryptopunks.app/cryptopunks/cryptopunk1871.png"} />
							<TopActiveColStaggeredContainer>
								<div className="top">CryptoPunks</div>
								<div className="bottom">
									Total Supply: <span>21,234</span>
								</div>
							</TopActiveColStaggeredContainer>
							<TopActiveColButtonContainer>
								<TopActiveColButton onClick={() => null}>
									<LooksRareIcon />
								</TopActiveColButton>
								<TopActiveColButton onClick={() => null}>
									<OpenSeaIcon />
								</TopActiveColButton>
								<TopActiveColButton onClick={() => null}>
									<EtherScanIcon />
								</TopActiveColButton>
							</TopActiveColButtonContainer>
						</TopActiveColTopContainer>
						<SalesAndVolumeContainer>
							<SalesVolumeHalf>
								<StaggeredSalesVolumeText>
									<div className="top">Sales (5M)</div>
									<div className="bottom">62</div>
								</StaggeredSalesVolumeText>
							</SalesVolumeHalf>
							<SalesVolumeHalf>
								<StaggeredSalesVolumeText>
									<div className="top">Volume (5M)</div>
									<div className="bottom">
										<EthIcon /> <span>112.12</span>
									</div>
								</StaggeredSalesVolumeText>
							</SalesVolumeHalf>
						</SalesAndVolumeContainer>
						<LineGraph
							width={"432px"}
							height="100px"
							data={{
								data: [0.05, 0.12, 0.24, 0.2, 0.16, 0.08, 0.2, 0.05],
								labels: [1, 2, 3, 4, 5, 6, 7, 8],
							}}
						/>
						<BarGraph
							width={"432px"}
							height="40px"
							data={{
								data: [30, 5, 10, 20, 15, 10, 20, 30, 5, 10, 20, 15, 10, 20, 5, 9, 4, 8, 9, 10, 15, 10, 20, 5, 9, 4, 8, 9, 10, 15],
								labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
							}}
						/>
					</TopActiveCollectionContainer>
				</TopActiveCollectionsContainer>
				<TopActiveCollectionsFade />
			</RightContainer>
		</InnerContainer>
	);
};

export default Sales;

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
	width: 1312px;
	min-width: 1312px;
	height: 100%;
`;

const RightContainer = styled.div`
	width: 480px;
	min-width: 480px;
	height: 100%;
	position: relative;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;

	margin-top: 23px;
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

const GreenDot = styled.div`
	width: 10px;
	height: 10px;

	background: #63c393;
	border-radius: 7px;
	margin-left: 4px;
`;

const TopActiveCollectionsTitleContainer = styled(TitleContainer)`
	justify-content: space-between;
`;

const ChangeTimeContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ChangeTimeItem = styled.div<{ active?: boolean }>`
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

const LiveSalesFilterContainer = styled.div`
	width: 1312px;
	height: 171px;

	background: #17191b;
	border-radius: 5px;

	margin-top: 13px;
`;

const LiveSalesFilterTitleContainer = styled.div`
	width: 100%;
	height: 42px;

	background: #222528;
	border-radius: 6px 6px 0px 0px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0 17px 0 22px;
`;

const FilterContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 9px;

	font-weight: 600;
	font-size: 12px;
	line-height: 15px;

	color: #8b8c8d;
`;

const ClearAllButton = styled.button`
	font-weight: 600;
	font-size: 12px;
	line-height: 15px;

	color: #8b8c8d;

	&:hover {
		color: white;
	}
`;

const LiveSalesFilterContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: calc(100% - 42px);

	gap: 11px;
`;

const FilterItem = styled.div`
	display: flex;
	flex-direction: column;
	aling-items: flex-start;
	justify-content: center;

	width: 300px;

	gap: 13px;
`;

const FilterItemTitle = styled.div`
	font-weight: 700;
	font-size: 14px;
	line-height: 17px;

	margin-left: 10px;

	color: #ffffff;
`;

const LiveSalesContainer = styled.div`
	width: 100%;
	height: calc(889px - 186px);

	display: flex;
	flex-direction: column;
	align-items: center;

	background: #17191b;
	border-radius: 5px;

	margin-top: 15px;

	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0;
	}
`;

const FilterInputContainer = styled.div`
	background: #222528;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 3px;

	outline: none;

	color: white;

	display: flex;
	justify-content: space-between;
	align-items: center;

	height: 44px;
`;

const SearchCollectionContainer = styled(FilterInputContainer)`
	padding-left: 20px;
	padding-right: 19px;
`;

const SearchCollectionInput = styled.input`
	border: none;
	outline: none;
	background: transparent;

	width: 270px;

	color: white;
`;

const PriceRangeInputContainer = styled(FilterInputContainer)`
	padding: 0 18px;
`;

const PriceRangeSide = styled.div`
	width: calc(50% - 12px;);

	display: flex;
	align-items: center;
	gap: 3px;

	& path {
		fill: #8b8c8d;
	}
`;

const PriceRangeSeperation = styled.div`
	width: 2px;
	height: 22px;

	background: #383a3d;
	border-radius: 3px;
`;

const PriceRangeInput = styled.input`
	border: none;
	outline: none;
	background: transparent;

	width: 100px;

	color: white;
`;

const TopActiveCollectionsContainer = styled.div`
	width: 100%;
	margin-top: 13px;
	height: 889px;

	padding-bottom: 20px;

	overflow-y: auto;
	::-webkit-scrollbar {
		width: 0;
	}
`;

const TopActiveCollectionsFade = styled.div`
	width: 100%;
	height: 49px;
	position: absolute;
	top: 889px;
	left: 0;

	background: linear-gradient(180deg, rgba(18, 20, 22, 0) 0%, #121416 100%);
`;

const TopActiveCollectionContainer = styled.div`
	width: 481px;
	height: 319px;

	background: #17191b;
	border-radius: 5px;

	padding: 13px 20px 24px 16px;

	&:not(:first-child) {
		margin-top: 14px;
	}
`;

const TopActiveColTopContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;

	justify-content: space-between;
`;

const TopActiveColIcon = styled.img`
	width: 46px;
	height: 46px;
	border-radius: 4px;
`;

const TopActiveColStaggeredContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: calc(100% - 46px - 26px - 50px - 36px);

	gap: 4px;

	.top {
		font-weight: 700;
		font-size: 14px;

		color: #ffffff;
	}

	.bottom {
		font-weight: 600;
		font-size: 14px;

		color: #57595d;

		& span {
			color: #f06e32;
		}
	}
`;

const TopActiveColButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 6px;
`;

const TopActiveColButton = styled.button`
	width: 25px;
	height: 25px;

	display: grid;
	align-items: center;
	justify-content: center;

	background: #222528;
	border-radius: 3px;

	&:hover {
		filter: brightness(115%);
	}
`;

const SalesAndVolumeContainer = styled.div`
	width: 100%;
	margin-top: 13px;

	display: flex;
	justify-content: space-between;
`;

const SalesVolumeHalf = styled.div`
	width: calc(50% - 4.5px);
	height: 55px;

	background: #222528;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 3px;

	padding-left: 16px;
	display: flex;
	align-items: center;
`;

const StaggeredSalesVolumeText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	gap: 4px;

	.top {
		font-weight: 600;
		font-size: 14px;

		color: #8a8c8e;
	}

	.bottom {
		font-weight: 700;
		font-size: 14px;

		color: #ffffff;

		display: flex;
		align-items: center;

		& span {
			margin-left: 2px;
		}
	}
`;
