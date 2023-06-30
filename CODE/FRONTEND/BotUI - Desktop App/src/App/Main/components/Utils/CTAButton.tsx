import React from "react";
import styled from "styled-components";

interface ICTAButton {
	children?: any;
	background?: string;
	onClick?: () => void;
	style?: any;
}

const CTAButton = ({ children, background, onClick, style }: ICTAButton) => {
	return (
		<Container onClick={onClick} background={background} style={style}>
			{children}
		</Container>
	);
};

export default CTAButton;

const Container = styled.button<{ background?: string }>`
	width: 155px;
	height: 36px;

	background: ${(props) => (props.background ? props.background : "#88b8ff")};
	border-radius: 5px;

	display: flex;
	align-items: center;
	justify-content: center;

	gap: 14px;

	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	color: #ffffff;

	&:hover {
		filter: brightness(110%);
	}
`;
