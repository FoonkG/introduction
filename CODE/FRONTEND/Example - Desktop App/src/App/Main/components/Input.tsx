import React from "react";
import styled from "styled-components";

import { ReactComponent as InputIcon } from "@/App/assets/searchicon.svg";

interface IInput {
	width?: string;
	placeholder?: string;
	type: string;
	value: string;
	onChange: (e: any) => void;
}

const Input = ({ width, placeholder, type, value, onChange }: IInput) => {
	return (
		<InputWrapper width={width}>
			<StyledInputIcon />
			<InputField type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e)} />
		</InputWrapper>
	);
};

export default Input;

const InputWrapper = styled.div<{ width?: string }>`
	width: ${({ width }) => (width ? width : "100%")};

	position: relative;
`;

const StyledInputIcon = styled(InputIcon)`
	position: absolute;
	left: 15px;

	top: 50%;
	transform: translateY(-50%);
`;

const InputField = styled.input`
	width: 100%;

	outline: none;

	background: #282828;
	border: 1px solid #797979;
	border-radius: 10px;

	padding-left: 56px;
	padding-top: 12px;
	padding-bottom: 12px;
	padding-right: 12px;

	font-weight: 400;
	font-size: 18px;
	line-height: 22px;

	color: white;
`;
