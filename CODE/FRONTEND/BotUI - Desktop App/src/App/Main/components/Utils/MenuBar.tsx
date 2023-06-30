import React from "react";
import { ipcRenderer } from "electron";
import styled from "styled-components";

const MenuBar = () => {
	return (
		<Container>
			<Button
				color="#FE6054"
				onClick={() => {
					ipcRenderer.send("toMain", [
						{
							command: "close",
						},
					]);
				}}
			/>
			<Button
				color="#FFBE02"
				onClick={() => {
					ipcRenderer.send("toMain", [
						{
							command: "minimize",
						},
					]);
				}}
			/>
			<Button
				color="#12CD38"
				onClick={() => {
					ipcRenderer.send("toMain", [
						{
							command: "maximize",
						},
					]);
				}}
			/>
		</Container>
	);
};

export default MenuBar;

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;

	height: 36px;

	display: flex;

	-webkit-app-region: drag;
`;

const Button = styled.div<{ color: string }>`
	margin-top: 14px;
	background: ${(props) => props.color};
	width: 12px;
	height: 12px;

	border-radius: 50%;

	cursor: pointer;

	margin-left: 20px;

	&:not(:first-child) {
		margin-left: 6px;
	}

	&:hover {
		filter: brightness(115%);
	}

	-webkit-app-region: no-drag;
`;
