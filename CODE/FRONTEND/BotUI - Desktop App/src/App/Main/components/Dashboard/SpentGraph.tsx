import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

const x = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const y = [10, 41, 35, 51, 49, 62, 69];

const SpentGraph = () => {
	return (
		<InnerGraphContainer>
			<Chart
				options={{
					colors: ["#AC98EF"],
					chart: {
						type: "line",
						stacked: false,
						height: 350,
						zoom: {
							enabled: false,
						},
						toolbar: {
							show: false,
						},
						animations: {
							enabled: true,
						},
					},
					grid: {
						show: false,
					},
					dataLabels: {
						enabled: false,
					},
					markers: {
						size: 8,
						colors: ["#AC98EF"],
						strokeColors: "white",
						strokeWidth: 1,
						radius: 7,
						discrete: [
							{
								dataPointIndex: 0,
								seriesIndex: 0,
								size: 0,
							},
							{
								dataPointIndex: x.length - 1,
								seriesIndex: 0,
								size: 0,
							},
						],
					},
					title: {
						text: undefined,
						align: "left",
					},
					fill: {
						type: "gradient",
						gradient: {
							shadeIntensity: 10,
							inverseColors: false,
							opacityFrom: 0.5,
							opacityTo: 0,
							stops: [0, 100],
						},
					},
					yaxis: {
						show: false,
						labels: {
							show: true,
						},
						axisBorder: {
							show: false,
						},
						axisTicks: {
							show: false,
						},
					},
					xaxis: {
						categories: x,
						labels: {
							show: false,
						},
						axisBorder: {
							show: false,
						},
						axisTicks: {
							show: false,
						},
					},
					tooltip: {
						enabled: false,
					},
				}}
				series={[
					{
						name: "Desktops",
						data: y,
					},
				]}
				type="area"
				width="644"
				height="166"
			/>
		</InnerGraphContainer>
	);
};

export default SpentGraph;

const InnerGraphContainer = styled.div`
	width: 100%;
	transform: translateX(-12px);
	margin-top: 20px;
`;
