import React from "react";
import styled from "styled-components";

import { ReactComponent as CaptchaHarvesterImage } from "@/App/assets/captchaHarvesterImage.svg";

const CaptchaHarvester = () => {
	return (
		<Container>
			<Header>Captcha Harvester</Header>
			<HeaderBorderBottom />

			<StyledCaptchaHarvesterImage />
			<WaitingForCaptchaText>Waiting for Captcha...</WaitingForCaptchaText>
		</Container>
	);
};

export default CaptchaHarvester;

const Container = styled.div`
	width: 100%;
	height: 100%;

	background: #1c1c1c;
	border-radius: 10px;
	overflow: hidden;

	position: relative;
`;

const Header = styled.div`
	width: 100%;
	height: 89px;

	background: linear-gradient(99.35deg, rgba(96, 211, 255, 0.25) -2.52%, rgba(242, 40, 146, 0.25) 48.28%, rgba(218, 33, 240, 0.25) 102.37%);

	font-weight: 500;
	font-size: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fffdfd;

	-webkit-app-region: drag;
`;

const HeaderBorderBottom = styled.div`
	width: 100%;
	height: 2px;

	background: linear-gradient(99.35deg, rgba(91, 209, 254, 1) -2.52%, rgba(242, 34, 143, 1) 48.28%, rgba(218, 29, 240, 1) 102.37%);
`;

const StyledCaptchaHarvesterImage = styled(CaptchaHarvesterImage)`
	position: absolute;
	top: calc(50% + 24px);
	left: 50%;
	transform: translate(-50%, -50%);
`;

const WaitingForCaptchaText = styled.div`
	font-weight: 400;
	font-size: 20px;

	color: #d7d7d7;

	position: absolute;
	bottom: 81px;
	left: 50%;
	transform: translate(-50%);

	width: fit-content;
`;
