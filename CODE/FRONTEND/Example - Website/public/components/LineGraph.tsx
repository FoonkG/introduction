import React from "react";
import styled from "styled-components";

import { ILineGraph } from "public/interfaces/LineGraph";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";

const LineGraph = ({ width, height, data }: ILineGraph) => {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

	return (
		<Container width={width} height={height}>
			<Chart
				height={height}
				width={width}
				type="line"
				data={{
					labels: data.labels,
					datasets: [
						{
							data: data.data,
						},
					],
				}}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					interaction: {
						mode: "index",
						intersect: false,
					},
					elements: {
						line: {
							tension: 0.6,
							borderColor: "#8A8C8E",
						},
					},
					plugins: {
						legend: {
							display: false,
							labels: {
								color: "rgb(255, 99, 132)",
								font: {
									family: "Montserrat",
								},
							},
						},
						tooltip: {
							enabled: true,
							mode: "index",
							intersect: false,
							bodyFont: {
								family: "Montserrat",
							},
							titleFont: {
								family: "Montserrat",
							},
						},
					},

					hover: {
						mode: "nearest",
						intersect: true,
					},
					scales: {
						x: {
							grid: {
								display: false,
							},
							ticks: {
								display: false,
							},
							suggestedMin: 1,
							suggestedMax: 7,
						},
						y: {
							grid: {
								display: true,
								color: "#222528",
							},
							ticks: {
								stepSize: 0.15,
							},
							suggestedMin: 0.0,
							suggestedMax: 0.3,
						},
					},
				}}
			/>
		</Container>
	);
};

export default LineGraph;

const Container = styled.div<{ width: string; height: string }>`
	width: ${(props) => props.width};
	height: ${(props) => props.height};

	margin: 20px auto;
`;
