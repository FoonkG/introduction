import React, { useState } from "react";
import styled from "styled-components";

import Modal from "./components/Modal";
import CTAButton from "../components/Utils/CTAButton";

import { ReactComponent as CreateGroupIcon } from "@/App/assets/creategroup.svg";

interface IPopup {
	close: () => void;
	createWallet: (name: string) => void;
}

const CreateWalletPopup = ({ close, createWallet }: IPopup) => {
	const [walletName, setWalletName] = useState("");

	return (
		<Modal height="184px" width="405px" title="Create Wallet" closePopup={close}>
			<Container>
				<Input
					placeholder="Enter Wallet Name"
					value={walletName}
					onChange={(e) => {
						setWalletName(e.target.value);
					}}
				/>
				<CTAButton
					style={{ margin: "auto" }}
					onClick={() => {
						createWallet(walletName);
					}}
				>
					Create Wallet <CreateGroupIcon />
				</CTAButton>
			</Container>
		</Modal>
	);
};

export default CreateWalletPopup;

const Container = styled.div`
	text-align: center;
`;

const Input = styled.input`
	margin-bottom: 21px;
	width: 100%;

	color: white;
`;
