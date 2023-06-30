import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "@/App/assets/search.svg";

interface Props {
	style?: any;

	placeholder: string;
	value: string;
	onChange: (val: string) => void;
}

const SearchBar = ({ style, value, onChange, placeholder }: Props) => {
	return (
		<Container style={style}>
			<SearchIcon />
			<Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
		</Container>
	);
};

export default SearchBar;

const Container = styled.div`
	width: 100%;
	height: 36px;

	background: linear-gradient(0deg, #232326, #232326), #141421;
	border: 1px solid #2a292e;
	border-radius: 5px;

	padding-inline: 16px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-right: 9px;
`;

const Input = styled.input`
	font-weight: 600;
	font-size: 12px;

	color: white;

	width: calc(100% - 30px);

	padding: 0;

	border: none;

	height: 15px;
`;
