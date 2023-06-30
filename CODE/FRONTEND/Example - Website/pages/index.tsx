import styled from "styled-components";
import { ReactComponent as Logo } from "public/assets/logo.svg";
import { ReactComponent as Alert } from "public/assets/alert.svg";

import { useRouter } from "next/router";

const HomePage = () => {
	const router = useRouter();

	const handleClick = (e: any) => {
		e.preventDefault();
		router.push("/nfttool");
	};

	return (
		<Container>
			<InnerContainer>
				<LeftContainer>
					<TitleContainer>
						<Alert />
						<Title>Oops!</Title>
					</TitleContainer>
					<Subtitle className="subtitle">Under Construction</Subtitle>
					<NotSupported>Mobile is not supported for now</NotSupported>
					<ComingSoonContainer>Coming Soon</ComingSoonContainer>
					<Paragraph>
						Our website is under construction, but you might want to use our{" "}
						<Link onClick={handleClick} className="link">
							NFT tool
						</Link>{" "}
						in the meantime
					</Paragraph>
				</LeftContainer>
				<StyledLogo />
			</InnerContainer>
		</Container>
	);
};

export default HomePage;

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	overflow: hidden;
	overflow-y: auto;

	display: flex;
	justify-content: center;
`;

const InnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	gap: 60px;

	height: 100%;
	width: 100%;
	max-width: 1000px;

	padding: 40px;

	@media (max-width: 600px) {
		flex-direction: column-reverse;
		align-items: center;
		justify-content: center;

		gap: 0;

		& svg {
			margin-left: auto;
			margin-right: auto;
			margin-top: 18px;
		}
	}
`;

const LeftContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	@media (max-width: 600px) {
		align-items: center;
		justify-content: center;
	}
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 40px;
	line-height: 49px;

	margin-top: 20px;

	color: #ffffff;
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	@media (max-width: 600px) {
		flex-direction: column-reverse;
	}

	& svg {
		width: 48px;
		height: auto;
	}
`;

const Subtitle = styled.div`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;

	margin-top: 14px;

	color: #ffffff;

	@media (max-width: 600px) {
		display: none;
	}
`;

const ComingSoonContainer = styled.div`
	padding: 5px 18px 5px 18px;

	background: rgba(240, 77, 61, 0.1);
	border-radius: 3px;

	font-weight: 700;
	font-size: 12px;
	line-height: 15px;

	color: #b8522d;

	margin-top: 25px;
`;

const Paragraph = styled.div`
	max-width: 418px;

	font-weight: 600;
	font-size: 14px;
	line-height: 17px;

	margin-top: 27px;

	color: #8b8c8d;

	@media (max-width: 600px) {
		display: none;
	}
`;

const NotSupported = styled.div`
	display: none;

	font-weight: 700;
	font-size: 12px;
	line-height: 20px;

	text-align: center;

	color: #ffffff;

	margin-top: 18px;

	@media (max-width: 600px) {
		display: flex;
	}
`;

const Link = styled.a`
	display: inline;
	color: rgba(184, 82, 45, 1);

	text-decoration: underline;

	cursor: pointer;
`;

const StyledLogo = styled(Logo)`
	width: 252.38px;
	height: 237.59px;
	min-width: 252.38px;
	min-height: 237.59px;

	@media (max-width: 600px) {
		width: 126.19px;
		height: 118.8px;
		min-width: 126.19px;
		min-height: 118.8px;
	}
`;
