import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import PopUpHeader from "./PopUpHeader";

const ModalBackgroundVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.1,
		},
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.2,
		},
	},
};

const ModalOverlayVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.1,
		},
		transform: "scale(0.5)",
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
		},
		transform: "scale(1)",
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.2,
		},
		transform: "scale(0)",
	},
};

interface ModalProps {
	children: any;
	title: string;
	width: string;
	height?: string;
	closePopup: any;
}

const Modal = ({ children, title, width, height, closePopup }: ModalProps): JSX.Element => {
	useEffect(() => {
		const handleClick = (e: any) => {
			if (e.target.id === "modal-container") closePopup();
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [closePopup]);

	return (
		<Container animate="visible" initial="hidden" exit="exit" variants={ModalBackgroundVariants} id="modal-container">
			<ModalOverlay width={width} height={height} animate="visible" initial="hidden" exit="exit" variants={ModalOverlayVariants}>
				<PopUpHeader title={title} close={closePopup} />
				<InnerContainer>{children}</InnerContainer>
			</ModalOverlay>
		</Container>
	);
};

const Container = styled(motion.div)`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
	background: rgba(14, 14, 14, 0.8);
`;

const ModalOverlay = styled(motion.div)<{ width: string; height?: string }>`
	width: ${({ width }) => width};
	height: ${({ height }) => (height ? height : "auto")};
	background: #1b1b1e;
	border-radius: 7px;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

const InnerContainer = styled.div`
	width: 100%;
	margin-top: 21px;
	padding-inline: 23px;
`;

export default Modal;
