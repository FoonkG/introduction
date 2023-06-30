import React, { useState } from "react";
import styled from "styled-components";
import { ipcRenderer } from "electron";
import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";

import StatContainer from "../components/StatsContainerTasks";

import { ReactComponent as TasksIcon } from "@/App/assets/tasks.svg";

import { ReactComponent as PauseIcon } from "@/App/assets/pause.svg";
import { ReactComponent as PlayIcon } from "@/App/assets/play.svg";

import { ReactComponent as PlusIcon } from "@/App/assets/plus.svg";
import { ReactComponent as CaptchaIcon } from "@/App/assets/captchaIcon.svg";

import { ReactComponent as TaskGroupUpIcon } from "@/App/assets/taskup.svg";
import { ReactComponent as TaskGroupDownIcon } from "@/App/assets/taskdown.svg";
import { ReactComponent as TaskGroupAddIcon } from "@/App/assets/taskadd.svg";

import Input from "../components/Input";
import Task from "../components/Task";

import CreateTask, { ITask } from "../popups/CreateTask";
import TaskGroups, { ITaskGroup } from "../popups/TaskGroups";

const store = new Store();

const Tasks = () => {
	const [searchValue, setSearchValue] = useState("");
	const [showCreateTasksPopUp, setShowCreateTasksPopUp] = useState(false);
	const [showAdjustTaskGroupsPopUp, setShowAdjustTaskGroupsPopUp] = useState(false);

	const [tasks, setTasks] = useState((store.get("tasks") as ITask[]) || []);
	const [taskGroups, setTaskGroups] = useState<Array<ITaskGroup>>((store.get("taskGroups") as ITaskGroup[]) || []);
	const [selectedTaskGroupOne, setSelectedTaskGroupOne] = useState(taskGroups.length > 0 ? taskGroups[0].id : "");
	const [selectedTaskGroupTwo, setSelectedTaskGroupTwo] = useState(taskGroups.length > 0 ? taskGroups[0].id : "");
	const [selectedTaskGroupThree, setSelectedTaskGroupThree] = useState(taskGroups.length > 0 ? taskGroups[0].id : "");

	return (
		<Container>
			{showCreateTasksPopUp && (
				<CreateTask
					close={() => setShowCreateTasksPopUp(false)}
					addTasks={(t) => {
						const newT = [...tasks, ...t];
						store.set("tasks", newT);
						setTasks(newT);
						setShowCreateTasksPopUp(false);
					}}
				/>
			)}
			{showAdjustTaskGroupsPopUp && (
				<TaskGroups
					close={() => {
						setShowAdjustTaskGroupsPopUp(false);
						const newTgs = (store.get("taskGroups") as ITaskGroup[]) || [];
						setTaskGroups(newTgs);
						setSelectedTaskGroupOne(newTgs.length > 0 ? newTgs[0].id : "");
						setSelectedTaskGroupTwo(newTgs.length > 0 ? newTgs[0].id : "");
						setSelectedTaskGroupThree(newTgs.length > 0 ? newTgs[0].id : "");
					}}
				/>
			)}
			<PageHeader>
				<LeftPageHeader>
					<CreateTaskButton
						onClick={() => {
							setShowCreateTasksPopUp(true);
						}}
					>
						<PlusIcon />
					</CreateTaskButton>
					<HeaderContainer>
						<StatContainer
							icon={<PlayIcon />}
							background="linear-gradient(91.08deg, #47C8F9 -1.3%, #65D5FF 50.93%, #47C8F9 104.26%)"
							border="linear-gradient(91.08deg, #47C8F9 -1.3%, #65D5FF 50.93%, #47C8F9 104.26%)"
							title="Start All Tasks"
							value={tasks.length + ""}
							label="Ready"
							onClick={() => {
								//
							}}
						/>
						<StatContainer
							icon={<PauseIcon />}
							background="linear-gradient(91.08deg, #F50181 -1.3%, #EF3A99 50.93%, #F50181 104.26%)"
							border="linear-gradient(91.08deg, #F50181 -1.3%, #EF3A99 50.93%, #F50181 104.26%)"
							title="Stop All Tasks"
							value="53"
							label="Running"
							onClick={() => {
								//
							}}
						/>
						<CaptchaButton
							onClick={() => {
								ipcRenderer.send("toMain", [
									{
										command: "openCaptcha",
									},
								]);
								console.log("openCaptcha");
							}}
						>
							<CaptchaIcon />
						</CaptchaButton>
						<Input
							type="text"
							width="313px"
							placeholder="Search product, profile, ..."
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
						<SelectTaskGroupWrapper>
							<SelectTaskGroupContainer>
								<TasksIcon />
								<TaskGroupWrapper>
									<SelectTaskGroup>
										<TaskGroupUpIcon
											onClick={() => {
												const currentTaskGroupIndex = taskGroups.findIndex((taskGroup) => taskGroup.id === selectedTaskGroupOne);
												const newTaskGroupIndex = currentTaskGroupIndex == 0 ? taskGroups.length - 1 : currentTaskGroupIndex - 1;
												setSelectedTaskGroupOne(taskGroups[newTaskGroupIndex].id);
											}}
										/>
										<TaskGroupTitle>
											<span>{taskGroups.find((taskGroup) => taskGroup.id === selectedTaskGroupOne)?.name}</span>
											<TaskGroupAddIcon
												onClick={() => {
													const currentTaskGroup = taskGroups.find((taskGroup) => taskGroup.id === selectedTaskGroupOne)!;
													const newTasks = [];
													for (let i = 0; i < currentTaskGroup?.taskAmount; i++) {
														newTasks.push({
															id: uuidv4(),
															store: currentTaskGroup?.store,
															url: "",
															size: "random",
															account: currentTaskGroup?.account,
															proxy: currentTaskGroup?.proxy,
															restartAfterSuccess: false,
															switchProxyAfterError: false,
														});
													}
													const newT = [...tasks, ...newTasks];
													setTasks(newT);
													store.set("tasks", newT);
												}}
											/>
										</TaskGroupTitle>
										<TaskGroupDownIcon
											onClick={() => {
												const currentTaskGroupIndex = taskGroups.findIndex((taskGroup) => taskGroup.id === selectedTaskGroupOne);
												const newTaskGroupIndex = currentTaskGroupIndex == taskGroups.length - 1 ? 0 : currentTaskGroupIndex + 1;
												setSelectedTaskGroupOne(taskGroups[newTaskGroupIndex].id);
											}}
										/>
									</SelectTaskGroup>
									<SelectTaskGroup>
										<TaskGroupUpIcon
											onClick={() => {
												const currentTaskGroupIndex = taskGroups.findIndex((taskGroup) => taskGroup.id === selectedTaskGroupTwo);
												const newTaskGroupIndex = currentTaskGroupIndex == 0 ? taskGroups.length - 1 : currentTaskGroupIndex - 1;
												setSelectedTaskGroupTwo(taskGroups[newTaskGroupIndex].id);
											}}
										/>
										<TaskGroupTitle>
											<span>{taskGroups.find((taskGroup) => taskGroup.id === selectedTaskGroupTwo)?.name}</span>
											<TaskGroupAddIcon
												onClick={() => {
													const currentTaskGroup = taskGroups.find((taskGroup) => taskGroup.id === selectedTaskGroupTwo)!;
													const newTasks = [];
													for (let i = 0; i < currentTaskGroup?.taskAmount; i++) {
														newTasks.push({
															id: uuidv4(),
															store: currentTaskGroup?.store,
															url: "",
															size: "random",
															account: currentTaskGroup?.account,
															proxy: currentTaskGroup?.proxy,
															restartAfterSuccess: false,
															switchProxyAfterError: false,
														});
													}
													const newT = [...tasks, ...newTasks];
													setTasks(newT);
													store.set("tasks", newT);
												}}
											/>
										</TaskGroupTitle>
										<TaskGroupDownIcon
											onClick={() => {
												const currentTaskGroupIndex = taskGroups.findIndex((taskGroup) => taskGroup.id === selectedTaskGroupTwo);
												const newTaskGroupIndex = currentTaskGroupIndex == taskGroups.length - 1 ? 0 : currentTaskGroupIndex + 1;
												setSelectedTaskGroupTwo(taskGroups[newTaskGroupIndex].id);
											}}
										/>
									</SelectTaskGroup>
									<SelectTaskGroup>
										<TaskGroupUpIcon
											onClick={() => {
												const currentTaskGroupIndex = taskGroups.findIndex((taskGroup) => taskGroup.id === selectedTaskGroupThree);
												const newTaskGroupIndex = currentTaskGroupIndex == 0 ? taskGroups.length - 1 : currentTaskGroupIndex - 1;
												setSelectedTaskGroupThree(taskGroups[newTaskGroupIndex].id);
											}}
										/>
										<TaskGroupTitle>
											<span>{taskGroups.find((taskGroup) => taskGroup.id === selectedTaskGroupThree)?.name}</span>
											<TaskGroupAddIcon
												onClick={() => {
													const currentTaskGroup = taskGroups.find((taskGroup) => taskGroup.id === selectedTaskGroupThree)!;
													const newTasks = [];
													for (let i = 0; i < currentTaskGroup?.taskAmount; i++) {
														newTasks.push({
															id: uuidv4(),
															store: currentTaskGroup?.store,
															url: "",
															size: "random",
															account: currentTaskGroup?.account,
															proxy: currentTaskGroup?.proxy,
															restartAfterSuccess: false,
															switchProxyAfterError: false,
														});
													}
													const newT = [...tasks, ...newTasks];
													setTasks(newT);
													store.set("tasks", newT);
												}}
											/>
										</TaskGroupTitle>
										<TaskGroupDownIcon
											onClick={() => {
												const currentTaskGroupIndex = taskGroups.findIndex((taskGroup) => taskGroup.id === selectedTaskGroupThree);
												const newTaskGroupIndex = currentTaskGroupIndex == taskGroups.length - 1 ? 0 : currentTaskGroupIndex + 1;
												setSelectedTaskGroupThree(taskGroups[newTaskGroupIndex].id);
											}}
										/>
									</SelectTaskGroup>
								</TaskGroupWrapper>
							</SelectTaskGroupContainer>
							<SelectTaskGroupContainer>
								<SelectTaskGroupTitle>Select Task Group</SelectTaskGroupTitle>
								<AdjustTaskGroupButton
									onClick={() => {
										setShowAdjustTaskGroupsPopUp(true);
									}}
								>
									Adjust Groups
								</AdjustTaskGroupButton>
							</SelectTaskGroupContainer>
						</SelectTaskGroupWrapper>
					</HeaderContainer>
				</LeftPageHeader>
			</PageHeader>
			<TaskTableHeader>
				<TaskTableHeaderTitle>#</TaskTableHeaderTitle>
				<TaskTableHeaderTitle>Site</TaskTableHeaderTitle>
				<TaskTableHeaderTitle>Product</TaskTableHeaderTitle>
				<TaskTableHeaderTitle>Profile</TaskTableHeaderTitle>
				<TaskTableHeaderTitle>Proxy</TaskTableHeaderTitle>
				<TaskTableHeaderTitle>Size</TaskTableHeaderTitle>
				<TaskTableHeaderTitle>Status</TaskTableHeaderTitle>
				<TaskTableHeaderTitle>Actions</TaskTableHeaderTitle>
			</TaskTableHeader>
			<TaskTable>
				{tasks
					.filter((t) => `${t.account}${t.proxy}${t.store}${t.url}${t.size}`.toLowerCase().includes(searchValue.toLowerCase()))
					.map((task, i) => (
						<Task
							key={i}
							id={i + 1 + ""}
							site={task.store}
							product="Nike Dunk Low Panda"
							profile={task.account}
							proxy={task.proxy}
							size={task.size}
							status="Idle"
							start={() => {
								//
							}}
							edit={() => {
								//
							}}
							copy={() => {
								const newT = [...tasks, { ...task, id: uuidv4() }];
								setTasks(newT);
								store.set("tasks", newT);
							}}
							delete={() => {
								const newT = tasks.filter((t) => t.id !== task.id);
								setTasks(newT);
								store.set("tasks", newT);
							}}
						/>
					))}
			</TaskTable>
		</Container>
	);
};

export default Tasks;

const PageHeader = styled.div`
	width: 100%;
	height: 106px;
	display: flex;

	margin-bottom: 23px;
`;

const LeftPageHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-top: 20px;
`;

const CreateTaskButton = styled.button`
	width: 60px;
	height: 60px;
	border-radius: 50%;

	margin-right: 32px;

	background: linear-gradient(180deg, #7a7a7a 0%, #616161 100%);

	display: flex;
	justify-content: center;
	align-items: center;

	padding: 0;
`;

const CaptchaButton = styled.button`
	width: 47px;
	height: 47px;

	background: #3a3939;
	border-radius: 10px;

	display: flex;
	justify-content: center;
	align-items: center;

	padding: 0;
`;

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 20px;
`;

const SelectTaskGroupWrapper = styled.div`
	width: 515px;
	height: 106px;

	background: linear-gradient(91.08deg, #d601ef -1.3%, #de44f0 50.93%, #d601ef 104.26%);
	border-radius: 10px 0px;

	padding-left: 18px;
	padding-right: 10px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const SelectTaskGroupContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;

	& svg path {
		fill: rgba(255, 255, 255, 0.6);
	}
`;

const TaskGroupWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	padding-top: 13px;

	gap: 16px;
`;

const SelectTaskGroup = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& svg:hover {
		cursor: pointer;

		& path {
			stroke: white;
			stroke-opacity: 1;
		}
	}
`;

const TaskGroupTitle = styled.div`
	display: flex;
	align-items: center;

	font-weight: 700;
	font-size: 30px;
	line-height: 36px;

	color: #ffffff;

	gap: 4px;

	& span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 90px;
	}
`;

const SelectTaskGroupTitle = styled.div`
	font-weight: 700;
	font-size: 22px;
	line-height: 27px;

	color: rgba(255, 255, 255, 0.8);

	margin-bottom: 10px;
`;

const AdjustTaskGroupButton = styled.button`
	margin-bottom: 10px;
	padding: 4px 7px 4px 7px;
	background: rgba(255, 255, 255, 0.6);
	border-radius: 5px;

	font-weight: 700;
	font-size: 14px;
	line-height: 17px;

	color: #ffffff;

	cursor: pointer;

	&:hover {
		background: rgba(255, 255, 255, 0.7);
	}
`;

const Container = styled.div`
	width: 100%;
	height: 100%;

	padding-right: 43px;
	padding-left: 29px;
	padding-top: 16px;
`;

const TaskTableHeader = styled.div`
	width: 100%;

	display: flex;
	justify-content: space-between;

	& > div:nth-child(1) {
		width: 30px;
		margin-left: 23px;
	}
	& > div:nth-child(2) {
		width: 169px;
		margin-left: 32px;
	}
	& > div:nth-child(3) {
		width: 306px;
		margin-left: 29px;
	}
	& > div:nth-child(4) {
		width: 105px;
		margin-left: 58px;
	}
	& > div:nth-child(5) {
		width: 75px;
		margin-left: 74px;
	}
	& > div:nth-child(6) {
		width: 69px;
		margin-left: 77px;
	}
	& > div:nth-child(7) {
		width: 223px;
		margin-left: 64px;
	}
	& > div:nth-child(8) {
		width: 215px;
		margin-left: 54px;
	}
`;

const TaskTableHeaderTitle = styled.div`
	font-weight: 700;
	font-size: 25px;

	color: #cccccc;

	text-align: center;
`;

const TaskTable = styled.div`
	width: 100%;
	height: calc(100% - 157px);

	overflow-y: auto;

	padding-top: 10px;

	&::-webkit-scrollbar {
		display: none;
	}
`;
