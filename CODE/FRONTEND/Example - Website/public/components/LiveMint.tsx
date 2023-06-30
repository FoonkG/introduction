import styled from "styled-components";
import Image from "next/image";

import { ReactComponent as EtherScanIcon } from "public/assets/etherscan.svg";

import { ReactComponent as LiveMintEthValueIcon } from "public/assets/livemintethvalue.svg";
import { ReactComponent as LiveMintGasPriceIcon } from "public/assets/livemintgasprice.svg";
import { ReactComponent as LiveMintPriceIcon } from "public/assets/livemintprice.svg";

interface ILiveMint {
	imgURL: string;
	name: string;
	gasPrice: number;
	ethValue: string;
	price: number;
}

const LiveMint = ({ imgURL, name, gasPrice, ethValue, price }: ILiveMint) => {
	return (
		<LiveMintContainer>
			<LeftLiveMintContainer>
				<MintProfilePicture src={imgURL} />
				<StaggerdText>
					<MintTitle>{name}</MintTitle>
					<MintValueWrapper>
						<MintValue>
							<LiveMintGasPriceIcon />
							{gasPrice}
						</MintValue>
						<MintValue>
							<LiveMintEthValueIcon />
							{ethValue}
						</MintValue>
					</MintValueWrapper>
				</StaggerdText>
			</LeftLiveMintContainer>
			<RightLiveMintContainer>
				<PriceContainer free={price === 0}>
					{price !== 0 ? <LiveMintPriceIcon /> : null}
					{price !== 0 ? price : "Free"}
				</PriceContainer>
				<EtherScanButton
					onClick={() => {
						//Open etherscan over here
					}}
				>
					<EtherScanIcon />
				</EtherScanButton>
			</RightLiveMintContainer>
		</LiveMintContainer>
	);
};

export default LiveMint;

const LiveMintContainer = styled.div`
	background: #17191b;
	border-radius: 5px;

	width: 100%;
	height: 72px;
	min-height: 72px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding-left: 16px;
	padding-right: 16px;
`;

const LeftLiveMintContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 13px;
`;

const RightLiveMintContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 5px;
`;

const PriceContainer = styled.div<{ free: boolean }>`
	padding: 5px 18px 5px 18px;

	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;

	color: ${(props) => (props.free ? "#63C393" : "#ffffff")};

	background: ${(props) => (props.free ? "rgba(99, 195, 147, 0.1)" : "#222528")};
	border-radius: 3px;
`;

const EtherScanButton = styled.button`
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

const MintValueWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 5px;
`;

const MintValue = styled.div`
	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 6px;

	color: #57595d;
`;
