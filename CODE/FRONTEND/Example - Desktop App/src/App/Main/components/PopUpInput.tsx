import React from "react";
import styled from "styled-components";

interface IPopUpInput {
	width?: string;
	style?: any;
	placeholder?: string;
	type: string;
	value: string;
	onChange: (e: any) => void;
	icon: any;
}

const PopUpInput = ({ width, placeholder, type, value, onChange, icon: Icon, style }: IPopUpInput) => {
	return (
		<InputWrapper width={width} style={style}>
			<Icon />
			<InputField type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e)} />
		</InputWrapper>
	);
};

export default PopUpInput;

const InputWrapper = styled.div<{ width?: string }>`
	width: ${({ width }) => (width ? width : "100%")};
	height: 57px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 0 16px 0 11px;

	background: #252525;
	border-radius: 10px;

	margin-top: 16px;
`;

const InputField = styled.input`
	width: calc(100% - 56px);

	outline: none;

	font-weight: 400;
	font-size: 25px;

	color: #cccccc;

	background: transparent;
`;
