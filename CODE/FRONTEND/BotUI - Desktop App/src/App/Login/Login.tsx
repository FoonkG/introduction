import React, { useEffect, useRef, useState } from "react";
import { ipcRenderer } from "electron";
import styled from "styled-components";

import DefaultProfilePicture from "@/App/assets/defaultprofilepicture.svg";

import LoginSuccessFullGif from "@/App/assets/loginsuccesfull.gif";

import { ReactComponent as LeftLoginImage } from "@/App/assets/leftloginimage.svg";
import { ReactComponent as RightLoginImage } from "@/App/assets/rightloginimage.svg";
import { ReactComponent as LoginArrow } from "@/App/assets/loginarrow.svg";

const Login = () => {
	const botImageRef = useRef<HTMLImageElement>(null);
	const [loading, setLoading] = useState(false);
	const [showGif, setShowGif] = useState(false);
	const [progress, setProgress] = useState(0);
	const [buttonText, setButtonText] = useState("Log In");

	useEffect(() => {
		if (loading) {
			setProgress(100);

			//Change the timeout below with the call to verify the key, then run keyIsValid(true)
			setTimeout(() => {
				keyIsValid(true);
			}, 4000);
		}
	}, [loading]);

	const keyIsValid = (valid: boolean) => {
		if (valid) {
			setShowGif(true);
			setButtonText("Key verified !");
			setTimeout(() => {
				setShowGif(false);
				setProgress(0);
				setLoading(false);
				setButtonText("Log In");

				ipcRenderer.send("toMain", [
					{
						command: "login",
					},
				]);
			}, 2620);
		}
	};

	return (
		<Container>
			<Background />
			<DragBar />
			<ContentContainer>
				<BotNameContainer>
					<BotImage
						ref={botImageRef}
						src=""
						onError={() => {
							if (botImageRef.current) {
								botImageRef.current.src = DefaultProfilePicture;
							}
						}}
					/>
					<BotName>BotName</BotName>
				</BotNameContainer>
				<ImageContainer>
					{!loading ? (
						<>
							<StyledLeftLoginImage />
							<StyledRightLoginImage />
						</>
					) : (
						<>
							<ProgressContainer>
								<StyledGif src={showGif ? LoginSuccessFullGif : null} display={showGif} />
								<ProgressBarContainer>
									<ProgressBar>
										<ProgressBarValue value={progress} />
									</ProgressBar>
								</ProgressBarContainer>
							</ProgressContainer>
						</>
					)}
				</ImageContainer>
				<WelcomeContainer>
					<WelcomeTitle>Welcome to BotName</WelcomeTitle>
					<WelcomeSubtitle>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus magna semper sodales aliquam morbi.
					</WelcomeSubtitle>
					<LicenseKeyInput type={"text"} placeholder="Enter License Key" />
					<LoginButton
						onClick={() => {
							setLoading(true);
						}}
					>
						{buttonText} <LoginArrow />
					</LoginButton>
				</WelcomeContainer>
			</ContentContainer>
		</Container>
	);
};

export default Login;

const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	position: relative;

	background: #0d0c10;
	border-radius: 14px;
	overflow: hidden;

	position: relative;
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;

	height: 227px;

	background: linear-gradient(180deg, rgba(136, 184, 255, 0.53) 0%, rgba(14, 14, 14, 0) 100%);
`;

const DragBar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;

	height: 20px;

	-webkit-app-region: drag;
`;

const ContentContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	position: relative;
	z-index: 1;
`;

const BotNameContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	gap: 14px;

	margin-top: 13px;
	margin-left: 18px;
`;

const BotImage = styled.img`
	width: 50px;
	height: 50px;

	background: #88b8ff;
	border-radius: 5px;
`;

const BotName = styled.div`
	font-weight: 700;
	font-size: 18px;
	line-height: 22px;

	color: #ffffff;
`;

const ImageContainer = styled.div`
	position: relative;

	margin-top: 13px;

	width: 100%;
	height: 165px;
`;

const StyledLeftLoginImage = styled(LeftLoginImage)`
	min-width: 347px;
	min-height: 165px;

	position: absolute;
	top: -40px;
	left: -182px;
`;

const StyledRightLoginImage = styled(RightLoginImage)`
	min-width: 347px;
	min-height: 165px;

	position: absolute;
	top: -40px;
	left: 87px;
`;

const WelcomeContainer = styled.div`
	width: 100%;
	height: 206px;

	padding: 0 32px 0 32px;
`;

const WelcomeTitle = styled.div`
	margin-top: 21px;

	font-weight: 700;
	font-size: 14px;
	line-height: 17px;

	color: #ffffff;
`;

const WelcomeSubtitle = styled.div`
	margin-top: 6px;

	max-width: 290px;

	font-weight: 600;
	font-size: 10px;
	line-height: 12px;

	color: #86878a;
`;

const LicenseKeyInput = styled.input`
	width: 100%;
	margin-top: 21px;

	padding: 10px 18px 10px 18px;

	background: #141414;
	border: 1px solid #222222;
	border-radius: 5px;

	font-weight: 600;
	font-size: 12px;
	line-height: 15px;

	color: white;
`;

const LoginButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-top: 11px;

	padding-left: 19px;
	padding-right: 19px;

	width: 100%;
	height: 36px;

	background: #ac98ef;
	border-radius: 5px;

	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	color: #ffffff;

	cursor: pointer;

	&:hover {
		filter: brightness(110%);
	}
`;

const ProgressContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
`;

const ProgressBarContainer = styled.div`
	width: calc(100% - 66px);
	height: 36px;

	margin-inline: auto;

	padding-left: 17px;
	padding-right: 17px;

	background: #141414;
	border: 1px solid #222222;
	border-radius: 5px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const ProgressBar = styled.div`
	width: 254px;
	height: 8px;

	background: #222222;
	border-radius: 4px;
`;

const ProgressBarValue = styled.div<{ value: number }>`
	height: 100%;
	width: ${(props) => props.value}%;

	background: #88b8ff;
	border-radius: 4px;

	transition: width ease 2s;
`;

const StyledGif = styled.img<{ display: boolean }>`
	width: 80px;
	height: 80px;

	display: ${(props) => (props.display ? "block" : "none")};

	margin-bottom: 20px;
`;
