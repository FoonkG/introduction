import React from "react";
import styled from "styled-components";

import { ReactComponent as CloseIcon } from "@/App/assets/close.svg";

interface PopUpNavBarInterface {
	title?: string;
	close: () => void;
}

const PopUpNavBar = ({ title, close }: PopUpNavBarInterface) => {
	return (
		<Container>
			<Title>{title}</Title>
			<StyledCloseIcon onClick={close} />
		</Container>
	);
};

export default PopUpNavBar;

const Container = styled.div`
	height: 38px;
	min-height: 38px;
	width: 100%;
	background: #232326;

	display: flex;
	align-items: center;
	justify-content: space-between;

	border-top-left-radius: 5px;
	border-top-right-radius: 5px;

	padding-left: 22px;
	padding-right: 14px;

	font-weight: 700;
	font-size: 11px;
	line-height: 13px;

	color: white;
`;

const StyledCloseIcon = styled(CloseIcon)`
	width: 20px;
	height: 20px;

	cursor: pointer;

	&:hover rect {
		fill: white;
	}
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 11px;
	line-height: 13px;
	color: #ffffff;
`;
