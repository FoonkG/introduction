import React, { useState } from "react";
import styled from "styled-components";

import Modal from "./components/Modal";
import CTAButton from "../components/Utils/CTAButton";

import { ReactComponent as CreateGroupIcon } from "@/App/assets/creategroup.svg";

interface IPopup {
	close: () => void;
	createGroup: (name: string) => void;
}

const CreateGroupPopup = ({ close, createGroup }: IPopup) => {
	const [groupName, setGroupName] = useState("");

	return (
		<Modal height="184px" width="405px" title="Create Group" closePopup={close}>
			<Container>
				<Input
					placeholder="Enter Group Name"
					value={groupName}
					onChange={(e) => {
						setGroupName(e.target.value);
					}}
				/>
				<CTAButton
					style={{ margin: "auto" }}
					onClick={() => {
						createGroup(groupName);
					}}
				>
					Create Group <CreateGroupIcon />
				</CTAButton>
			</Container>
		</Modal>
	);
};

export default CreateGroupPopup;

const Container = styled.div`
	text-align: center;
`;

const Input = styled.input`
	margin-bottom: 21px;
	width: 100%;

	color: white;
`;
