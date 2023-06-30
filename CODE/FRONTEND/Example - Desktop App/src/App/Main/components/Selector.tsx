import React from "react";
import styled from "styled-components";

interface ISelector {
	options: any[];
	value: any;
	onChange: (value: any) => void;
}

const Selector = ({ options, value, onChange }: ISelector) => {
	return (
		<Container>
			{options.map((el, i) => {
				return (
					<ItemContainer active={value === el} onClick={() => onChange(el)}>
						{el}
					</ItemContainer>
				);
			})}
		</Container>
	);
};

export default Selector;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	background: #282828;
	border: 1px solid #797979;
	border-radius: 10px;

	height: 48px;

	padding: 1px;
`;

const ItemContainer = styled.div<{ active: boolean }>`
	height: 100%;
	padding: 0 20px 0 20px;

	border-radius: 8px;

	font-weight: 500;
	font-size: 20px;
	line-height: 24px;

	color: #ffffff;

	display: flex;
	align-items: center;
	justify-content: center;

	background: ${({ active }) => (active ? "linear-gradient(99.41deg, #4DCBFB 5.32%, #63D4FF 93.5%)" : "transparent")};
	cursor: ${({ active }) => (active ? "default" : "pointer")};
	&:hover {
		background: ${({ active }) => (active ? "linear-gradient(99.41deg, #4DCBFB 5.32%, #63D4FF 93.5%)" : "#363636")};
	}
`;
