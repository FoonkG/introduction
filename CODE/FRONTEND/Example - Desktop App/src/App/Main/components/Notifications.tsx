import React from "react";
import styled from "styled-components";

import { ReactComponent as NotificationDot } from "@/App/assets/notificationdot.svg";

const Notifications = () => {
	return (
		<Container
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<Triangle />
			<NotificationsContainer>
				<NotificationsTitleContainer>
					<NotificationsTitle>Notifications</NotificationsTitle>5 Unread
				</NotificationsTitleContainer>
				<NotificationsListContainer>
					<Notification>
						<StyledNotificationDot unread={false} />
						<NotificationText unread={false}>You’re on the latest version!</NotificationText>
					</Notification>
					<Notification>
						<StyledNotificationDot unread={true} />
						<NotificationText unread={true}>Checkout Successful!</NotificationText>
					</Notification>
					<Notification>
						<StyledNotificationDot unread={true} />
						<NotificationText unread={true}>Checkout Successful!</NotificationText>
					</Notification>
					<Notification>
						<StyledNotificationDot unread={true} />
						<NotificationText unread={true}>Checkout Successful!</NotificationText>
					</Notification>
					<Notification>
						<StyledNotificationDot unread={true} />
						<NotificationText unread={true}>Checkout Successful!</NotificationText>
					</Notification>
					<Notification>
						<StyledNotificationDot unread={true} />
						<NotificationText unread={true}>Checkout Successful!</NotificationText>
					</Notification>
				</NotificationsListContainer>
			</NotificationsContainer>
		</Container>
	);
};

export default Notifications;

const Container = styled.div`
	position: absolute;
	right: -360px;
	top: 50%;
	transform: translateY(-50%);

	width: 355px;
	height: 282px;

	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

const Triangle = styled.div`
	width: 16px;
	height: 16px;

	background: #343434;

	clip-path: polygon(100% 0, 0 50%, 100% 100%);
`;

const NotificationsContainer = styled.div`
	width: 339px;
	height: 282px;

	background: #343434;
	border-radius: 10px;

	padding-left: 20px;
	padding-right: 20px;
`;

const NotificationsTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content space-between;
    width: 100%;

    font-weight: 400;
font-size: 15px;
line-height: 18px;

color: #CCCCCC;

margin-top: 15px;
`;

const NotificationsTitle = styled.div`
	font-weight: 600;
	font-size: 25px;
	line-height: 30px;

	color: #ffffff;
`;

const NotificationsListContainer = styled.div`
	height: 234px;
	width: 100%;

	padding-top: 7px;
	padding-bottom: 10px;

	display: flex;
	flex-direction: column;

	gap: 5px;

	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0px;
	}
`;

const Notification = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	gap: 8px;
`;

const NotificationText = styled.div<{ unread: boolean }>`
	font-weight: 500;
	font-size: 20px;
	line-height: 24px;
	color: ${({ unread }) => (unread ? "#24FF00" : "#CCCCCC")};
`;

const StyledNotificationDot = styled(NotificationDot)<{ unread: boolean }>`
	& circle {
		stroke: ${({ unread }) => (unread ? "#24FF00" : "#CCCCCC")};
	}
`;
