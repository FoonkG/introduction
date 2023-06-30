import React from "react";
import styled from "styled-components";

interface IStatContainer {
	icon: any;
	background: string;
	border: string;
	title?: string;
	value?: string;
	gap?: string;
	label?: string;
	onClick: () => void;
}

const StatsContainerTasks = ({ icon, background, border, title, value, gap, label, onClick }: IStatContainer) => {
	return (
		<Border border={border}>
			<Container background={background} border={border}>
				<StaggeredText gap={gap}>
					<div onClick={onClick}>{icon}</div>
					<Title>{title}</Title>
				</StaggeredText>
				<Value>{value}</Value>
				<ValueLabel>{label}</ValueLabel>
			</Container>
		</Border>
	);
};

export default StatsContainerTasks;

const Border = styled.div<{ border: string }>`
	width: 275px;
	height: 90px;

	display: flex;
	align-items: center;
	justify-content: center;

	background: ${(props) => props.border};

	border-radius: 10px 0px;
`;

const Container = styled.div<{ background: string; border: string }>`
	width: 275px;
	height: 90px;

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

	& svg {
		cursor: pointer;
	}
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 22px;
	line-height: 27px;

	color: rgba(255, 255, 255, 0.8);

	margin-top: 2px;
`;

const Value = styled.div`
	position: absolute;
	top: 19px;
	right: 20px;

	text-align: right;

	font-weight: 700;
	font-size: 30px;

	color: #ffffff;
`;

const ValueLabel = styled.div`
	position: absolute;
	top: 48px;
	right: 20px;

	font-weight: 700;
	font-size: 15px;

	color: rgba(255, 255, 255, 0.8);
`;
