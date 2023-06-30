import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

import CreateGroupPopup from "../popups/createGroup";
import CreateWalletPopup from "../popups/createWallet";

import CTAButton from "../components/Utils/CTAButton";
import SearchBar from "../components/Utils/SearchBar";

import { ReactComponent as CreateGroupIcon } from "@/App/assets/creategroup.svg";
import { ReactComponent as OpenSeaIcon } from "@/App/assets/openseaicon.svg";

import { ReactComponent as PlayIcon } from "@/App/assets/play.svg";
import { ReactComponent as EditIcon } from "@/App/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "@/App/assets/delete.svg";

import { ReactComponent as WalletIcon } from "@/App/assets/wallet.svg";
import { ReactComponent as TickSquareIcon } from "@/App/assets/ticksquare.svg";

const Wallets = () => {
	const [selectedWalletGroup, setSelectedWalletGroup] = useState(0);
	const [amountOfWalletGroups, setAmountOfWalletGroups] = useState(12);
	const [amountOfWallets, setAmountOfWallets] = useState(32);
	const horizontalScrollRef = useRef<HTMLDivElement>(null);
	const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);
	const [showCreateWalletPopup, setShowCreateWalletPopup] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");

	const [selectedWallets, setSelectedWallets] = useState<number[]>([]);

	useEffect(() => {
		if (horizontalScrollRef.current) {
			const container = horizontalScrollRef.current;

			container.addEventListener("wheel", (e) => {
				if (e.deltaY == 0) return;
				e.preventDefault();
				container.scrollTo({
					left: container.scrollLeft + e.deltaY * 4,
					behavior: "smooth",
				});
			});
		}
	}, []);

	return (
		<Container>
			<AnimatePresence>
				{showCreateGroupPopup && (
					<CreateGroupPopup
						close={() => {
							setShowCreateGroupPopup(false);
						}}
						createGroup={(name: string) => {
							//
						}}
					/>
				)}
				{showCreateWalletPopup && (
					<CreateWalletPopup
						close={() => {
							setShowCreateWalletPopup(false);
						}}
						createWallet={(name: string) => {
							//
						}}
					/>
				)}
			</AnimatePresence>
			<TitleContainer>
				<StaggeredItems gap="6px">
					<WalletGroupsTitle>Wallet Groups ({amountOfWalletGroups})</WalletGroupsTitle>
					<WalletGroupsSubtitle>All Groups</WalletGroupsSubtitle>
				</StaggeredItems>
				<CTAButton
					onClick={() => {
						setShowCreateGroupPopup(true);
					}}
				>
					Create Group <CreateGroupIcon />
				</CTAButton>
			</TitleContainer>
			<WalletGroupContainer ref={horizontalScrollRef}>
				{[...Array(10)].map((e, index) => {
					return (
						<WalletGroupItem
							selected={selectedWalletGroup === index}
							onClick={() => {
								setSelectedWalletGroup(index);
							}}
						>
							<WalletGroupIconContainer>
								<OpenSeaIcon />
							</WalletGroupIconContainer>
							<StaggeredItems gap={"2px"}>
								<WalletGroupTitle>Wallet Group 1</WalletGroupTitle>
								<WalletGroupTasksCount>12 Wallets</WalletGroupTasksCount>
							</StaggeredItems>
						</WalletGroupItem>
					);
				})}
			</WalletGroupContainer>
			<TitleContainer>
				<StaggeredItems gap="6px">
					<WalletGroupsTitle>Wallets ({amountOfWalletGroups})</WalletGroupsTitle>
					<WalletGroupsSubtitle>All Wallets</WalletGroupsSubtitle>
				</StaggeredItems>
				<CreateAndSearchWalletContainer>
					<SearchBar
						style={{ width: "239px" }}
						value={searchQuery}
						onChange={(v) => {
							setSearchQuery(v);
						}}
						placeholder="Search Wallet"
					/>
					<CTAButton
						style={{ background: "#AC98EF" }}
						onClick={() => {
							setShowCreateWalletPopup(true);
						}}
					>
						Create Wallet <CreateGroupIcon />
					</CTAButton>
				</CreateAndSearchWalletContainer>
			</TitleContainer>
			<WalletsContainer>
				{[...Array(5)].map((el, index) => (
					<WalletContainer>
						<WalletTopContainer>
							<WalletDetailsContainer>
								<WalletName>Wallet Name 1</WalletName>
								<WalletLabel>ETH Wallet</WalletLabel>
								<WalletTagsContainer>
									<WalletBalanceTag>0.32 ETH</WalletBalanceTag>
									<WalletCheckmarkTag
										onClick={() => {
											if (selectedWallets.includes(index)) {
												setSelectedWallets(selectedWallets.filter((e) => e !== index));
											} else {
												setSelectedWallets([...selectedWallets, index]);
											}
										}}
									>
										{selectedWallets.includes(index) && <TickSquareIcon />}
									</WalletCheckmarkTag>
								</WalletTagsContainer>
							</WalletDetailsContainer>
							<WalletIconContainer>
								<WalletIcon />
							</WalletIconContainer>
						</WalletTopContainer>
						<WalletBottomContainer>
							<WalletAddressLabel>Wallet Adress</WalletAddressLabel>
							<WalletAddress>0xab5801a7d398351b8be11c439e05c5b3259aec9b</WalletAddress>
							<WalletButtonsContainer>
								<WalletButton
									onClick={() => {
										//
									}}
								>
									<PlayIcon />
								</WalletButton>
								<WalletButton
									onClick={() => {
										//
									}}
								>
									<EditIcon />
								</WalletButton>
								<WalletButton
									onClick={() => {
										//
									}}
								>
									<DeleteIcon />
								</WalletButton>
							</WalletButtonsContainer>
						</WalletBottomContainer>
					</WalletContainer>
				))}
			</WalletsContainer>
			<BottomButtonsContainer>
				<BalanceButton onClick={() => {}}>
					<PlayIcon />
					Balance
				</BalanceButton>
				<TransferAssetsButton onClick={() => {}}>Transfer Assets</TransferAssetsButton>
				<DeleteAllButton onClick={() => {}}>
					<DeleteIcon /> Delete All
				</DeleteAllButton>
			</BottomButtonsContainer>
		</Container>
	);
};

export default Wallets;

const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	padding-left: 36px;
	padding-right: 34px;
	padding-top: 35px;
`;

const TitleContainer = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const StaggeredItems = styled.div<{ gap?: string }>`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	gap: ${(props) => (props.gap ? props.gap : "0px")};
`;

const WalletGroupsTitle = styled.div`
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;

	color: #ffffff;
`;

const WalletGroupsSubtitle = styled.div`
	font-weight: 600;
	font-size: 11px;
	line-height: 13px;

	color: #878787;
`;

const WalletGroupContainer = styled.div`
	width: 100%;
	margin-top: 12px;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 10px;

	overflow-x: scroll;
	::-webkit-scrollbar {
		width: 0;
	}
`;

const WalletGroupItem = styled.div<{ selected: boolean }>`
	width: 193px;
	min-width: 193px;
	height: 52px;
	min-height: 52px;

	background: #1b1b1e;
	border: ${(props) => (props.selected ? "2px solid #AC98EF" : "2px solid #2a292e")};
	border-radius: 5px;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	padding-left: 8px;
	gap: 9px;

	cursor: ${({ selected }) => (selected ? "default" : "pointer")};
`;

const WalletGroupIconContainer = styled.div`
	width: 36px;
	height: 36px;

	display: flex;
	align-items: center;
	justify-content: center;

	background: #232326;
	border: 1px solid #2a292e;
	border-radius: 4px;
`;

const WalletGroupTitle = styled.div`
	font-weight: 700;
	font-size: 11px;
	line-height: 13px;

	color: #ffffff;

	max-width: 130px;
	overyflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const WalletGroupTasksCount = styled.div`
	font-weight: 600;
	font-size: 10px;
	line-height: 12px;

	color: #878787;
`;

const WalletsContainer = styled.div`
	width: calc(100% + 20px);
	height: calc(100% - 252px);

	margin-top: 14px;

	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	align-content: flex-start;

	overflow-y: auto;

	::-webkit-scrollbar {
		display: none;
	}
`;

const BottomButtonsContainer = styled.div`
	width: 100%;

	margin-top: 20px;

	display: flex;
	align-items: center;
`;

const BottomButton = styled.button`
	width: 138px;
	height: 36px;

	background: #1b1b1e;
	border: 1px solid #2a292e;
	border-radius: 5px;

	font-weight: 700;
	font-size: 12px;

	margin-right: 7px;

	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		margin-right: 5px;
	}
`;

const BalanceButton = styled(BottomButton)`
	color: #06d7a0;
`;

const TransferAssetsButton = styled(BottomButton)`
	color: #ac98ef;
`;

const DeleteAllButton = styled(BottomButton)`
	color: #ff7272;
`;

const WalletContainer = styled.div`
	width: 327px;
	height: 207px;

	background: #1b1b1e;
	border: 1px solid #2a292e;
	border-radius: 5px;

	margin-right: 13px;
	margin-bottom: 13px;
`;

const WalletTopContainer = styled.div`
	width: calc(100% + 2px);
	height: 98px;

	transform: translateX(-1px) translateY(-1px);

	background: #232326;
	border-radius: 5px 5px 0px 0px;

	padding-inline: 24px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const WalletIconContainer = styled.div`
	width: 52px;
	height: 52px;

	background: #1b1b1e;
	border: 2px solid #2a292e;
	box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.25);
	border-radius: 104px;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const WalletDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
`;

const WalletName = styled.div`
	font-weight: 700;
	font-size: 14px;

	color: #ffffff;

	margin-bottom: 6px;

	width: 100%;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const WalletLabel = styled.div`
	font-weight: 600;
	font-size: 11px;

	color: #878787;

	margin-bottom: 8px;
`;

const WalletTagsContainer = styled.div`
	display: flex;
	align-items: center;
`;

const WalletBalanceTag = styled.div`
	width: 61px;
	height: 24px;

	background: #88b8ff;
	border-radius: 0px 3px 3px 3px;

	margin-right: 4px;

	font-weight: 700;
	font-size: 10px;
	display: flex;
	align-items: center;
	justify-content: center;

	color: #ffffff;
`;

const WalletCheckmarkTag = styled.div`
	width: 24px;
	height: 24px;

	background: rgba(135, 135, 135, 0.2);
	border-radius: 3px;

	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;
`;

const WalletBottomContainer = styled.div`
	margin-top: 17px;

	padding-inline: 16px;
`;

const WalletAddressLabel = styled.div`
	ont-weight: 600;
	font-size: 11px;
	color: #878787;
`;

const WalletAddress = styled.div`
	font-weight: 700;
	font-size: 11px;

	margin-top: 3px;

	width: 100%;

	color: #ffffff;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const WalletButtonsContainer = styled.div`
	width: 100%;

	margin-top: 17px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const WalletButton = styled.button`
	width: 93px;
	height: 28px;

	background: #232326;
	border: 1px solid #323235;
	border-radius: 4px;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const CreateAndSearchWalletContainer = styled.div`
	display: flex;
`;
