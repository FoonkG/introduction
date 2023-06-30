import React, { useState } from "react";
import styled from "styled-components";

import Modal from "./components/Modal";
import CTAButton from "../components/Utils/CTAButton";

import { ReactComponent as CreateGroupIcon } from "@/App/assets/creategroup.svg";

interface IPopup {
	close: () => void;
	addProxies: (proxies: Array<string>) => void;
}

const AddProxiesPopup = ({ close, addProxies }: IPopup) => {
	const [proxies, setProxies] = useState("");

	return (
		<Modal height="541px" width="777px" title="Add Proxies" closePopup={close}>
			<TextArea
				placeholder="Enter Proxies"
				value={proxies}
				onChange={(e: any) => {
					setProxies(e.target.value);
				}}
			/>
			<CTAButton
				style={{ margin: "auto", marginTop: "21px", background: "#ac98ef" }}
				onClick={() => {
					addProxies(proxies.split("\n"));
				}}
			>
				Add Proxies <CreateGroupIcon />
			</CTAButton>
		</Modal>
	);
};

export default AddProxiesPopup;

const TextArea = styled.textarea`
	width: 100%;
	height: 388px;

	background: linear-gradient(0deg, #232326, #232326), #141421;
	border: 1px solid #2a292e;
	border-radius: 5px;

	padding-top: 13px;
	padding-inline: 24px;

	resize: none;
	outline: none;

	color: #ffffff;
`;
