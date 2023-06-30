import React from "react";
import styled from "styled-components";

import { ReactComponent as StartIcon } from "@/App/assets/start.svg";
import { ReactComponent as EditIcon } from "@/App/assets/edit.svg";
import { ReactComponent as CopyIcon } from "@/App/assets/copy.svg";
import { ReactComponent as DeleteIcon } from "@/App/assets/delete.svg";

interface ITask {
	id: string;
	site: string;
	product: string;
	profile: string;
	proxy: string;
	size: string;
	status: string;
	statusColor?: string;

	start: () => void;
	edit: () => void;
	copy: () => void;
	delete: () => void;
}

const Task = (props: ITask) => {
	return (
		<TaskRow>
			<TaskRowTitle>{props.id}</TaskRowTitle>
			<TaskRowTitle>{props.site}</TaskRowTitle>
			<TaskRowTitle>{props.product}</TaskRowTitle>
			<TaskRowTitle>{props.profile}</TaskRowTitle>
			<TaskRowTitle>{props.proxy}</TaskRowTitle>
			<TaskRowTitle>{props.size}</TaskRowTitle>
			<TaskRowTitle color={props.statusColor}>{props.status}</TaskRowTitle>
			<TaskRowTitle>
				<TaskActionsContainer>
					<StartIcon onClick={() => props.start()} />
					<TaskActionSeperator />
					<EditIcon onClick={() => props.edit()} />
					<TaskActionSeperator />
					<CopyIcon onClick={() => props.copy()} />
					<TaskActionSeperator />
					<DeleteIcon onClick={() => props.delete()} />
				</TaskActionsContainer>
			</TaskRowTitle>
		</TaskRow>
	);
};

export default Task;

const TaskRow = styled.div`
	width: 100%;
	height: 63px;
	background: rgba(50, 50, 50, 0.8);
	border-radius: 10px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-bottom: 16px;

	padding-right: 13px;

	& > div:nth-child(1) {
		width: 30px;
		margin-left: 23px;
	}
	& > div:nth-child(2) {
		width: 169px;
		margin-left: 32px;
	}
	& > div:nth-child(3) {
		width: 306px;
		margin-left: 29px;
	}
	& > div:nth-child(4) {
		width: 105px;
		margin-left: 58px;
	}
	& > div:nth-child(5) {
		width: 75px;
		margin-left: 74px;
	}
	& > div:nth-child(6) {
		width: 75px;
		margin-left: 77px;
	}
	& > div:nth-child(7) {
		width: 223px;
		margin-left: 59px;
	}
	& > div:nth-child(8) {
		width: 215px;
		margin-left: 54px;
	}
`;

const TaskRowTitle = styled.div<{ color?: string }>`
	font-weight: 600;
	font-size: 25px;
	color: ${({ color }) => (color ? color : "#cccccc")};

	overflow: hidden;
	white-space: nowrap;

	text-align: center;
`;

const TaskActionsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	& svg {
		cursor: pointer;
	}
`;

const TaskActionSeperator = styled.div`
	background: #424242;

	width: 1px;
	height: 35px;
`;
