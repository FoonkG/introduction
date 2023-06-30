import React, { useState } from "react";
import styled from "styled-components";
import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";

const electronStore = new Store();

import Modal from "@/App/Main/components/Modal";
import DropDown from "@/App/Main/components/DropDown";
import PopUpInput from "@/App/Main/components/PopUpInput";

import { ReactComponent as LinkIcon } from "@/App/assets/link.svg";
import { ReactComponent as SizeIcon } from "@/App/assets/size.svg";
import { ReactComponent as AccountIcon } from "@/App/assets/account.svg";
import { ReactComponent as ProxyIcon } from "@/App/assets/proxyIcon.svg";
import { ReactComponent as StoreIcon } from "@/App/assets/store.svg";
import { ReactComponent as NumberSelectorArrowIcon } from "@/App/assets/numberSelectorArrow.svg";

import { ReactComponent as SaveProxyIcon } from "@/App/assets/saveproxy.svg";
import { ReactComponent as DeleteProxyIcon } from "@/App/assets/deleteproxy.svg";

interface PopUpInterface {
	close: () => void;
	addTasks: (tasks: ITask[]) => void;
}

export interface ITask {
	id: string;
	store: string;
	url: string;
	size: string;
	account: string;
	proxy: string;
	restartAfterSuccess: boolean;
	switchProxyAfterError: boolean;
}

const CreateTask = ({ close, addTasks }: PopUpInterface) => {
	const [store, setStore] = useState("");
	const [url, setUrl] = useState("");
	const [size, setSize] = useState("");
	const [random, setRandom] = useState(false);
	const [account, setAccount] = useState("");
	const [proxy, setProxy] = useState("");
	const [taskNumber, setTaskNumber] = useState(1);
	const [restartAfterSuccess, setRestartAfterSuccess] = useState(false);
	const [switchProxyAfterError, setSwitchProxyAfterError] = useState(false);

	const accounts = electronStore.has("accountsettings") ? (electronStore.get("accountsettings") as any[]) : [];
	const proxies = electronStore.has("proxygroups") ? (electronStore.get("proxygroups") as any[]) : [];

	return (
		<Modal width="890px" height="542px" closePopup={close} title="Create A Task">
			<>
				<DropDown
					options={[{ value: "Footlocker EU", label: "Footlocker EU" }]}
					title="Store"
					onSelect={(v) => {
						setStore(v.value);
					}}
					style={{ width: "349px", marginTop: "16px" }}
					icon={StoreIcon}
				/>
				<PopUpInput
					type="text"
					value={url}
					onChange={(e) => {
						setUrl(e.target.value);
					}}
					icon={LinkIcon}
					width="818px"
				/>
				<SplitContainer>
					<div>
						<SplitInputsContainer>
							<DropDown
								options={[{ value: "US9", label: "US9" }]}
								title="Size"
								onSelect={(v) => {
									setSize(v.value);
								}}
								style={{ width: "220px", marginTop: "0px" }}
								icon={SizeIcon}
							/>
							<Checkbox
								active={random}
								onClick={() => {
									setRandom(!random);
								}}
							/>
							<RandomText>Random</RandomText>
						</SplitInputsContainer>

						<DropDown
							options={accounts.map((a) => ({ value: a.id, label: a.name }))}
							title="Account"
							onSelect={(v) => {
								setAccount(v.value);
							}}
							style={{ width: "349px", marginTop: "35px" }}
							icon={AccountIcon}
						/>
						<DropDown
							options={proxies.map((p) => ({ value: p.id, label: p.name }))}
							title="Proxy"
							onSelect={(v) => {
								setProxy(v.value);
							}}
							style={{ width: "349px", marginTop: "16px" }}
							icon={ProxyIcon}
						/>
						<NumberSelector>
							<NumberSelectorText>{taskNumber} Tasks</NumberSelectorText>
							<NumberSelectorArrowsContainer>
								<NumberSelectorArrowIcon
									onClick={() => {
										setTaskNumber(taskNumber + 1);
									}}
								/>
								<NumberSelectorArrowIcon
									style={{ transform: "rotateX(180deg)" }}
									onClick={() => {
										if (taskNumber > 1) setTaskNumber(taskNumber - 1);
									}}
								/>
							</NumberSelectorArrowsContainer>
						</NumberSelector>
					</div>
					<div style={{ width: "359px" }}>
						<ToggleSwitchWrapper style={{ marginTop: "57px" }}>
							Restart after success{" "}
							<ToggleSwitch active={restartAfterSuccess} onClick={() => setRestartAfterSuccess(!restartAfterSuccess)}>
								<ToggleIcon active={restartAfterSuccess} />
							</ToggleSwitch>
						</ToggleSwitchWrapper>
						<ToggleSwitchWrapper>
							Switch proxy after error{" "}
							<ToggleSwitch active={switchProxyAfterError} onClick={() => setSwitchProxyAfterError(!switchProxyAfterError)}>
								<ToggleIcon active={switchProxyAfterError} />
							</ToggleSwitch>
						</ToggleSwitchWrapper>
					</div>
				</SplitContainer>
				<Button
					style={{ right: "234px", background: "linear-gradient(91.08deg, #F50181 -1.3%, #EF3A99 50.93%, #F50181 104.26%)" }}
					onClick={close}
				>
					<DeleteProxyIcon />
					Delete
				</Button>
				<Button
					style={{ right: "21px", background: "linear-gradient(91.08deg, #47C8F9 -1.3%, #65D5FF 50.93%, #47C8F9 104.26%)" }}
					onClick={() => {
						const tasks: ITask[] = [];

						for (let i = 0; i < taskNumber; i++) {
							tasks.push({
								id: uuidv4(),
								store,
								url,
								size: random ? "random" : size,
								account,
								proxy,
								restartAfterSuccess,
								switchProxyAfterError,
							});
						}

						addTasks(tasks);
					}}
				>
					<SaveProxyIcon />
					Save
				</Button>
			</>
		</Modal>
	);
};

export default CreateTask;

const SplitContainer = styled.div`
	display: flex;
	justify-content: space-between;

	& > div {
		width: calc(50% - 6.5px);
	}

	margin-top: 16px;
`;

const Checkbox = styled.div<{ active: boolean }>`
	width: 22px;
	height: 22px;

	border: 4px solid #797979;
	background: ${({ active }) => (active ? "#797979" : "transparent")};

	margin-left: 21px;
	margin-right: 11px;

	cursor: pointer;
`;

const SplitInputsContainer = styled.div`
	display: flex;
	align-items: center;
`;

const RandomText = styled.div`
	font-weight: 400;
	font-size: 25px;

	color: #cccccc;
`;

const NumberSelector = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background: #252525;
	border-radius: 10px;

	width: 150px;
	height: 57px;

	margin-top: 16px;

	padding-left: 11px;
`;

const NumberSelectorText = styled.div`
	font-weight: 400;
	font-size: 25px;

	color: #cccccc;
`;

const NumberSelectorArrowsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100%;

	padding-top: 11px;
	padding-bottom: 11px;
	padding-right: 9.4px;

	& svg {
		cursor: pointer;
	}
`;

const ToggleSwitchWrapper = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0;

	font-weight: 400;
	font-size: 25px;
	line-height: 30px;

	color: #cccccc;

	margin-top: 20px;
`;

const ToggleSwitch = styled.button<{ active: boolean }>`
	background: ${({ active }) => (active ? "#CCCCCC" : "#797979")};
	width: 58px;
	height: 28px;

	border-radius: 25px;

	position: relative;

	padding-left: 6px;
	padding-right: 6px;
`;

const ToggleIcon = styled.div<{ active: boolean }>`
	background: #353535;
	position: absolute;
	top: 5.5px;

	left: ${({ active }) => (!active ? "6px" : "none")};
	right: ${({ active }) => (active ? "6px" : "none")};

	width: 18px;
	height: 18px;

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
