import React from "react";
import styled from "styled-components";

interface IStatContainer {
	icon: any;
	background: string;
	border: string;
	title?: string;
	value?: string;
	gap?: string;
}

const StatContainer = ({ icon, background, border, title, value, gap }: IStatContainer) => {
	return (
		<Border border={border}>
			<Container background={background} border={border}>
				<StaggeredText gap={gap}>
					{icon}
					<Title>{title}</Title>
				</StaggeredText>
				<Value>{value}</Value>
			</Container>
		</Border>
	);
};

export default StatContainer;

const Border = styled.div<{ border: string }>`
	width: 279px;
	height: 113px;

	display: flex;
	align-items: center;
	justify-content: center;

	background: ${(props) => props.border};

	border-radius: 10px 0px;
`;

const Container = styled.div<{ background: string; border: string }>`
	width: 275px;
	height: 109px;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	padding-left: 20px;

	background: ${(props) => props.background};
	border: ${(props) => props.border};

	border-radius: 10px 0px;

	position: relative;
`;

const StaggeredText = styled.div<{ gap?: string }>`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	gap: ${(props) => (props.gap ? props.gap : "4px")};
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 22px;
	line-height: 27px;

	color: rgba(255, 255, 255, 0.8);
`;

const Value = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;

	opacity: 0.8;

	text-align: right;

	font-weight: 700;
	font-size: 30px;
	line-height: 36px;

	color: #ffffff;
`;
