import React, { useState } from "react";
import styled from "styled-components";

import Modal from "./components/Modal";
import CTAButton from "../components/Utils/CTAButton";
import DropDown from "../components/Utils/DropDown";
import ToggleSwitchInput from "../components/Utils/ToggleSwitchInput";

import { ReactComponent as CreateGroupIcon } from "@/App/assets/creategroup.svg";
import { ReactComponent as Arrow } from "@/App/assets/dropdownIcon.svg";

interface IPopup {
	close: () => void;
	createTasks: (tasks: any[]) => void;
}

const CreateTaskPopup = ({ close, createTasks }: IPopup) => {
	const [carouselPage, setCarouselPage] = useState(0);
	const [selectedCard, setSelectedCard] = useState("");

	const [dropDownOneValue, setDropDownOneValue] = useState("");
	const [dropDownTwoValue, setDropDownTwoValue] = useState("");

	const [inputFieldOneValue, setInputFieldOneValue] = useState("");
	const [inputFieldTwoValue, setInputFieldTwoValue] = useState("");
	const [inputFieldThreeValue, setInputFieldThreeValue] = useState("");
	const [inputFieldFourValue, setInputFieldFourValue] = useState("");

	const [checkBoxOneValue, setCheckBoxOneValue] = useState(false);
	const [checkBoxTwoValue, setCheckBoxTwoValue] = useState(false);

	const carouselItems = ["Logo 1", "Logo 2", "Logo 3", "Logo 4", "Logo 5", "Logo 6", "Logo 7", "Logo 8", "Logo 9", "Logo 10"];

	const getItems = () => {
		const items = [];

		for (let i = carouselPage * 4; i < carouselPage * 4 + 4; i++) {
			const item = carouselItems[i];

			items.push(
				<Card
					style={{ visibility: item ? "visible" : "hidden" }}
					selected={selectedCard == item}
					onClick={() => {
						setSelectedCard(item);
					}}
				>
					{item}
				</Card>
			);
		}

		return items;
	};

	return (
		<Modal height="418px" width="777px" title="Create Tasks" closePopup={close}>
			<LogosCarouselContainer>
				<LeftArrow
					onClick={() => {
						if (carouselPage > 0) {
							setCarouselPage(carouselPage - 1);
						}
					}}
				>
					<Arrow />
				</LeftArrow>
				<RightArrow
					onClick={() => {
						if (carouselPage < parseInt(carouselItems.length / 4 + "")) {
							setCarouselPage(carouselPage + 1);
						}
					}}
				/>

				{getItems()}
			</LogosCarouselContainer>
			<InputsContainer>
				<DropDown
					options={[
						{ value: "Type 1", label: "Type 1" },
						{ value: "Type 2", label: "Type 2" },
					]}
					title="Select Field"
					onSelect={(val: any) => {
						if (!Array.isArray(val)) {
							setDropDownOneValue(val.value);
						}
					}}
					// style?: any;
					// multiSelect?: boolean;
					// value?: OptionProps;
					// search?: boolean;
					// icon?: any;
				/>
				<DropDown
					options={[
						{ value: "Type 1", label: "Type 1" },
						{ value: "Type 2", label: "Type 2" },
					]}
					title="Select Field"
					onSelect={(val: any) => {
						if (!Array.isArray(val)) {
							setDropDownTwoValue(val.value);
						}
					}}
					// style?: any;
					// multiSelect?: boolean;
					// value?: OptionProps;
					// search?: boolean;
					// icon?: any;
				/>
			</InputsContainer>
			<InputsContainer>
				<input
					type="text"
					placeholder="Input Field"
					value={inputFieldOneValue}
					onChange={(e) => {
						setInputFieldOneValue(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Input Field"
					value={inputFieldTwoValue}
					onChange={(e) => {
						setInputFieldTwoValue(e.target.value);
					}}
				/>
			</InputsContainer>
			<InputsContainer>
				<input
					type="text"
					placeholder="Input Field"
					value={inputFieldThreeValue}
					onChange={(e) => {
						setInputFieldThreeValue(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Input Field"
					value={inputFieldFourValue}
					onChange={(e) => {
						setInputFieldFourValue(e.target.value);
					}}
				/>
			</InputsContainer>
			<InputsContainer>
				<ToggleSwitchInput
					title="Checkbox Name"
					onChange={(val: boolean) => {
						setCheckBoxOneValue(val);
					}}
					value={checkBoxOneValue}
				/>
				<ToggleSwitchInput
					title="Checkbox Name"
					onChange={(val: boolean) => {
						setCheckBoxTwoValue(val);
					}}
					value={checkBoxTwoValue}
				/>
			</InputsContainer>
			<CTAButton
				style={{ background: "#AC98EF", margin: "auto", marginTop: "24px" }}
				onClick={() => {
					createTasks([]);
				}}
			>
				Create Tasks <CreateGroupIcon />
			</CTAButton>
		</Modal>
	);
};

export default CreateTaskPopup;

const LogosCarouselContainer = styled.div`
	width: calc(100% + 9px);
	transform: translateX(-4.5px);
	height: 89px;
	overflow: hidden;
	scroll-behavior: smooth;
	display: flex;
	justify-content: space-between;

	position: relative;
`;

const LeftArrow = styled(Arrow)`
	position: absolute;
	top: 50%;
	left: 21.5px;
	transform: translateY(-50%) rotate(90deg);

	cursor: pointer;
`;

const RightArrow = styled(Arrow)`
	position: absolute;
	top: 50%;
	right: 21.5px;
	transform: translateY(-50%) rotate(-90deg);

	cursor: pointer;
`;

const Card = styled.div<{ selected?: boolean }>`
	width: 176px;
	height: 89px;

	background: ${({ selected }) =>
		selected
			? "linear-gradient(0deg, #88b8ff, #88b8ff), linear-gradient(0deg, #232326, #232326), #141421"
			: "linear-gradient(0deg, #232326, #232326), #141421"};
	border: 1px solid #2a292e;
	border-radius: 5px;

	margin-inline: 4.5px;

	cursor: pointer;

	display: flex;
	align-items: center;
	justify-content: center;

	font-weight: 600;
	font-size: 12px;

	color: ${({ selected }) => (selected ? "#ffffff" : "#878787")};
`;

const InputsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 9px;
	width: 100%;
	height: 36px;

	margin-top: 10px;

	& > * {
		width: 100%;
	}
`;
