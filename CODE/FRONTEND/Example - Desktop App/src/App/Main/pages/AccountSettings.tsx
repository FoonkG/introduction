import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ipcRenderer } from "electron";

import { v4 as uuidv4 } from "uuid";

import { ReactComponent as EditProxyIcon } from "@/App/assets/editproxy.svg";

import { ReactComponent as AddProfileIcon } from "@/App/assets/addprofilegroup.svg";

import { ReactComponent as VisaIcon } from "@/App/assets/visa.svg";

import { ReactComponent as CopyProfileIcon } from "@/App/assets/copyprofile.svg";

import { ReactComponent as CreditCardLogo } from "@/App/assets/creditcardLogo.svg";
import { ReactComponent as VisaColoredIcon } from "@/App/assets/visaicon.svg";

import { ReactComponent as SaveProxyIcon } from "@/App/assets/saveproxy.svg";
import { ReactComponent as DeleteProxyIcon } from "@/App/assets/deleteproxy.svg";
import { ReactComponent as AddProxyicon } from "@/App/assets/addproxy.svg";

import { ReactComponent as ImportProxyIcon } from "@/App/assets/importproxy.svg";

import Store from "electron-store";
import AccountSettingsPopup from "../popups/AccountSettingsPopup";
const store = new Store();

import { Import } from "../Main";

const AccountSettings = () => {
	const [selectedProfileGroup, setSelectedProfileGroup] = useState("");
	const [openMenu, setOpenMenu] = useState("");
	const [accountsettings, setaccountsettings] = useState(store.has("accountsettings") ? (store.get("accountsettings") as any[]) : []);

	const [selectedProfile, setSelectedProfile] = useState("");

	const [name, setName] = useState("");
	const [postal, setPostal] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [street, setStreet] = useState("");
	const [country, setCountry] = useState("");
	const [phone, setPhone] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [cardName, setCardName] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [cvc, setCVC] = useState("");

	const [includeInRandom, setIncludeInRandom] = useState(false);
	const [skipOnError, setSkipOnError] = useState(false);

	const setProfileData = (prf: any) => {
		setName(prf.name);
		setPostal(prf.postal);
		setCity(prf.city);
		setEmail(prf.email);
		setStreet(prf.street);
		setCountry(prf.country);
		setPhone(prf.phone);
		setCardNumber(prf.cardNumber);
		setCardName(prf.cardName);
		setExpiryDate(prf.expiryDate);
		setCVC(prf.cvc);
		setIncludeInRandom(prf.includeInRandom);
		setSkipOnError(prf.skipOnError);
	};

	useEffect(() => {
		if (selectedProfile !== "" && selectedProfileGroup !== "") {
			const profile = accountsettings.find((x: any) => x.id === selectedProfileGroup)?.profiles.find((x: any) => x.id === selectedProfile);
			setProfileData(profile);
		}

		Import.EE.on("importProfiles", (profiles: any[]) => {
			const profileGroup = accountsettings.find((x: any) => x.id === selectedProfileGroup);
			profileGroup.profiles = [
				...profileGroup.profiles,
				...profiles.map((prf) => {
					return {
						id: uuidv4(),
						name: `${prf.FIRSTNAME} ${prf.LASTNAME}`,
						street: prf.STREET,
						postalcode: prf.POSTCODE,
						city: prf.CITY,
						country: prf.COUNTRY,
						email: prf.EMAIL,
						phone: prf.TELEPHONE,
						cardNumber: prf.CC_NUMBER,
						cardName: prf.CC_HOLDER,
						cardExpiry: `${prf.EXPIREY_MONTH}/${prf.EXPIREY_YEAR}`,
						cvc: prf.CVV,
						includeInRandom: false,
						skipOnError: false,
					};
				}),
			];

			const newAccountSettings = accountsettings.map((prf) => {
				if (prf.id === selectedProfileGroup) {
					return profileGroup;
				}
				return prf;
			});

			setaccountsettings(newAccountSettings);
			store.set("accountsettings", newAccountSettings);
		});

		return () => {
			Import.EE.removeAllListeners("importProfiles");
		};
	}, [selectedProfile, selectedProfileGroup]);

	const [showCreatePopup, setShowCreatePopup] = useState(false);
	const [newGroup, setNewGroup] = useState(false);

	return (
		<Container>
			{showCreatePopup && (
				<AccountSettingsPopup
					setName={(value) => {
						if (newGroup) {
							const id = uuidv4();
							const profiles = [...accountsettings, { id, name: value, profiles: [] }];
							store.set("accountsettings", profiles);
							setSelectedProfileGroup(id);
						} else {
							const newProfileGroups = accountsettings.map((e) => {
								if (e.id === selectedProfileGroup) {
									e.name = value;
								}
								return e;
							});
							store.set("accountsettings", newProfileGroups);
						}
						setaccountsettings(store.has("accountsettings") ? (store.get("accountsettings") as any[]) : []);

						setNewGroup(false);
						setShowCreatePopup(false);
					}}
					close={() => setShowCreatePopup(false)}
				/>
			)}
			<LeftContainer>
				<Title>Profile Groups</Title>
				<ProfileGroupContainer>
					{accountsettings.length > 0 &&
						accountsettings.map((proxygroup, index) => {
							return (
								<ProfileGroup selected={selectedProfileGroup === proxygroup.id} key={proxygroup.id}>
									<ProfileGroupMenu open={openMenu === proxygroup.id}>
										<MenuItem
											onClick={() => {
												console.log(proxygroup.id);
												setSelectedProfileGroup(proxygroup.id);
												setOpenMenu("");
											}}
										>
											Open
										</MenuItem>
										<MenuItem
											onClick={() => {
												setSelectedProfileGroup(proxygroup.id);
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
													"accountsettings",
													accountsettings.filter((p) => p.id !== proxygroup.id)
												);
												setaccountsettings(store.has("accountsettings") ? (store.get("accountsettings") as any[]) : []);
											}}
										>
											Delete
										</MenuItem>
									</ProfileGroupMenu>
									<StaggeredProfileGroupContainer>
										<StaggerTopItem>{proxygroup.name}</StaggerTopItem>
										<StaggeredBottomItem>{proxygroup.profiles.length} Profiles</StaggeredBottomItem>
									</StaggeredProfileGroupContainer>
									<EditProxyIcon
										onClick={() => {
											if (openMenu !== "" && openMenu === proxygroup.id) {
												setOpenMenu("");
											} else {
												setOpenMenu(proxygroup.id);
											}
										}}
									/>
								</ProfileGroup>
							);
						})}
				</ProfileGroupContainer>
			</LeftContainer>
			<RightContainer>
				<RightContainerTopContainer>
					<ProfileGroupName>
						{selectedProfileGroup !== "" && accountsettings.length > 0
							? accountsettings.filter((e) => e.id === selectedProfileGroup)[0].name
							: "No profile group selected"}
					</ProfileGroupName>
					<StyledAddProfileIcon
						onClick={() => {
							const profile = {
								id: uuidv4(),
								name: "",
								street: "",
								postalcode: "",
								city: "",
								country: "",
								email: "",
								phone: "",
								cardNumber: "",
								cardName: "",
								cardExpiry: "",
								cvc: "",
								includeInRandom: false,
								skipOnError: false,
							};

							if (selectedProfileGroup !== "") {
								const profileGroup = accountsettings.filter((e) => e.id === selectedProfileGroup)[0];
								profileGroup.profiles.push(profile);
								store.set("accountsettings", accountsettings);
							}
							setaccountsettings(store.has("accountsettings") ? (store.get("accountsettings") as any[]) : []);
						}}
					/>
				</RightContainerTopContainer>
				<ProfileContainer>
					{selectedProfileGroup !== "" &&
						accountsettings.length > 0 &&
						accountsettings
							.filter((e) => e.id === selectedProfileGroup)[0]
							.profiles.map((profile: any, index: any) => {
								return (
									<Profile
										selected={selectedProfile === profile.id}
										onClick={() => {
											setSelectedProfile(profile.id);
										}}
										key={profile.id}
									>
										<ProfileText>{index + 1}</ProfileText>
										<ProfileText>{profile.name}</ProfileText>
										<ProfileText>{profile.street}</ProfileText>
										<ProfileText>
											{profile.postalcode} {profile.city}
										</ProfileText>
										<ProfileText>
											<VisaIcon />
											{profile.cardNumber.substring(profile.cardNumber.length - 4)}
										</ProfileText>
										<ProfileText>
											<StyledCopyProfile
												onClick={() => {
													const newAccountSettings = accountsettings.map((as) => {
														if (as.id === selectedProfileGroup) {
															as.profiles.push({ ...profile, id: uuidv4() });
														}
														return as;
													});
													setaccountsettings(newAccountSettings);
													store.set("accountsettings", newAccountSettings);
												}}
											/>
										</ProfileText>
									</Profile>
								);
							})}
				</ProfileContainer>
				<InputContainer>
					<InputRow>
						<InputField type="text" width="349px" marginRight="16px" placeholder="Name" value={name} onChange={(e) => setName(e)} />
						<InputField
							type="text"
							width="108px"
							marginRight="10px"
							placeholder="Postal Code"
							value={postal}
							onChange={(e) => setPostal(e)}
						/>
						<InputField type="text" width="232px" marginRight="16px" placeholder="City" value={city} onChange={(e) => setCity(e)} />
						<InputField type="text" width="349px" placeholder="Email" value={email} onChange={(e) => setEmail(e)} />
					</InputRow>
					<InputRow marginTop="16px">
						<InputField type="text" width="349px" marginRight="16px" placeholder="Street" value={street} onChange={(e) => setStreet(e)} />
						<InputField
							type="text"
							width="349px"
							marginRight="16px"
							placeholder="Country"
							value={country}
							onChange={(e) => setCountry(e)}
						/>
						<InputField type="text" width="349px" placeholder="Phone" value={phone} onChange={(e) => setPhone(e)} />
					</InputRow>
					<Divider />
					<BottomContainer>
						<BottomLeftContainer>
							<InputField
								type="text"
								width="349px"
								placeholder="Card Number"
								value={cardNumber}
								onChange={(e) => setCardNumber(e)}
								paddingRight="59px"
								children={<StyledVisaIcon />}
							/>
							<InputField type="text" width="349px" placeholder="Card Name" value={cardName} onChange={(e) => setCardName(e)} />
							<InputField
								type="text"
								width="349px"
								placeholder="Expire date"
								value={expiryDate}
								onChange={(e) => setExpiryDate(e)}
								paddingRight="115px"
								children={<CVCInput type={"text"} placeholder="CVC" value={cvc} onChange={(e) => setCVC(e.target.value)} />}
							/>
						</BottomLeftContainer>
						<BottomCenterContainer>
							<InnerCreditCardContainer>
								<VisaColoredIcon />
								<StyledCreditCardLogo />
								<StaggeredCreditCard>
									<CreditCardNumber>{cardNumber}</CreditCardNumber>
									<CreditCardInfoContainer>
										<CreditCardInfo>{cardName}</CreditCardInfo>
										<CreditCardInfo>{expiryDate}</CreditCardInfo>
									</CreditCardInfoContainer>
								</StaggeredCreditCard>
							</InnerCreditCardContainer>
						</BottomCenterContainer>
						<BottomRightContainer>
							<ToggleSwitchWrapper>
								Include in random{" "}
								<ToggleSwitch active={includeInRandom} onClick={() => setIncludeInRandom(!includeInRandom)}>
									<ToggleIcon active={includeInRandom} />
								</ToggleSwitch>
							</ToggleSwitchWrapper>
							<ToggleSwitchWrapper>
								Skip on error{" "}
								<ToggleSwitch active={skipOnError} onClick={() => setSkipOnError(!skipOnError)}>
									<ToggleIcon active={skipOnError} />
								</ToggleSwitch>
							</ToggleSwitchWrapper>
						</BottomRightContainer>
					</BottomContainer>
				</InputContainer>
				<BottomWrapper>
					<StyledImportProxyIcon
						onClick={() => {
							if (selectedProfileGroup != "") {
								ipcRenderer.send("toMain", [
									{
										command: "importProfiles",
									},
								]);
							} else {
								alert("Open Profile Group first");
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
								if (selectedProfile !== "") {
									const profileGroup = accountsettings.filter((e) => e.id === selectedProfileGroup)[0];
									const newProfiles = profileGroup.profiles.filter((e: any) => e.id !== selectedProfile);
									profileGroup.profiles = newProfiles;
									store.set("accountsettings", accountsettings);
								}

								setaccountsettings(store.has("accountsettings") ? (store.get("accountsettings") as any[]) : []);
							}}
						>
							<DeleteProxyIcon />
							Delete
						</Button>
						<Button
							onClick={() => {
								if (selectedProfile !== "") {
									//Change the values of the selected profile
									const profileGroup = accountsettings.filter((e) => e.id === selectedProfileGroup)[0];
									const newProfiles = profileGroup.profiles.filter((e: any) => e.id !== selectedProfile);
									newProfiles.push({
										id: selectedProfile,
										name: name,
										street: street,
										postalcode: postal,
										city: city,
										country: country,
										email: email,
										phone: phone,
										cardNumber: cardNumber,
										cardName: cardName,
										cardExpiry: expiryDate,
										cvc: cvc,
										includeInRandom: includeInRandom,
										skipOnError: skipOnError,
									});
									profileGroup.profiles = newProfiles;
									store.set("accountsettings", accountsettings);
								}
								setaccountsettings(store.has("accountsettings") ? (store.get("accountsettings") as any[]) : []);
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

export default AccountSettings;

interface IInput {
	type: string;
	width?: string;
	placeholder: string;
	marginRight?: string;
	value: any;
	onChange: (e: any) => void;
	paddingRight?: string;
	children?: any;
}

const InputField = (props: IInput) => {
	return (
		<InputWrapper>
			<Input
				width={props.width}
				marginRight={props.marginRight}
				paddingRight={props.paddingRight}
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
			/>
			{props.children}
		</InputWrapper>
	);
};

const InputWrapper = styled.div`
	position: relative;
	display: inline;
`;

const Input = styled.input<{ width?: string; marginRight?: string; paddingRight?: string }>`
	width: ${({ width }) => (width ? width : "100%")};
	margin-right: ${({ marginRight }) => (marginRight ? marginRight : "0")};

	padding: 14px ${({ paddingRight }) => (paddingRight ? paddingRight : "15px")} 14px 18px;

	font-weight: 400;
	font-size: 25px;
	line-height: 30px;

	position: relative;

	background: #252525;
	border-radius: 10px;
	outline: none;

	color: #cccccc;
`;

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

const ProfileGroupContainer = styled.div`
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

const ProfileGroup = styled.div<{ selected: boolean }>`
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

	cursor: pointer;
`;

const ProfileGroupMenu = styled.div<{ open: boolean }>`
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

const StaggeredProfileGroupContainer = styled.div`
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
`;

const RightContainerTopContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;

	padding-left: 20px;
`;

const ProfileGroupName = styled.div`
	font-weight: 500;
	font-size: 30px;
	line-height: 36px;

	color: #cccccc;
`;

const StyledAddProfileIcon = styled(AddProfileIcon)`
	cursor: pointer;

	&:hover path {
		fill: white;
	}
`;

const ProfileContainer = styled.div`
	margin-top: 10px;
	width: 100%;
	height: 322px;
	margin-bottom: 10px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0;
	}

	gap: 16px;
`;

const Profile = styled.div<{ selected: boolean }>`
	width: 100%;
	height: 63px;
	min-height: 63px;

	padding-left: 30px;

	background: ${({ selected }) => (selected ? "rgba(70, 69, 69, 0.8)" : "rgba(50, 50, 50, 0.8)")};
	border: ${({ selected }) => (selected ? "1px solid white" : "none")};
	border-radius: 10px;

	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

const ProfileText = styled.div`
	font-weight: 500;
	font-size: 25px;
	line-height: 30px;

	color: #cccccc;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	padding-right: 10px;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 6px;

	&:nth-child(1) {
		width: 55px;
		min-width: 55px;
	}

	&:nth-child(2) {
		width: 228px;
		min-width: 228px;
	}

	&:nth-child(3) {
		width: 276px;
		min-width: 276px;
	}

	&:nth-child(4) {
		width: 282px;
		min-width: 282px;
	}

	&:nth-child(5) {
		width: 203px;
		min-width: 203px;
	}

	&:nth-child(6) {
		width: 40px;
		min-width: 40px;
	}
`;

const StyledCopyProfile = styled(CopyProfileIcon)`
	cursor: pointer;
`;

const InputContainer = styled.div`
	width: 100%;
	height: 452px;

	background: #353535;
	border-radius: 10px;
	padding-top: 27px;
	padding-left: 20px;
	padding-right: 20px;
`;

const InputRow = styled.div<{ marginTop?: string }>`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;

	margin-top: ${({ marginTop }) => (marginTop ? marginTop : "0")};
`;

const Divider = styled.div`
	width: 1050px;
	height: 1px;

	background: #797979;

	margin-top: 32px;
	margin-left: auto;
	margin-right: auto;
`;

const StyledVisaIcon = styled(VisaIcon)`
	position: absolute;
	right: 13px;
	top: calc(50% - 3px);
	transform: translateY(-50%);
`;

const BottomContainer = styled.div`
	margin-top: 33px;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 16px;
`;

const BottomLeftContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	gap: 16px;
`;

const CVCInput = styled.input`
	width: 105px;
	border-left: 1px solid rgba(158, 158, 158, 0.8);

	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	background: transparent;

	height: 35px;

	text-align: center;

	font-weight: 400;
	font-size: 25px;
	line-height: 30px;

	color: #cccccc;
`;

const BottomCenterContainer = styled.div`
	width: 349px;
	height: 203px;

	background: linear-gradient(101.24deg, rgba(71, 202, 251, 1) 0%, rgba(245, 1, 132, 1) 50.83%, rgba(214, 1, 239, 1) 101.66%);
	border-radius: 15px;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const InnerCreditCardContainer = styled.div`
	position: relative;

	width: 345px;
	height: 199px;

	background: rgb(0, 0, 0, 0.5);

	border-radius: 15px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;

	padding-top: 15px;
	padding-left: 15px;
	padding-bottom: 40px;
`;

const StyledCreditCardLogo = styled(CreditCardLogo)`
	position: absolute;
	right: 22px;
	top: 16px;
`;

const StaggeredCreditCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	gap: 7px;
`;

const CreditCardNumber = styled.div`
	font-weight: 500;
	font-size: 25px;
	line-height: 30px;

	color: #fffbfb;
`;

const CreditCardInfoContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	gap: 10px;

	width: 100%;
`;

const CreditCardInfo = styled.div`
	font-weight: 400;
	font-size: 20px;
	line-height: 24px;

	color: #ffffff;

	opacity: 0.7;
`;

const BottomRightContainer = styled.div`
	width: 349px;
	height: 203px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 15px;
`;

const ToggleSwitchWrapper = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0 18px 0 18px;

	font-weight: 400;
	font-size: 25px;
	line-height: 30px;

	color: #cccccc;
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

const BottomWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	margin-top: 18px;
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
