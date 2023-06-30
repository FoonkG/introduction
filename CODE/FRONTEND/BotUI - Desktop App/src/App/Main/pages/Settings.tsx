import React, { useState } from "react";
import styled from "styled-components";
import CTAButton from "../components/Utils/CTAButton";

import { ReactComponent as PlayIcon } from "@/App/assets/play.svg";
import DropDown from "../components/Utils/DropDown";
import ToggleSwitchInput from "../components/Utils/ToggleSwitchInput";

const Settings = () => {
	const [toggleSwitchVal, setToggleSwitchVal] = useState(false);

	return (
		<Container>
			<TitleContainer>
				<StaggeredItems gap="6px">
					<Title>Settings</Title>
					<Subtitle>Manage Botname</Subtitle>
				</StaggeredItems>
				<CTAButton
					onClick={() => {
						alert("Clicked Log Out");
					}}
				>
					Log Out
				</CTAButton>
			</TitleContainer>
			<SettingsCardsContainer>
				<SettingsCard>
					<SettingsCardTopContainer>
						<SettingsCardDetails>
							<SettingsCardName>Setting Name</SettingsCardName>
							<SettingsCardLabel>Setting subtext</SettingsCardLabel>
						</SettingsCardDetails>
						<TestButton>
							<PlayIcon />
							Test
						</TestButton>
					</SettingsCardTopContainer>
					<SettingsCardBottomContainer>
						<SettingsInputField placeholder="Input Field" />
					</SettingsCardBottomContainer>
				</SettingsCard>

				<SettingsCard>
					<SettingsCardTopContainer>
						<SettingsCardDetails>
							<SettingsCardName>Setting Name</SettingsCardName>
							<SettingsCardLabel>Setting subtext</SettingsCardLabel>
						</SettingsCardDetails>
						<TestButton>
							<PlayIcon />
							Test
						</TestButton>
					</SettingsCardTopContainer>
					<SettingsCardBottomContainer>
						<DropDown
							options={[
								{ value: "Type 1", label: "Type 1" },
								{ value: "Type 2", label: "Type 2" },
							]}
							title="Select Field"
							onSelect={(val: any) => {
								if (!Array.isArray(val)) {
									//setModule(val.value);
								}
							}}
							// style?: any;
							// multiSelect?: boolean;
							// value?: OptionProps;
							// search?: boolean;
							// icon?: any;
						/>
					</SettingsCardBottomContainer>
				</SettingsCard>

				<SettingsCard>
					<SettingsCardTopContainer>
						<SettingsCardDetails>
							<SettingsCardName>Setting Name</SettingsCardName>
							<SettingsCardLabel>Setting subtext</SettingsCardLabel>
						</SettingsCardDetails>
						<TestButton>
							<PlayIcon />
							Test
						</TestButton>
					</SettingsCardTopContainer>
					<SettingsCardBottomContainer>
						<ToggleSwitchInput
							title="Toggle Field"
							onChange={(val: boolean) => {
								setToggleSwitchVal(val);
							}}
							value={toggleSwitchVal}
						/>
					</SettingsCardBottomContainer>
				</SettingsCard>

				<SettingsCard>
					<SettingsCardTopContainer>
						<SettingsCardDetails>
							<SettingsCardName>Setting Name</SettingsCardName>
							<SettingsCardLabel>Setting subtext</SettingsCardLabel>
						</SettingsCardDetails>
						<TestButton>
							<PlayIcon />
							Test
						</TestButton>
					</SettingsCardTopContainer>
					<SettingsCardBottomContainer>
						<DropDown
							options={[
								{ value: "Type 1", label: "Type 1" },
								{ value: "Type 2", label: "Type 2" },
							]}
							title="Select Field"
							onSelect={(val: any) => {
								if (!Array.isArray(val)) {
									//setModule(val.value);
								}
							}}
							// style?: any;
							// multiSelect?: boolean;
							// value?: OptionProps;
							// search?: boolean;
							// icon?: any;
						/>
					</SettingsCardBottomContainer>
				</SettingsCard>
			</SettingsCardsContainer>
		</Container>
	);
};

export default Settings;

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

const Title = styled.div`
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;

	color: #ffffff;
`;

const Subtitle = styled.div`
	font-weight: 600;
	font-size: 11px;
	line-height: 13px;

	color: #878787;
`;

const SettingsCardsContainer = styled.div`
	width: calc(100% + 15px);
	height: calc(100% - 57px);

	margin-top: 18px;

	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	align-content: flex-start;

	overflow-y: auto;

	::-webkit-scrollbar {
		display: none;
	}
`;

const SettingsCard = styled.div`
	width: 495px;
	height: 135px;

	background: #1b1b1e;
	border: 1px solid #2a292e;
	border-radius: 5px;

	margin-right: 15px;
	margin-bottom: 12px;
`;

const SettingsCardTopContainer = styled.div`
	width: calc(100% + 2px);
	height: 62px;

	transform: translateX(-1px) translateY(-1px);

	background: #232326;
	border-radius: 5px 5px 0px 0px;

	padding-left: 21px;
	padding-right: 15px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SettingsCardDetails = styled.div`
	/*staggered text*/

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
`;

const SettingsCardName = styled.div`
	font-weight: 700;
	font-size: 14px;
	color: #ffffff;

	margin-bottom: 6px;
`;

const SettingsCardLabel = styled.div`
	font-weight: 600;
	font-size: 11px;

	color: #878787;
`;

const TestButton = styled.button`
	width: 86px;
	height: 36px;

	background: #1b1b1e;
	border: 1px solid #2a292e;
	border-radius: 5px;

	font-weight: 700;
	font-size: 12px;

	color: #06d7a0;

	display: flex;
	align-items: center;
	justify-content: center;

	& svg {
		margin-right: 4.5px;
	}
`;

const SettingsCardBottomContainer = styled.div`
	width: 100%;
	height: 72px;

	padding-inline: 18px;

	display: flex;
	align-items: center;
`;

const SettingsInputField = styled.input`
	width: 100%;
`;
