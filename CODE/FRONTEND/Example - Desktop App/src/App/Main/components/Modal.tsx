import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

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
	width: string;
	height?: string;
	closePopup: any;
	title: string;
}

const Modal = ({ children, width, height, closePopup, title }: ModalProps): JSX.Element => {
	return (
		<Container animate="visible" initial="hidden" exit="exit" variants={ModalBackgroundVariants} onClick={closePopup}>
			<ModalOverlay
				width={width}
				height={height}
				animate="visible"
				initial="hidden"
				exit="exit"
				variants={ModalOverlayVariants}
				onClick={(e) => e.stopPropagation()}
			>
				<Title>{title}</Title>
				{children}
			</ModalOverlay>
		</Container>
	);
};

const Container = styled(motion.div)`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	z-index: 999;

	background: rgba(28, 28, 28, 0.4);

	-webkit-app-region: no-drag;

	border-radius: 10px;
`;

const ModalOverlay = styled(motion.div)<{ width: string; height?: string }>`
	border-radius: 10px;

	width: ${({ width }) => width};
	height: ${({ height }) => (height ? height : "auto")};

	background: #363636;

	border: 1px solid #222222;

	position: relative;

	padding: 14px 21px 23px 29px;
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 30px;
	color: #cccccc;
`;

export default Modal;
