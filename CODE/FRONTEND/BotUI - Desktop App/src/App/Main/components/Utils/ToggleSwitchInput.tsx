import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Props {
	title: string;
	style?: any;

	value: boolean;
	onChange: (val: boolean) => void;
}

const ToggleSwitchInput = ({ title, style, value, onChange }: Props) => {
	return (
		<Container style={style}>
			{title}
			<ToggleSwitchContainer
				open={value}
				onClick={() => {
					onChange(!value);
				}}
			>
				<ToggleSwitchDot open={value} />
			</ToggleSwitchContainer>
		</Container>
	);
};

export default ToggleSwitchInput;

const Container = styled.div`
	width: 100%;
	height: 36px;

	background: linear-gradient(0deg, #232326, #232326), #141421;
	border: 1px solid #2a292e;
	border-radius: 5px;

	font-weight: 600;
	font-size: 12px;

	color: #878787;

	padding-left: 24px;
	padding-right: 10px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ToggleSwitchContainer = styled.div<{ open: boolean }>`
	width: 44px;
	height: 20px;

	background: ${({ open }) => (open ? "rgb(47, 176, 153, 0.4)" : "#2a292e")};
	border: 1px solid #39393b;
	border-radius: 19px;

	padding-inline: 2px;

	display: flex;
	align-items: center;

	cursor: pointer;
`;

const ToggleSwitchDot = styled.div<{ open: boolean }>`
	width: 14px;
	height: 14px;

	background: #06d7a0;
	border-radius: 50%;

	transform: translateX(${(props) => (props.open ? "24px" : "0px")});

	transistion: transform 0.2s ease-in-out;
`;
