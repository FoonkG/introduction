import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as CheckForUpdatesIcon } from "@/App/assets/checkforupdates.svg";
import { ReactComponent as UpToDateIcon } from "@/App/assets/uptodate.svg";

import { ReactComponent as ViewLicenseKeyIcon } from "@/App/assets/viewlicensekey.svg";

import { ReactComponent as DashboardIcon } from "@/App/assets/dashboardicon.svg";

import Store from "electron-store";
const store = new Store();

const Settings = () => {
	const [lastEdit, setLastEdit] = useState<any>(null);

	const [cartedWebhook, setCartedWebhook] = useState<string>(store.has("cartedwebhook") ? (store.get("cartedwebhook") as string) : "");
	const [successWebhook, setSuccessWebhook] = useState<string>(store.has("successwebhook") ? (store.get("successwebhook") as string) : "");

	const [uptodate, setuptodate] = useState(false);

	const [licensekey, setLicenseKey] = useState("XXXX-XXXX-XXXX-XXXX-XXXX");
	const [showLicenseKey, setShowLicenseKey] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			store.set("cartedwebhook", cartedWebhook);
			store.set("successwebhook", successWebhook);

			clearInterval(interval);
		}, 1500);

		if (lastEdit == null) clearInterval(interval);

		return () => {
			clearInterval(interval);
		};
	}, [lastEdit]);

	return (
		<Container>
			<LeftContainer>
				<UpdateContainer>
					<UpdateTitle>
						Update 1.9.0.6{" "}
						<UpdateButton green={uptodate} onClick={() => setuptodate(!uptodate)}>
							{!uptodate ? <CheckForUpdatesIcon /> : <UpToDateIcon />}
							{!uptodate ? "Check For Updates" : "Up to date!"}
						</UpdateButton>
					</UpdateTitle>
					<Updates>
						<Update>- Update 1</Update>
						<Update>- Update 1</Update>
						<Update>- Update 1</Update>
						<Update>- Update 1</Update>
					</Updates>
				</UpdateContainer>
				<WebhookContainer>
					<WebhookTitle>Discord Webhooks</WebhookTitle>
					<WebhookWrapper>
						Carted:{" "}
						<WebhookInput
							value={cartedWebhook}
							onChange={(e) => {
								setLastEdit(Date.now());
								setCartedWebhook(e.target.value);
							}}
							placeholder="Carted Discord Webhook Link"
						/>
					</WebhookWrapper>
					<WebhookWrapper>
						Success:{" "}
						<WebhookInput
							value={successWebhook}
							onChange={(e) => {
								setLastEdit(Date.now());
								setSuccessWebhook(e.target.value);
							}}
							placeholder="Success Discord Webhook Link"
						/>
					</WebhookWrapper>
				</WebhookContainer>
			</LeftContainer>
			<RightContainer>
				<InfoContainer>
					<UserInfo>
						<UserIconWrapper>
							<UserIcon src="https://www.theglobeandmail.com/resizer/WYZ9jTTzyibaj-B21h6kBR8XTYU=/arc-anglerfish-tgam-prod-tgam/public/LPRKN6TBMVBKHK6436GISIQH6A.jpeg" />
							<UserStatus />
						</UserIconWrapper>
						<UserName>GGG#0405</UserName>
					</UserInfo>
					<InfoDivider />
					<RenewalWrapper>
						<RenewalInnerContainer>
							<RenewalDaysRemainingWrapper>
								<RenewalDaysRemainingInnerContainer>
									<RenewalDaysRemainingValue>14</RenewalDaysRemainingValue>
									<RenewalDaysRemainingSubtitle>Days</RenewalDaysRemainingSubtitle>
								</RenewalDaysRemainingInnerContainer>
							</RenewalDaysRemainingWrapper>
							<RenewalRightContainer>
								<StaggeredRenewal>
									<RenewalTitle>Plan</RenewalTitle>
									<RenewalValue>Renewal - €20/m</RenewalValue>
								</StaggeredRenewal>
								<StaggeredRenewal>
									<RenewalTitle>Next Renewal</RenewalTitle>
									<RenewalValue>August 3rd, 2022</RenewalValue>
								</StaggeredRenewal>
							</RenewalRightContainer>
						</RenewalInnerContainer>
					</RenewalWrapper>
					<InfoDivider />
					<LicenseKeyContainer>
						<LicenseKeyText>{showLicenseKey ? licensekey : "••••••-••••••-••••••-••••••"}</LicenseKeyText>
						<StyledViewLicenseKeyIcon
							onClick={() => {
								setShowLicenseKey(!showLicenseKey);
							}}
						/>
					</LicenseKeyContainer>
					<DashboardButton
						onClick={() => {
							alert("Showing dashboard");
						}}
					>
						<DashboardIcon />
						Dashboard
					</DashboardButton>
				</InfoContainer>
			</RightContainer>
		</Container>
	);
};

export default Settings;

const Container = styled.div`
	width: 100%;
	height: 100%;

	color: white;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 28px;

	padding-top: 44px;
`;

const LeftContainer = styled.div`
	width: 1144px;
	height: 100%;

	padding-left: 29px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	gap: 28px;
`;

const UpdateContainer = styled.div`
	width: 1115px;
	height: 350px;

	background: rgba(50, 50, 50, 0.8);
	border-radius: 10px;

	padding-left: 26px;
	padding-right: 26px;
`;

const UpdateTitle = styled.div`
	font-weight: 500;
	font-size: 30px;
	line-height: 36px;

	color: #cccccc;

	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-top: 27px;
`;

const UpdateButton = styled.div<{ green: boolean }>`
	width: 276px;
	height: 40px;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 20px;
	padding-left: 16px;

	font-weight: 500;
	font-size: 22px;
	line-height: 27px;

	color: ${({ green }) => (green ? "#24FF00" : "#cccccc")};

	background: #4f4f4f;
	border-radius: 5px;

	&:hover {
		filter: brightness(115%);
	}

	cursor: pointer;
`;

const Updates = styled.div`
	width: 100%;
	height: 240px;

	margin-top: 13px;

	overflow-y: auto;
`;

const Update = styled.div`
	font-weight: 500;
	font-size: 25px;
	line-height: 30px;

	color: #797979;
`;

const WebhookContainer = styled.div`
	width: 1115px;
	height: 283px;

	padding-left: 27px;
	padding-top: 27px;

	background: rgba(50, 50, 50, 0.8);
	border-radius: 10px;
`;

const WebhookTitle = styled.div`
	font-weight: 500;
	font-size: 30px;
	line-height: 36px;

	color: #cccccc;
`;

const WebhookWrapper = styled.div`
	width: 1059px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	font-weight: 500;
	font-size: 30px;
	line-height: 36px;

	margin-top: 28px;

	color: #797979;
`;

const WebhookInput = styled.input`
	width: 909px;
	height: 67px;

	display: flex;
	align-items: center;

	padding-left: 16px;
	padding-right: 16px;

	font-weight: 500;
	font-size: 20px;
	line-height: 24px;

	color: white;

	background: #353535;
	border-radius: 10px;
`;

const RightContainer = styled.div`
	width: 500px;
	height: 100%;
`;

const InfoContainer = styled.div`
	width: 455px;
	height: 521px;

	background: rgba(50, 50, 50, 0.8);
	border-radius: 10px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	padding-top: 28px;
	padding-left: 28px;
	padding-right: 28px;
`;

const UserInfo = styled.div`
	width: 100%;

	display: flex;
	align-items: center;

	gap: 24px;
`;

const UserName = styled.div`
	font-weight: 500;
	font-size: 30px;
	line-height: 36px;

	color: #cccccc;
`;

const UserIconWrapper = styled.div`
	position: relative;
`;

const UserIcon = styled.img`
	width: 106px;
	height: 106px;

	object-fit: cover;

	border-radius: 50%;
`;

const UserStatus = styled.div`
	width: 31.8px;
	height: 31.8px;
	position: absolute;
	right: 5px;
	bottom: 5px;

	border-radius: 50%;

	background: #5ba364;
	border: 4px solid #282828;
`;

const RenewalWrapper = styled.div`
	width: 400px;
	height: 170px;

	background: linear-gradient(99.03deg, #5bd1fe -2.51%, #f2228f 51.19%, #da1df0 106.03%);
	border-radius: 5px;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const RenewalInnerContainer = styled.div`
	width: 394px;
	height: 164px;

	background: rgba(0, 0, 0, 0.6);

	display: flex;
	align-items: center;
	justify-content: center;

	gap: 30px;
`;

const RenewalDaysRemainingWrapper = styled.div`
	width: 88px;
	height: 88px;

	border-radius: 50%;

	display: flex;
	align-items: center;
	justify-content: center;

	background: linear-gradient(99.03deg, #5bd1fe -2.51%, #f2228f 51.19%, #da1df0 106.03%);
`;

const RenewalDaysRemainingInnerContainer = styled.div`
	width: 82px;
	height: 82px;

	border-radius: 50%;

	background: #6e6475;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const RenewalDaysRemainingValue = styled.div`
	font-weight: 500;
	font-size: 25px;
	line-height: 30px;

	color: #fffcfc;
`;

const RenewalDaysRemainingSubtitle = styled.div`
	font-weight: 500;
	font-size: 10px;
	line-height: 12px;

	color: #fffcfc;
`;

const RenewalRightContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	gap: 20px;
`;

const StaggeredRenewal = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

const RenewalTitle = styled.div`
	font-weight: 500;
	font-size: 15px;
	line-height: 18px;

	color: #cccccc;
`;

const RenewalValue = styled.div`
	font-weight: 500;
	font-size: 25px;
	line-height: 30px;

	color: #fffcfc;
`;

const InfoDivider = styled.div`
	margin-top: 25px;
	margin-bottom: 25px;

	margin-left: auto;
	margin-right: auto;

	width: 350px;
	height: 1px;

	background: #797979;
`;

const LicenseKeyContainer = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	gap: 8px;
`;

const LicenseKeyText = styled.div`
	font-weight: 500;
	font-size: 23px;
	line-height: 28px;

	width: 325px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	color: #797979;
`;

const StyledViewLicenseKeyIcon = styled(ViewLicenseKeyIcon)`
	cursor: pointer;
	&:hover {
		filter: brightness(115%);
	}
`;

const DashboardButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 400px;
	height: 40px;

	margin-top: 20px;

	background: #4f4f4f;
	border-radius: 5px;

	gap: 8px;

	font-weight: 500;
	font-size: 22px;
	line-height: 27px;

	color: #cccccc;
`;
