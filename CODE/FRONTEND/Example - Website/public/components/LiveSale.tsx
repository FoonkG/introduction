import React from "react";
import styled from "styled-components";

import { ILiveSale, LiveSales } from "public/interfaces/LiveSales";

import { ReactComponent as ETHIcon } from "public/assets/salesETHicon.svg";
import { ReactComponent as LooksRareIcon } from "public/assets/looksrare.svg";
import { ReactComponent as OpenSeaIcon } from "public/assets/opensea.svg";
import { ReactComponent as EtherScanIcon } from "public/assets/etherscan.svg";

const LiveSale = (props: ILiveSale) => {
	return (
		<LiveSaleContainer>
			<LeftLiveSaleContainer>
				<LiveSaleIcon src={props.iconURL} />
				<LiveSaleStaggeredContainer>
					<LiveSaleName>{props.name}</LiveSaleName>
					<LiveSaleNameBottomContainer>
						{props.number}
						{" | "}
						<LiveSaleNameTiming>{props.timing}</LiveSaleNameTiming>
					</LiveSaleNameBottomContainer>
				</LiveSaleStaggeredContainer>
			</LeftLiveSaleContainer>
			<RightLiveSaleContainer>
				<ETHValue>
					<ETHIcon />
					{props.price}
				</ETHValue>
				<LiveSaleInfo LiveSale={props.sale}>{props.saleName}</LiveSaleInfo>
				<LiveSaleButtonContainer>
					<LiveSaleButton onClick={() => props.clickLooksRare(props.index)}>
						<LooksRareIcon />
					</LiveSaleButton>
					<LiveSaleButton onClick={() => props.clickOpenSea(props.index)}>
						<OpenSeaIcon />
					</LiveSaleButton>
					<LiveSaleButton onClick={() => props.clickEtherScan(props.index)}>
						<EtherScanIcon />
					</LiveSaleButton>
				</LiveSaleButtonContainer>
			</RightLiveSaleContainer>
		</LiveSaleContainer>
	);
};

export default LiveSale;

const LiveSaleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	height: 80px;
	min-height: 80px;
	width: calc(100% - 44px);

	&:not(:last-child) {
		border-bottom: 1px solid rgba(196, 196, 196, 0.1);
	}
`;

const LeftLiveSaleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 13px;
`;

const LiveSaleIcon = styled.img`
	width: 46px;
	height: 46px;
	border-radius: 4px;
`;

const LiveSaleStaggeredContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	gap: 4px;
`;

const LiveSaleName = styled.div`
	font-weight: 700;
	font-size: 14px;
	line-height: 17px;

	color: #ffffff;
`;

const LiveSaleNameBottomContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 6px;

	font-weight: 600;
	font-size: 14px;
	line-height: 17px;

	color: #57595d;
`;

const LiveSaleNameTiming = styled.div`
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;

	color: #8a8c8e;
`;

const RightLiveSaleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 38px;
`;

const LiveSaleButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 6px;
`;

const LiveSaleButton = styled.button`
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

const LiveSaleInfo = styled.div<{ LiveSale: LiveSales }>`
	width: 65px;
	height: 25px;

	background: rgba(${({ LiveSale }) => LiveSale}, 0.1);
	border-radius: 3px;

	display: flex;
	align-items: center;
	justify-content: center;

	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	color: rgba(${({ LiveSale }) => LiveSale}, 1);
`;

const ETHValue = styled.div`
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;

	color: #ffffff;
`;
