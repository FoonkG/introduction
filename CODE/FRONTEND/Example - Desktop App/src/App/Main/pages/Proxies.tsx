import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ipcRenderer } from "electron";

import Store from "electron-store";

import { ReactComponent as EditProxyIcon } from "@/App/assets/editproxy.svg";

import { ReactComponent as SaveProxyIcon } from "@/App/assets/saveproxy.svg";
import { ReactComponent as DeleteProxyIcon } from "@/App/assets/deleteproxy.svg";
import { ReactComponent as AddProxyicon } from "@/App/assets/addproxy.svg";

import { ReactComponent as ImportProxyIcon } from "@/App/assets/importproxy.svg";
import ProxyGroupPopup from "../popups/ProxyGroupPopup";
import { v4 as uuidv4 } from "uuid";

const store = new Store();

import { Import } from "../Main";

const Proxies = () => {
	const [proxygroups, setProxyGroups] = useState(store.has("proxygroups") ? (store.get("proxygroups") as any[]) : []);

	const [selectedProxyGroup, setSelectedProxyGroup] = useState("");
	const [openMenu, setOpenMenu] = useState("");

	const [proxies, setProxies] = useState<any[]>([]);

	useEffect(() => {
		if (selectedProxyGroup !== "" && proxygroups.length > 0) {
			setProxies(proxygroups.filter((e) => e.id === selectedProxyGroup)[0].proxies);
		}

		Import.EE.on("importProxies", (proxies: any[]) => {
			console.log(proxies);
			const proxyGroup = proxygroups.find((x: any) => x.id === selectedProxyGroup);
			proxyGroup.proxies = [...proxyGroup.proxies, ...proxies];
			const newProxygroups = proxygroups.map((x: any) => {
				if (x.id === selectedProxyGroup) {
					return proxyGroup;
				}
				return x;
			});
			console.log(proxyGroup);
			setProxyGroups(newProxygroups);
			setProxies(newProxygroups.filter((e) => e.id === selectedProxyGroup)[0].proxies);
			store.set("proxygroups", newProxygroups);
		});

		return () => {
			Import.EE.removeAllListeners("importProxies");
		};
	}, [selectedProxyGroup]);

	const [showCreatePopup, setShowCreatePopup] = useState(false);
	const [newGroup, setNewGroup] = useState(false);

	return (
		<Container>
			{showCreatePopup && (
				<ProxyGroupPopup
					setName={(value) => {
						if (newGroup) {
							const id = uuidv4();
							const proxies = [...proxygroups, { id, name: value, proxies: [] }];
							store.set("proxygroups", proxies);
							setSelectedProxyGroup(id);
						} else {
							const newProxyGroups = proxygroups.map((e) => {
								if (e.id === selectedProxyGroup) {
									e.name = value;
								}
								return e;
							});
							store.set("proxygroups", newProxyGroups);
						}
						setProxyGroups(store.has("proxygroups") ? (store.get("proxygroups") as any[]) : []);

						setNewGroup(false);
						setShowCreatePopup(false);
					}}
					close={() => setShowCreatePopup(false)}
				/>
			)}
			<LeftContainer>
				<Title>Proxy Groups</Title>
				<ProxyGroupContainer>
					{proxygroups.length > 0 &&
						proxygroups.map((proxygroup: any, index: any) => {
							return (
								<ProxyGroup selected={selectedProxyGroup === proxygroup.id} key={proxygroup.id}>
									<ProxyGroupMenu open={openMenu === proxygroup.id}>
										<MenuItem
											onClick={() => {
												setSelectedProxyGroup(proxygroup.id);
												setOpenMenu("");
											}}
										>
											Open
										</MenuItem>
										<MenuItem
											onClick={() => {
												setSelectedProxyGroup(proxygroup.id);
												setNewGroup(false);
												setShowCreatePopup(true);
												setOpenMenu("");
											}}
										>
											Edit Name
										</MenuItem>
										<MenuItem
											onClick={() => {
												store.set(
													"proxygroups",
													proxygroups.filter((p) => p.id !== proxygroup.id)
												);
												setProxyGroups(store.has("proxygroups") ? (store.get("proxygroups") as any[]) : []);
											}}
										>
											Delete
										</MenuItem>
									</ProxyGroupMenu>
									<StaggeredProxyGroupContainer>
										<StaggerTopItem>{proxygroup.name}</StaggerTopItem>
										<StaggeredBottomItem>
											{proxygroup.proxies.length} {proxygroup.proxies.length == 1 ? "Proxy" : "Proxies"}
										</StaggeredBottomItem>
									</StaggeredProxyGroupContainer>
									<EditProxyIcon
										onClick={() => {
											if (openMenu !== "" && openMenu === proxygroup.id) {
												setOpenMenu("");
											} else {
												setOpenMenu(proxygroup.id);
											}
										}}
									/>
								</ProxyGroup>
							);
						})}
				</ProxyGroupContainer>
			</LeftContainer>
			<RightContainer>
				<ProxieInput placeholder="IP:PORT" value={proxies.join("\n")} onChange={(e) => setProxies(e.target.value.split(/\n/))} />
				<BottomWrapper>
					<StyledImportProxyIcon
						onClick={() => {
							if (selectedProxyGroup != "") {
								console.log("sent");
								ipcRenderer.send("toMain", [
									{
										command: "importProxies",
									},
								]);
							} else {
								alert("Open Proxy Group first");
							}
						}}
					/>
					<BottomRightButtonContainer>
						<Button
							onClick={() => {
								setNewGroup(true);
								setShowCreatePopup(true);
							}}
						>
							<AddProxyicon />
							Create New Group
						</Button>
						<Button
							onClick={() => {
								const selected = proxygroups.filter((e) => e.id === selectedProxyGroup)[0];
								selected.proxies = proxies;
								store.set("proxygroups", proxygroups);
							}}
						>
							<SaveProxyIcon />
							Save
						</Button>
					</BottomRightButtonContainer>
				</BottomWrapper>
			</RightContainer>
		</Container>
	);
};

export default Proxies;

const Container = styled.div`
	width: 100%;
	height: 100%;

	color: white;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 80px;

	padding-top: 64px;
	padding-left: 80px;
`;

const LeftContainer = styled.div`
	height: 100%;
	width: 311px;

	position: relative;
`;

const Title = styled.div`
	font-weight: 500;
	font-size: 30px;
	line-height: 36px;

	color: #cccccc;
`;

const ProxyGroupContainer = styled.div`
	height: 868px;
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	overflow-y: auto;

	margin-top: 32px;

	::-webkit-scrollbar {
		width: 0;
	}

	gap: 30px;
`;

const ProxyGroup = styled.div<{ selected: boolean }>`
	width: 311px;
	height: 166px;
	min-height: 166px;

	border: 2px solid #ffffff;
	border-radius: 10px;

	box-shadow: ${({ selected }) => (selected ? "0px 0px 20px 0px #ffffff" : "none")};

	&:nth-child(3n - 2) {
		background: linear-gradient(105.41deg, #4acafa -2.65%, #62d4ff 47.61%, #4ecbfb 98.4%);
	}

	&:nth-child(3n - 1) {
		background: linear-gradient(105.41deg, #f50984 -2.65%, #f03899 47.61%, #f50a85 98.4%);
	}

	&:nth-child(3n) {
		background: linear-gradient(105.41deg, #d706f0 -2.65%, #df43f1 47.61%, #d80af0 98.4%);
	}

	display: flex;
	align-items: center;
	justify-content: center;

	& svg:hover {
		cursor: pointer;
	}

	& svg:hover path {
		fill: #515151;
	}
`;

const ProxyGroupMenu = styled.div<{ open: boolean }>`
	position: absolute;
	left: calc(100% - 24px);

	width: 176px;

	border-radius: 5px;
	overflow: hidden;

	display: ${({ open }) => (open ? "flex" : "none")};
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	gap: 2px;
`;

const MenuItem = styled.button`
	padding-left: 29px;

	height: 43px;
	width: 100%;

	font-weight: 500;
	font-size: 20px;
	line-height: 24px;

	color: #cccccc;

	text-align: left;
	background: #515151;

	cursor: pointer;

	&:hover {
		color: white;
	}
`;

const StaggeredProxyGroupContainer = styled.div`
	width: 232px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	gap: 16px;
`;

const StaggerTopItem = styled.div`
	font-weight: 500;
	font-size: 30px;
	line-height: 36px;

	width: 100%;
	padding-right: 20px;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	color: #fffefe;
`;

const StaggeredBottomItem = styled.div`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;

	width: 100%;
	padding-right: 20px;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	color: rgba(255, 255, 255, 0.8);
`;

const RightContainer = styled.div`
	width: 1120px;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;

	padding-bottom: 35px;
`;

const ProxieInput = styled.textarea`
	width: 1121px;
	height: 819px;

	resize: none;

	padding: 30px;

	font-weight: 500;
	font-size: 30px;
	line-height: 36px;

	outline: none;

	color: white;

	background: #353535;
	border-radius: 10px;
`;

const BottomWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
`;

const BottomRightButtonContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	gap: 22px;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 13px;

	height: 54px;

	font-weight: 500;
	font-size: 25px;
	line-height: 30px;

	padding: 0 20px 0 20px;

	background: #4f4f4f;
	border-radius: 5px;

	color: #cccccc;
`;

const StyledImportProxyIcon = styled(ImportProxyIcon)`
	cursor: pointer;

	&:hover path {
		fill: white;
	}
`;
