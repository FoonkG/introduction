import React, { useState } from "react";
import styled from "styled-components";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataset } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import { Chart } from "react-chartjs-2";

interface IChartProps {
	data: any;
}

const ChartComponent = ({ data }: IChartProps) => {
	const [chartData, setChartData] = useState(data);

	return (
		<Container>
			<Chart
				type="line"
				width={500}
				height={100}
				data={chartData}
				options={{
					elements: {
						line: {
							borderWidth: 3,
							tension: 0.5,
							borderColor: "rgba(80, 204, 251, 1)",
							fill: "bottom",
						},
					},
					plugins: {
						legend: {
							display: false,
						},
					},
					scales: {
						y: {
							suggestedMin: 0,
							suggestedMax: 20,
							ticks: {
								stepSize: 5,
							},
							grid: {
								color: "rgba(47, 47, 47, 0.5)",
								drawBorder: false,
							},
						},
						x: {
							grid: {
								display: false,
							},
						},
					},
				}}
			/>
		</Container>
	);
};

export default ChartComponent;

const Container = styled.div`
	width: 100%;
	height: 100%;
`;
