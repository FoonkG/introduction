import styled from "styled-components";

interface IProgressCircle {
	items: Array<{
		color: string;
		percentage: number;
	}>;
}

const ProgressCircle = ({ items }: IProgressCircle) => {
	let gradientString = "";
	let cummulativePercentage = 0;

	for (let i = 0; i < items.length; i++) {
		const element = items[i];
		gradientString += `${element.color} ${cummulativePercentage * 3.6}deg ${(cummulativePercentage + element.percentage) * 3.6}deg${
			i !== items.length - 1 ? ", " : ""
		}`;
		cummulativePercentage += element.percentage;
	}

	return (
		<ProgressCircleWrapper>
			<MiddleCircle />
			<ProgressSpinner gradientString={gradientString} />
		</ProgressCircleWrapper>
	);
};

export default ProgressCircle;

const ProgressCircleWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;

	transform: rotate(-120deg);

	margin-right: 4px;
`;

const MiddleCircle = styled.div`
	position: absolute;
	border-radius: 50%;
	height: 97px;
	width: 97px;
	background: #161a1e;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: large;
	font-weight: bold;
`;

const ProgressSpinner = styled.div<{ gradientString: string }>`
	border-radius: 50%;
	height: 131px;
	width: 131px;

	background: conic-gradient(${({ gradientString }) => gradientString});
`;

//#ae5eff 0deg 110deg, #ffa96b 110deg 230deg, #d9627f 230deg 300deg, #ee84ff 300deg 360deg
