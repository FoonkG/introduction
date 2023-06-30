import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as DropDownIcon } from "@/App/assets/dropdownIcon.svg";

export interface OptionProps {
	label: string;
	value: string;
}

interface DropDownProps {
	options: Array<OptionProps>;
	title: string;
	onSelect: (values: OptionProps) => void;
	style?: any;
	value?: OptionProps;
	icon: any;
	disabled?: boolean;
}

const DropDown = ({ options, title, onSelect, style, value, icon: Icon, disabled }: DropDownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValues, setSelectedValues] = useState<Array<OptionProps>>(value ? [value] : []);

	useEffect(() => {
		const handleClick = (e: any) => (e.target.id !== "dropdown" ? setIsOpen(false) : null);

		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, []);

	return (
		<Container
			open={isOpen}
			onClick={() => {
				if (!disabled) setIsOpen(!isOpen);
			}}
			style={style}
			id="dropdown"
		>
			<Icon />
			<SelectedText>{selectedValues.length > 0 ? selectedValues.map((sv) => sv.label).join(", ") : title}</SelectedText>
			<DropDownIcon
				onClick={(e) => {
					e.stopPropagation();
					if (!disabled) setIsOpen(!isOpen);
				}}
			/>
			<DropDownContainer open={isOpen}>
				<DropDownInnerContainer applyMarginRight={options.length > 3}>
					{options.map((option, index) => {
						return (
							<DropDownItem
								key={index}
								selected={selectedValues.filter((opt) => opt.value === option.value).length > 0}
								onClick={(e) => {
									e.stopPropagation();

									if (selectedValues.filter((opt) => opt.value === option.value).length > 0) {
										setSelectedValues([]);
										onSelect(option);
									} else {
										setSelectedValues([option]);
										onSelect(option);
									}
									setIsOpen(false);
								}}
							>
								{option.label}
							</DropDownItem>
						);
					})}
				</DropDownInnerContainer>
			</DropDownContainer>
		</Container>
	);
};

export default DropDown;

const Container = styled.div<{ open: boolean }>`
	width: 100%;
	height: 57px;

	background: #252525;
	border-radius: 10px;

	border-bottom-left-radius: ${(props) => (props.open ? "0px" : "10px")};
	border-bottom-right-radius: ${(props) => (props.open ? "0px" : "10px")};

	padding: 0 19px 0 13px;
	text-align: left;

	display: flex;
	align-items: center;
	justify-content: space-between;

	position: relative;

	cursor: pointer;

	margin-top: 30px;
`;

const DropDownContainer = styled.div<{ open: boolean }>`
	position: absolute;

	z-index: 9;

	top: 53px;
	left: 0px;
	right: 0px;

	background: #252525;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;

	padding: 11px 20px;
	padding-bottom: 0;

	height: auto;

	display: ${({ open }) => (open ? "block" : "none")};

	overflow: hidden;

	box-sizing: border-box;

	font-weight: 700;
	font-size: 12px;

	color: #86878a;
`;

const DropDownInnerContainer = styled.div<{ applyMarginRight: boolean }>`
	width: 100%;
	max-height: 220px;

	overflow-y: auto;

	& > div {
		width: ${({ applyMarginRight }) => (applyMarginRight ? "calc(100% - 10px)" : "100%")};
	}
`;

const DropDownItem = styled.div<{ selected: boolean }>`
	width: 100%;
	height: 15px;

	margin-bottom: 11px;

	cursor: pointer;

	transition: color 0.15s ease-in-out;

	color: ${(props) => (props.selected ? "#5898D8" : "#86878a")};

	&:hover {
		color: white;
	}
`;

const SelectedText = styled.div`
	font-weight: 400;
	font-size: 25px;

	color: #cccccc;

	width: calc(100% - 70px);

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
