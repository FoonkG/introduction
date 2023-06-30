import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from "@/GlobalStyle";

import Login from "./Login/Login";
import Main from "./Main/Main";

const App = () => {
	return (
		<HashRouter>
			<Container>
				<GlobalStyle />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Main />} />
				</Routes>
			</Container>
		</HashRouter>
	);
};

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	margin: 0;
	padding: 0;
`;

export default App;
