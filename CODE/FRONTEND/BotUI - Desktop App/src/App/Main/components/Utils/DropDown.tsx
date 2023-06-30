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
	onSelect: (values: Array<OptionProps> | OptionProps) => void;
	style?: any;
	multiSelect?: boolean;
	value?: OptionProps;
	search?: boolean;
	icon?: any;
}

const DropDown = ({ options, title, onSelect, style, multiSelect, value, search, icon: Icon }: DropDownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [selectedValues, setSelectedValues] = useState<Array<OptionProps>>(value ? [value] : []);

	useEffect(() => {
		const handleClick = (e: any) => (e.target.id !== "dropdown" ? setIsOpen(false) : null);

		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, []);

	const getSearchOrValues = () => {
		if (search && isOpen) {
			return (
				<SearchInput
					autoFocus
					placeholder={title}
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
					onClick={(e) => {
						e.stopPropagation();
					}}
				/>
			);
		} else {
			return selectedValues.length > 0 ? selectedValues.map((sv) => sv.label).join(", ") : title;
		}
	};

	return (
		<Container
			open={isOpen}
			onClick={() => {
				setIsOpen(!isOpen);
			}}
			style={style}
			id="dropdown"
		>
			{getSearchOrValues()}
			{Icon ? (
				<Icon
					onClick={(e: any) => {
						e.stopPropagation();
						setIsOpen(!isOpen);
					}}
				/>
			) : (
				<DropDownIcon
					onClick={(e) => {
						e.stopPropagation();
						setIsOpen(!isOpen);
					}}
				/>
			)}

			<DropDownContainer open={isOpen}>
				<DropDownInnerContainer applyMarginRight={options.length > 3}>
					{multiSelect && (
						<>
							<SelectAll
								onClick={(e) => {
									e.stopPropagation();

									if (selectedValues.length === options.length) {
										setSelectedValues([]);
									} else {
										setSelectedValues(options.map((option) => option));
									}
									setIsOpen(false);
								}}
							>
								Select All
							</SelectAll>
							<Divider />
						</>
					)}
					{options
						.filter((opt) => opt.label.toLowerCase().includes(searchValue.toLowerCase()))
						.map((option, index) => {
							return (
								<DropDownItem
									key={index}
									selected={selectedValues.filter((opt) => opt.value === option.value).length > 0}
									onClick={(e) => {
										e.stopPropagation();

										if (selectedValues.filter((opt) => opt.value === option.value).length > 0) {
											setSelectedValues(multiSelect ? selectedValues.filter((opt) => opt.value !== option.value) : []);
											onSelect(multiSelect ? selectedValues.filter((opt) => opt.value !== option.value) : option);
										} else {
											setSelectedValues(multiSelect ? [...selectedValues, option] : [option]);
											onSelect(multiSelect ? [...selectedValues, option] : option);
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
	font-weight: 600;
	font-size: 12px;

	color: #878787;

	width: 100%;
	height: 36px;

	background: linear-gradient(0deg, #232326, #232326), #141421;
	border: 1px solid #2a292e;
	border-radius: 5px;

	border-bottom-left-radius: ${(props) => (props.open ? "0px" : "5px")};
	border-bottom-right-radius: ${(props) => (props.open ? "0px" : "5px")};

	padding: 0 18px 0 20px;
	text-align: left;

	display: flex;
	align-items: center;
	justify-content: space-between;

	position: relative;

	cursor: pointer;
`;

const DropDownContainer = styled.div<{ open: boolean }>`
	position: absolute;

	z-index: 9;

	top: 32px;
	left: -1px;
	right: -1px;

	background: linear-gradient(0deg, #232326, #232326), #141421;
	border: 1px solid #2a292e;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;

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

const SelectAll = styled.div`
	transition: color 0.15s ease-in-out;

	&:hover {
		color: white;
	}
`;

const Divider = styled.div`
	width: 100%;
	height: 2px;

	background: #343434;
	border-radius: 5px;

	margin-top: 11px;
	margin-bottom: 13px;
`;

const DropDownItem = styled.div<{ selected: boolean }>`
	width: 100%;
	height: 15px;

	margin-bottom: 11px;

	cursor: pointer;

	transition: color 0.15s ease-in-out;

	color: ${(props) => (props.selected ? "#88b8ff" : "#86878a")};

	&:hover {
		color: white;
	}
`;

const SearchInput = styled.input`
	width: 230px;
	height: 44px;
	background: transparent;
	border: none;
	color: white;
	outline: none;
	transform: translateX(-2px);

	&,
	&::placeholder {
		font-weight: 600;
		font-size: 12px;

		color: #8b8c8d;
	}
`;
