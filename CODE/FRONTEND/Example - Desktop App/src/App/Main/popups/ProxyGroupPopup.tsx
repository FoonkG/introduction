import React, { useState } from "react";
import styled from "styled-components";
import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";

const store = new Store();

import Modal from "@/App/Main/components/Modal";

interface PopUpInterface {
	close: () => void;
	setName: (name: string) => void;
}

const CreateTask = ({ close, setName }: PopUpInterface) => {
	const [value, setValue] = useState("");
	return (
		<Modal width="575px" height="170px" closePopup={close} title="Create a proxy group">
			<>
				<Input placeholder="Name of the group" value={value} onChange={(e) => setValue(e.target.value)} />
				<ButtonContainer>
					<Button onClick={() => close()}>Cancel</Button>
					<Button onClick={() => setName(value)}>Save</Button>
				</ButtonContainer>
			</>
		</Modal>
	);
};

export default CreateTask;

const Input = styled.input`
	width: 100%;
	height: 30px;

	border-radius: 5px;
	padding-left: 10px;
	background: #1c1c1c;

	color: white;

	margin-top: 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	filter: brightness(85%);

	font-size: 15px;
	margin-top: 30px;

	gap: 8px;
`;

const Button = styled.button`
	background: transparent;
	color: white;
`;
