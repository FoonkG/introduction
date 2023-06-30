import styled from "styled-components";
import Image from "next/image";

import { ReactComponent as EtherScanIcon } from "public/assets/etherscan.svg";
import { ReactComponent as LooksRareIcon } from "public/assets/looksrare.svg";
import { ReactComponent as OpenSeaIcon } from "public/assets/opensea.svg";
import { ReactComponent as InfoIcon } from "public/assets/info.svg";
import { ReactComponent as EthIcon } from "public/assets/eth.svg";

interface ITopMint {
	imgURL: string;
	name: string;
	averagePrice: number;
	totalPendings: number;
	value: number;
}

const TopMint = ({ imgURL, name, averagePrice, totalPendings, value }: ITopMint) => {
	return (
		<TopMintContainer
			onClick={() => {
				console.log("whole component clicked");
			}}
		>
			<TopMintTopContainer>
				<LeftTopMintContainer>
					<MintProfilePicture src={imgURL} />
					<StaggerdText>
						<MintTitle>{name}</MintTitle>
						<TotalPendings>
							Total Pendings: <span>{totalPendings}</span>
						</TotalPendings>
					</StaggerdText>
				</LeftTopMintContainer>
				<RightTopMintContainer>
					<ProgressCircle progress={(value / 999) * 100} />
					<Equation>{value}/999</Equation>
				</RightTopMintContainer>
			</TopMintTopContainer>
			<TopMintActionsContainer>
				<TopMintActionButton
					onClick={(e) => {
						e.stopPropagation();

						console.log("btn 1 clicked");
					}}
				>
					<EtherScanIcon />
				</TopMintActionButton>
				<TopMintActionButton
					onClick={(e) => {
						e.stopPropagation();

						console.log("btn 2 clicked");
					}}
				>
					<LooksRareIcon />
				</TopMintActionButton>
				<TopMintActionButton
					onClick={(e) => {
						e.stopPropagation();

						console.log("btn 3 clicked");
					}}
				>
					<OpenSeaIcon />
				</TopMintActionButton>
				<TopMintActionButton
					onClick={(e) => {
						e.stopPropagation();

						console.log("btn 4 clicked");
					}}
				>
					<InfoIcon />
				</TopMintActionButton>
			</TopMintActionsContainer>
			<AveragePriceContainer>
				<EthIcon /> <span>{averagePrice}</span> Average Price
			</AveragePriceContainer>
		</TopMintContainer>
	);
};

export default TopMint;

interface IProgressCircle {
	progress: number;
}

const ProgressCircle = ({ progress }: IProgressCircle) => {
	return (
		<ProgressCircleWrapper className="progressCircle">
			<MiddleCircle className="mid" />
			<ProgressSpinner progress={progress * 3.6} />
		</ProgressCircleWrapper>
	);
};

const ProgressCircleWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;

	transform: rotate(-120deg);

	margin-right: 4px;
`;

const MiddleCircle = styled.div`
	position: absolute;
	border-radius: 50%;
	height: 13.3px;
	width: 13.3px;
	background: #161a1e;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: large;
	font-weight: bold;
`;

const ProgressSpinner = styled.div<{ progress: number }>`
	border-radius: 50%;
	height: 20px;
	width: 20px;

	background: conic-gradient(#ab1adb ${({ progress }) => progress}deg, #353b41 ${({ progress }) => progress}deg);
`;

//////////////////////////////////////////////////////////////////////////////////////////////

const TopMintContainer = styled.div`
	background: #17191b;
	border-radius: 5px;

	width: 100%;
	height: 103px;
	min-height: 103px;

	padding-left: 16px;
	padding-right: 16px;
	padding-top: 13px;

	position: relative;

	&:hover {
		background: #232527;
		cursor: pointer;

		& button {
			background: #2b2d2f;
		}

		& .progressCircle > .mid {
			background: #232527;
		}
	}
`;

const TopMintTopContainer = styled.div`
	border-radius: 5px;

	width: 100%;
	height: 46px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const LeftTopMintContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 13px;
`;

const RightTopMintContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 5px;

	margin-right: 9px;
`;

const Equation = styled.div`
	font-weight: 500;
	font-size: 12px;

	color: #ffffff;

	opacity: 0.5;
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
	font-size: 14px;
	line-height: 17px;

	color: white;
`;

const TotalPendings = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 5px;

	font-weight: 600;
	font-size: 12px;

	color: #57595d;

	& > span {
		color: rgba(240, 110, 50, 1);
	}
`;

const TopMintActionsContainer = styled.div`
	position: absolute;
	right: 17px;
	bottom: 15px;

	width: 115px;
	height: 25px;

	display: flex;
	justify-content: space-between;
`;

const TopMintActionButton = styled.button`
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

	&:hover {
		filter: brightness(130%);
	}

	padding: 0;
`;

const AveragePriceContainer = styled.div`
	font-weight: 600;
	font-size: 12px;
	color: rgba(87, 89, 93, 1);

	position: absolute;
	left: 15.8px;
	bottom: 16.5px;

	display: flex;
	align-items: center;

	& > span {
		color: #ffffff;
		margin-left: 4px;
		margin-right: 4px;
	}
`;
