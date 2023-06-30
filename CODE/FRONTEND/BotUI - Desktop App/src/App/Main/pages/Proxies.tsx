import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

import CreateGroupPopup from "../popups/createGroup";
import CTAButton from "../components/Utils/CTAButton";

import { List, AutoSizer } from "react-virtualized";

import { ReactComponent as CreateGroupIcon } from "@/App/assets/creategroup.svg";
import { ReactComponent as OpenSeaIcon } from "@/App/assets/openseaicon.svg";

import { ReactComponent as SelectEverything } from "@/App/assets/selecteverything.svg";
import { ReactComponent as SelectedIcon } from "@/App/assets/selected.svg";

import { ReactComponent as PlayIcon } from "@/App/assets/play.svg";
import { ReactComponent as DeleteIcon } from "@/App/assets/delete.svg";

import SearchBar from "../components/Utils/SearchBar";
import AddProxiesPopup from "../popups/addProxiesPopup";

const Tasks = () => {
	const [selectedTaskGroup, setSelectedTaskGroup] = useState(0);
	const [amountOfProxyGroups, setAmountOfProxyGroups] = useState(12);
	const [amountOfProxies, setAmountOfProxies] = useState(32);
	const horizontalScrollRef = useRef<HTMLDivElement>(null);
	const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");

	const [showAddProxiesPopup, setShowAddProxiesPopup] = useState(false);

	const [selectedProxies, setSelectedProxies] = useState<number[]>([]);

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
				{showAddProxiesPopup && (
					<AddProxiesPopup
						close={() => {
							setShowAddProxiesPopup(false);
						}}
						addProxies={(prx) => {
							//
						}}
					/>
				)}
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
			</AnimatePresence>
			<TitleContainer>
				<StaggeredItems gap="6px">
					<TaskGroupsTitle>Proxy Groups ({amountOfProxyGroups})</TaskGroupsTitle>
					<TaskGroupsSubtitle>All Groups</TaskGroupsSubtitle>
				</StaggeredItems>
				<CTAButton
					onClick={() => {
						setShowCreateGroupPopup(true);
					}}
				>
					Create Group <CreateGroupIcon />
				</CTAButton>
			</TitleContainer>
			<TaskGroupContainer ref={horizontalScrollRef}>
				{[...Array(10)].map((e, index) => {
					return (
						<TaskGroupItem
							selected={selectedTaskGroup === index}
							onClick={() => {
								setSelectedTaskGroup(index);
							}}
						>
							<TaskGroupIconContainer>
								<OpenSeaIcon />
							</TaskGroupIconContainer>
							<StaggeredItems gap={"2px"}>
								<TaskGroupTitle>Proxy Group 1</TaskGroupTitle>
								<TaskGroupTasksCount>12 Proxies</TaskGroupTasksCount>
							</StaggeredItems>
						</TaskGroupItem>
					);
				})}
			</TaskGroupContainer>
			<TaskTopContainer>
				<StaggeredItems gap="6px">
					<TaskGroupsTitle>Proxies ({amountOfProxies})</TaskGroupsTitle>
					<TaskGroupsSubtitle>All Tasks</TaskGroupsSubtitle>
				</StaggeredItems>
				<CreateAndSearchProxiesContainer>
					<SearchBar
						style={{ width: "239px" }}
						value={searchQuery}
						onChange={(v) => {
							setSearchQuery(v);
						}}
						placeholder="Search Proxy"
					/>
					<CTAButton
						onClick={() => {
							setShowAddProxiesPopup(true);
						}}
						background={"#AC98EF"}
					>
						Add Proxies <CreateGroupIcon />
					</CTAButton>
				</CreateAndSearchProxiesContainer>
			</TaskTopContainer>
			<TaskHeader>
				{selectedProxies.length === amountOfProxies ? (
					<SelectEverything
						style={{ cursor: "pointer" }}
						onClick={() => {
							setSelectedProxies([]);
						}}
					/>
				) : (
					<SelectionButton
						onClick={() => {
							let selected = [];
							for (let i = 0; i < amountOfProxies; i++) {
								selected.push(i);
							}
							setSelectedProxies(selected);
						}}
					/>
				)}
				<TaskHeaderTitle>IP</TaskHeaderTitle>
				<TaskHeaderTitle>Port</TaskHeaderTitle>
				<TaskHeaderTitle>Username</TaskHeaderTitle>
				<TaskHeaderTitle>Password</TaskHeaderTitle>
				<TaskHeaderTitle>Speed</TaskHeaderTitle>
			</TaskHeader>
			<TaskContainer>
				<AutoSizer>
					{({ height, width }) => (
						<List
							overscanRowCount={10}
							width={width}
							height={height}
							rowHeight={46}
							rowCount={amountOfProxies}
							rowRenderer={({ index, style }) => {
								return (
									<span style={style}>
										<Task>
											<TaskItem
												onClick={() => {
													if (selectedProxies.includes(index)) {
														setSelectedProxies(selectedProxies.filter((e) => e !== index));
													} else {
														setSelectedProxies([...selectedProxies, index]);
													}
												}}
											>
												<TaskSelectionBox>{selectedProxies.includes(index) && <SelectedIcon />}</TaskSelectionBox>
											</TaskItem>
											<TaskItem>IP</TaskItem>
											<TaskItem>PORT</TaskItem>
											<TaskItem>USERNAME</TaskItem>
											<TaskItem>PASSWORD</TaskItem>
											<TaskItem color="#37D8BB">32ms</TaskItem>
											<TaskItem>
												<ActionButton>
													<PlayIcon />
												</ActionButton>
												<ActionButton className="delete">
													<DeleteIcon className="delete" />
												</ActionButton>
											</TaskItem>
										</Task>
									</span>
								);
							}}
						/>
					)}
				</AutoSizer>
			</TaskContainer>
			<BottomButtonsContainer>
				<StartAllButton onClick={() => {}}>
					<PlayIcon />
					Test All
				</StartAllButton>
				<StopButton onClick={() => {}}>
					<DeleteIcon /> Delete All
				</StopButton>
			</BottomButtonsContainer>
		</Container>
	);
};

export default Tasks;

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

const TaskGroupsTitle = styled.div`
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;

	color: #ffffff;
`;

const TaskGroupsSubtitle = styled.div`
	font-weight: 600;
	font-size: 11px;
	line-height: 13px;

	color: #878787;
`;

const TaskGroupContainer = styled.div`
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

const TaskGroupItem = styled.div<{ selected: boolean }>`
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

const TaskGroupIconContainer = styled.div`
	width: 36px;
	height: 36px;

	display: flex;
	align-items: center;
	justify-content: center;

	background: #232326;
	border: 1px solid #2a292e;
	border-radius: 4px;
`;

const TaskGroupTitle = styled.div`
	font-weight: 700;
	font-size: 11px;
	line-height: 13px;

	color: #ffffff;

	max-width: 130px;
	overyflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const TaskGroupTasksCount = styled.div`
	font-weight: 600;
	font-size: 10px;
	line-height: 12px;

	color: #878787;
`;

const TaskTopContainer = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-top: 4px;
`;

const TaskHeader = styled.div`
	width: 100%;
	height: 36px;

	margin-top: 12px;

	display: flex;
	align-items: center;

	background: rgba(172, 152, 239, 0.3);
	border-radius: 5px;

	padding-left: 9px;
`;

const SelectionButton = styled.div`
	width: 18px;
	height: 18px;

	border: 2px solid rgba(174, 136, 255, 0.3);
	border-radius: 5px;

	cursor: pointer;
`;

const TaskHeaderTitle = styled.div`
	font-weight: 700;
	font-size: 11px;
	line-height: 13px;

	color: #ac98ef;

	&:nth-child(2) {
		margin-left: 21.67px;
		width: 112px;
		margin-right: 10px;
	}

	&:nth-child(3) {
		width: 119px;
		margin-right: 10px;
	}

	&:nth-child(4) {
		width: 193px;
		margin-right: 10px;
	}

	&:nth-child(5) {
		width: 340px;
		margin-right: 10px;
	}

	&:nth-child(6) {
		width: 133px;
	}
`;

const TaskContainer = styled.div`
	width: 100%;
	height: 535px;

	margin-top: 12px;
`;

const Task = styled.div`
	width: 100%;
	height: 36px;
	min-height: 36px;
	max-height: 36px;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	background: #1b1b1e;
	border: 1px solid #2a292e;
	border-radius: 5px;

	padding-left: 7px;
`;

const TaskItem = styled.div<{ color?: string }>`
	font-weight: 700;
	font-size: 11px;
	line-height: 13px;

	color: ${(props) => (props.color ? props.color : "#ffffff")};

	display: flex;
	align-items: center;

	&:nth-child(1) {
		height: 100%;
		width: 42px;

		cursor: pointer;
	}

	&:nth-child(2) {
		height: 100%;
		width: 112px;
		margin-right: 10px;
	}

	&:nth-child(3) {
		height: 100%;
		width: 119px;
		margin-right: 10px;
	}

	&:nth-child(4) {
		height: 100%;
		width: 193px;
		margin-right: 10px;
	}

	&:nth-child(5) {
		height: 100%;
		width: 340px;
		margin-right: 10px;
	}

	&:nth-child(6) {
		height: 100%;
		width: 133px;
	}

	&:nth-child(7) {
		height: 100%;
		width: 71px;

		padding-inline: 9px;

		border-left: 1px solid #2a292e;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

const TaskSelectionBox = styled.div`
	width: 24px;
	height: 24px;

	background: rgb(135, 135, 135, 0.2);
	border-radius: 3px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const TaskStatusContainer = styled.div`
	width: 20px;
	height: 20px;

	background: rgb(135, 135, 135, 0.2);
	border-radius: 3px;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const TaskStatus = styled.div<{ success: boolean }>`
	width: 6px;
	height: 6px;

	background: ${({ success }) => (success ? "#37D8BB" : "#878787")};
	border-radius: 50%;
`;

const BottomButtonsContainer = styled.div`
	width: 100%;

	margin-top: 10px;

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

const StartAllButton = styled(BottomButton)`
	color: #06d7a0;
`;

const StopButton = styled(BottomButton)`
	color: #ff7272;
`;

const ActionButton = styled.button`
	width: 24px;
	height: 24px;

	background: #232326;
	border: 1px solid #2a292e;
	border-radius: 3px;

	display: flex;
	align-items: center;
	justify-content: center;

	& > svg.edit path {
		fill: #ffffff;
	}

	& > svg.delete path {
		fill: white;
	}

	&.delete:hover {
		background: #674f51;

		& > svg.delete path {
			fill: #ff7272;
		}
	}
`;

const CreateAndSearchProxiesContainer = styled.div`
	display: flex;
`;
