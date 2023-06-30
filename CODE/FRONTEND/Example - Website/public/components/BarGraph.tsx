import React from "react";
import styled from "styled-components";

import { IBarGraph } from "public/interfaces/BarGraph";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";

const BarGraph = ({ width, height, data }: IBarGraph) => {
	ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

	return (
		<Container width={width} height={height}>
			<Chart
				height={height}
				width={width}
				type="bar"
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
						bar: {
							backgroundColor: "#63C393",
						},
					},
					plugins: {
						legend: {
							display: false,
							labels: {
								color: "rgb(255,255,255)",
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
						},
						y: {
							grid: {
								display: false,
							},
							ticks: {
								display: false,
							},
						},
					},
				}}
			/>
		</Container>
	);
};

export default BarGraph;

const Container = styled.div<{ width: string; height: string }>`
	width: ${(props) => props.width};
	height: ${(props) => props.height};

	margin: auto;
`;
