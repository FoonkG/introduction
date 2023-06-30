import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAlert } from "react-alert";
import { AnimatePresence } from "framer-motion";
import { List, AutoSizer } from "react-virtualized";

import CreateGroupPopup from "../popups/createGroup";
import CreateTaskPopup from "../popups/createTasksPopUp";
import CTAButton from "../components/Utils/CTAButton";

import { ReactComponent as CreateGroupIcon } from "@/App/assets/creategroup.svg";
import { ReactComponent as OpenSeaIcon } from "@/App/assets/openseaicon.svg";

import { ReactComponent as SelectEverything } from "@/App/assets/selecteverything.svg";
import { ReactComponent as SelectedIcon } from "@/App/assets/selected.svg";

import { ReactComponent as TaskWalletIcon } from "@/App/assets/taskwalleticon.svg";

import { ReactComponent as PlayIcon } from "@/App/assets/play.svg";
import { ReactComponent as StopIcon } from "@/App/assets/stopall.svg";
import { ReactComponent as EditIcon } from "@/App/assets/editall.svg";
import { ReactComponent as DeleteIcon } from "@/App/assets/delete.svg";

import { ReactComponent as GasTrackerIcon } from "@/App/assets/gastrackericon.svg";
import { ReactComponent as CheckMark } from "@/App/assets/checkmark.svg";

import { eTaskStatus } from "@/App/Main/interfaces/TaskStatus";
import SearchBar from "../components/Utils/SearchBar";

const Tasks = () => {
	const [selectedTaskGroup, setSelectedTaskGroup] = useState(0);
	const [amountOfTasksGroups, setAmountOfTasksGroups] = useState(12);
	const [amountOfTasks, setAmountOfTasks] = useState(32);
	const horizontalScrollRef = useRef<HTMLDivElement>(null);
	const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);
	const [showCreateTaskPopup, setShowCreateTaskPopup] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");
	const [forceGasInput, setForceGasInput] = useState("");

	const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
	const alert = useAlert();

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
		alert.info(`Clicked create tasks`);
		alert.error(`Clicked create tasks`);
		alert.success(`Clicked create tasks`);
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
				{showCreateTaskPopup && (
					<CreateTaskPopup
						close={() => {
							setShowCreateTaskPopup(false);
						}}
						createTasks={(tasks) => {
							//
						}}
					/>
				)}
			</AnimatePresence>
			<TitleContainer>
				<StaggeredItems gap="6px">
					<TaskGroupsTitle>Task Groups ({amountOfTasksGroups})</TaskGroupsTitle>
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
								<TaskGroupTitle>Task Group 1</TaskGroupTitle>
								<TaskGroupTasksCount>12 Tasks</TaskGroupTasksCount>
							</StaggeredItems>
						</TaskGroupItem>
					);
				})}
			</TaskGroupContainer>
			<TaskTopContainer>
				<StaggeredItems gap="6px">
					<TaskGroupsTitle>Tasks ({amountOfTasks})</TaskGroupsTitle>
					<TaskGroupsSubtitle>All Tasks</TaskGroupsSubtitle>
				</StaggeredItems>
				<CreateAndSearchTaskContainer>
					<SearchBar
						style={{ width: "239px" }}
						value={searchQuery}
						onChange={(v) => {
							setSearchQuery(v);
						}}
						placeholder="Search Tasks"
					/>
					<ForceGasContainer>
						<GasTrackerIcon />
						<ForceGasInput
							value={forceGasInput}
							onChange={(e: any) => {
								setForceGasInput(e.target.value);
							}}
							placeholder="Force Gas"
						/>
						<ForceGasCheckmarkContainer
							onClick={() => {
								alert.info(`Clicked force gas`);
							}}
						>
							<CheckMark />
						</ForceGasCheckmarkContainer>
					</ForceGasContainer>
					<CTAButton
						onClick={() => {
							setShowCreateTaskPopup(true);
						}}
						background={"#AC98EF"}
					>
						Create Tasks <CreateGroupIcon />
					</CTAButton>
				</CreateAndSearchTaskContainer>
			</TaskTopContainer>
			<TaskHeader>
				{selectedTasks.length === amountOfTasks ? (
					<SelectEverything
						style={{ cursor: "pointer" }}
						onClick={() => {
							setSelectedTasks([]);
						}}
					/>
				) : (
					<SelectionButton
						onClick={() => {
							let selected = [];
							for (let i = 0; i < amountOfTasks; i++) {
								selected.push(i);
							}
							setSelectedTasks(selected);
						}}
					/>
				)}
				<TaskHeaderTitle>Network</TaskHeaderTitle>
				<TaskHeaderTitle>Network Type</TaskHeaderTitle>
				<TaskHeaderTitle>Wallet</TaskHeaderTitle>
				<TaskHeaderTitle>Status</TaskHeaderTitle>
			</TaskHeader>
			<TaskContainer>
				<AutoSizer>
					{({ height, width }) => (
						<List
							overscanRowCount={10}
							width={width}
							height={height}
							rowHeight={46}
							rowCount={amountOfTasks}
							rowRenderer={({ index, style }) => {
								return (
									<span style={style}>
										<Task>
											<TaskItem>
												<TaskSelectionBox
													onClick={() => {
														if (selectedTasks.includes(index)) {
															setSelectedTasks(selectedTasks.filter((e) => e !== index));
														} else {
															setSelectedTasks([...selectedTasks, index]);
														}
													}}
												>
													{selectedTasks.includes(index) && <SelectedIcon />}
												</TaskSelectionBox>
											</TaskItem>
											<TaskItem>Showcase (Mainnet)</TaskItem>
											<TaskItem>Mainnet</TaskItem>
											<TaskItem>
												<TaskWalletIcon />
												Wallet Name 1
											</TaskItem>
											<TaskItem color={eTaskStatus.IDLE}>
												<TaskStatusContainer>
													<TaskStatus success={false} />
												</TaskStatusContainer>
												IDLE
											</TaskItem>
											<TaskItem>
												<ActionButton>
													<PlayIcon />
												</ActionButton>
												<ActionButton>
													<EditIcon className="edit" />
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
					Start All
				</StartAllButton>
				<StopButton onClick={() => {}}>
					<StopIcon /> Stop All
				</StopButton>
				<EditAllButton onClick={() => {}}>
					<EditIcon /> Edit All
				</EditAllButton>
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
		width: 253px;
	}

	&:nth-child(3) {
		width: 153px;
	}

	&:nth-child(4) {
		width: 190px;
	}

	&:nth-child(5) {
		width: 361px;
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
	}

	&:nth-child(2) {
		height: 100%;
		width: 253px;
	}

	&:nth-child(3) {
		height: 100%;
		width: 153px;
	}

	&:nth-child(4) {
		height: 100%;
		width: 190px;

		gap: 7px;
	}

	&:nth-child(5) {
		height: 100%;
		width: 259px;

		gap: 7px;
	}

	&:nth-child(6) {
		height: 100%;
		width: 102px;

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

	cursor: pointer;
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

const EditAllButton = styled(BottomButton)`
	color: #878787;
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

const CreateAndSearchTaskContainer = styled.div`
	display: flex;
`;

const ForceGasContainer = styled.div`
	width: 239px;
	height: 36px;

	background: linear-gradient(0deg, #232326, #232326), #141421;
	border: 1px solid #2a292e;
	border-radius: 5px;

	padding-left: 17.5px;
	padding-right: 9px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-right: 9px;
`;

const ForceGasInput = styled.input`
	font-weight: 600;
	font-size: 12px;

	color: #ffffff;

	width: calc(100% - 64px);
	height: 100%;
`;

const ForceGasCheckmarkContainer = styled.div`
	width: 20px;
	height: 20px;

	background: rgb(135, 135, 135, 0.4);

	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 5px;

	cursor: pointer;
`;
