import styled from "styled-components";

const Alerts = () => {
    return <InnerContainer>Alerts</InnerContainer>
};

export default Alerts;

const InnerContainer = styled.div`
	width: 100%;
	height: calc(100vh - 76px);

	padding-left: 56px;
	padding-right: 56px;

	display: flex;
	align-items: center;
	justify-content: center;

	gap: 20px;

    //Remove the 2 lines below before starting development on this page
    color: white;
    font-size: 30px;
`;