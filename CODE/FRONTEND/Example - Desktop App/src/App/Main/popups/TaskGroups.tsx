import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";

const store = new Store();

import Modal from "@/App/Main/components/Modal";
import DropDown from "@/App/Main/components/DropDown";

import { ReactComponent as SaveProxyIcon } from "@/App/assets/saveproxy.svg";
import { ReactComponent as DeleteProxyIcon } from "@/App/assets/deleteproxy.svg";
import { ReactComponent as PlusIcon } from "@/App/assets/plus.svg";
import { ReactComponent as EditIcon } from "@/App/assets/edit.svg";
import { ReactComponent as StoreIcon } from "@/App/assets/store.svg";
import { ReactComponent as AccountIcon } from "@/App/assets/account.svg";
import { ReactComponent as ProxyIcon } from "@/App/assets/proxyIcon.svg";

export interface ITaskGroup {
	id: string;
	taskAmount: number;
	name: string;
	store: string;
	account: string;
	proxy: string;
}

interface PopUpInterface {
	close: () => void;
}

const TaskGroups = ({ close }: PopUpInterface) => {
	const [taskGroups, setTaskGroups] = useState<Array<ITaskGroup>>((store.get("taskGroups") as ITaskGroup[]) || []);
	const [taskToEdit, setTaskToEdit] = useState("");
	const [selectedTaskGroup, setSelectedTaskGroup] = useState("");

	const accounts = store.has("accountsettings") ? (store.get("accountsettings") as any[]) : [];
	const proxies = store.has("proxygroups") ? (store.get("proxygroups") as any[]) : [];

	return (
		<Modal width="890px" height="542px" closePopup={close} title="Task Groups">
			<>
				<AddTaskGroupButton
					onClick={() => {
						const id = uuidv4();
						const newTgs = [
							{
								id,
								taskAmount: 1,
								name: "",
								store: "",
								account: "",
								proxy: "",
							},
							...taskGroups,
						];
						store.set("taskGroups", newTgs);
						setTaskGroups(newTgs);
						setTaskToEdit(id);
					}}
				>
					<PlusIcon />
				</AddTaskGroupButton>
				<TaskGroupsContainer>
					{taskGroups.map((taskGroup, i) => (
						<TaskGroup
							key={taskGroup.id}
							taskGroup={taskGroup}
							edit={() => {
								setTaskToEdit(taskGroup.id);
							}}
							forEdit={taskToEdit === taskGroup.id}
							onChange={(taskGroup) => {
								const newTgs = taskGroups.map((tg) => (tg.id === taskGroup.id ? taskGroup : tg));
								store.set("taskGroups", newTgs);
								setTaskGroups(newTgs);
							}}
							onClick={() => {
								if (taskGroup.id === selectedTaskGroup) setSelectedTaskGroup("");
								else setSelectedTaskGroup(taskGroup.id);
							}}
							active={selectedTaskGroup === taskGroup.id}
							accounts={accounts}
							proxies={proxies}
						/>
					))}
				</TaskGroupsContainer>
				<Button
					style={{ right: "21px", background: "linear-gradient(91.08deg, #F50181 -1.3%, #EF3A99 50.93%, #F50181 104.26%)" }}
					onClick={() => {
						const newTgs = taskGroups.filter((tg) => tg.id != selectedTaskGroup);
						setTaskGroups(newTgs);
						store.set("taskGroups", newTgs);
					}}
				>
					<DeleteProxyIcon />
					Delete
				</Button>
			</>
		</Modal>
	);
};

export default TaskGroups;

interface ITaskGroupProps {
	taskGroup: ITaskGroup;
	edit: () => void;
	forEdit: boolean;
	onChange: (e: ITaskGroup) => void;
	onClick: () => void;
	active: boolean;

	accounts: any[];
	proxies: any[];
}

const TaskGroup = ({ taskGroup, edit, forEdit, onChange, onClick, active, accounts, proxies }: ITaskGroupProps) => {
	const [taskGroupName, setTaskGroupName] = useState(taskGroup.name);
	const [taskAmount, setTaskAmount] = useState(taskGroup.taskAmount);
	const [store, setStore] = useState(taskGroup.store);
	const [account, setAccount] = useState(taskGroup.account);
	const [proxy, setProxy] = useState(taskGroup.proxy);

	const changeTaskGroupDetails = () => {
		onChange({
			...taskGroup,
			name: taskGroupName,
			taskAmount,
			store,
			account,
			proxy,
		});
	};

	return (
		<TaskGroupContainer onClick={onClick} active={active}>
			<TaskGroupTitle>
				<TaskGroupNameInput
					type="text"
					value={taskGroupName}
					placeholder="Name"
					onChange={(e) => {
						setTaskGroupName(e.target.value);
						changeTaskGroupDetails();
					}}
					disabled={!forEdit}
					style={{ width: taskGroupName == "" ? "90px" : `${(taskGroupName.length + 1) / 2}em` }}
				/>
				<TaskAmountInput
					type="number"
					value={taskAmount}
					onChange={(e) => {
						setTaskAmount(Number(e.target.value));
						changeTaskGroupDetails();
					}}
					disabled={!forEdit}
					style={{ width: `${(taskAmount.toString().length + 1) / 2}em` }}
				/>
				<span> Tasks</span>
			</TaskGroupTitle>
			<EditIcon
				onClick={(e) => {
					e.stopPropagation();
					edit();
				}}
			/>
			<DetailLabelsContainer>
				<DropDown
					options={[{ value: "Footlocker EU", label: "Footlocker EU" }]}
					title="Store"
					onSelect={(v) => {
						setStore(v.value);
						changeTaskGroupDetails();
					}}
					style={{ width: "300px", height: "57px", marginTop: 0 }}
					icon={StoreIcon}
					disabled={!forEdit}
					value={{ value: store, label: store }}
				/>
				<DropDown
					options={accounts.map((a) => ({ value: a.id, label: a.name }))}
					title="Account"
					onSelect={(v) => {
						setAccount(v.value);
						changeTaskGroupDetails();
					}}
					style={{ width: "240px", height: "57px", marginTop: 0 }}
					icon={AccountIcon}
					disabled={!forEdit}
					value={{ value: account, label: account }}
				/>
				<DropDown
					options={proxies.map((p) => ({ value: p.id, label: p.name }))}
					title="Proxies"
					onSelect={(v) => {
						setProxy(v.value);
						changeTaskGroupDetails();
					}}
					style={{ width: "240px", height: "57px", marginTop: 0 }}
					icon={ProxyIcon}
					disabled={!forEdit}
					value={{ value: proxy, label: proxy }}
				/>
			</DetailLabelsContainer>
		</TaskGroupContainer>
	);
};

const AddTaskGroupButton = styled.button`
	width: 42px;
	height: 42px;

	font-weight: 500;
	font-size: 35px;

	display: flex;
	align-items: center;
	justify-content: center;

	color: #ffffff;

	background: linear-gradient(180deg, #da1cf0 0%, #df7ceb 100%);

	position: absolute;
	top: 17px;
	right: 25px;

	border-radius: 50%;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 13px;

	height: 60px;
	width: 200px;

	font-weight: 500;
	font-size: 25px;
	line-height: 30px;

	padding: 0 20px 0 20px;

	background: #4f4f4f;
	border-radius: 5px;

	color: #ffffff;

	position: absolute;
	bottom: 23px;

	& > svg {
		path {
			fill: #ffffff;
		}
	}
`;

const TaskGroupsContainer = styled.div`
	width: 100%;
	height: 364px;

	margin-top: 20px;

	overflow-y: auto;

	::-webkit-scrollbar {
		display: none;
	}
`;

const TaskGroupContainer = styled.div<{ active: boolean }>`
	width: 100%;
	height: 129px;

	background: #313131;
	border-radius: 10px;

	margin-bottom: 15px;

	position: relative;

	& > svg {
		position: absolute;
		top: 16px;
		right: 20px;

		cursor: pointer;
	}

	border: 1px solid ${({ active }) => (active ? "#65D5FF" : "transparent")};
`;

const TaskGroupTitle = styled.div`
	position: absolute;
	top: 18px;
	left: 24px;

	display: flex;
	align-items: center;

	& > span {
		font-weight: 500;
		font-size: 15px;

		color: #7c7c7c;
		transform: translateY(5px);
	}
`;

const DetailLabelsContainer = styled.div`
	position: absolute;
	left: 11px;
	right: 11px;
	bottom: 11px;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const TaskGroupNameInput = styled.input`
	border: none;
	background: transparent;
	padding: 0;

	font-weight: 700;
	font-size: 30px;
	line-height: 36px;
	color: #cccccc;

	height: 28px;
`;

const TaskAmountInput = styled.input`
	font-weight: 500;
	font-size: 15px;

	color: #7c7c7c;

	margin-left: 8px;
	transform: translateY(5px);
	padding: 0;

	::-webkit-outer-spin-button,
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	border: none;
	background: transparent;
	padding: 0;
`;
