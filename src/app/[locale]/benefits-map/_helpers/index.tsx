'use client';

import {
	FaArrowCircleLeft,
	FaArrowCircleRight,
	FaArrowDown,
	FaArrowLeft,
	FaArrowRight,
	FaArrowUp,
	FaPlay,
} from 'react-icons/fa';
import {
	MdOutlineTurnSlightLeft,
	MdOutlineTurnSlightRight,
	MdRoundaboutRight,
} from 'react-icons/md';
import { PiFlagCheckeredFill } from 'react-icons/pi';

export const getInstructionIcon = (type: number) => {
	switch (type) {
		case 0:
			return <FaArrowLeft />; // Left
		case 1:
			return <FaArrowRight />; // Right
		case 2:
			return <FaArrowCircleLeft />; // Sharp left
		case 3:
			return <FaArrowCircleRight />; // Sharp right
		case 4:
			return <MdOutlineTurnSlightLeft />; // Slight left
		case 5:
			return <MdOutlineTurnSlightRight />; // Slight right
		case 6:
			return <FaArrowUp />; // Straight
		case 7:
			return <MdRoundaboutRight />; // Enter roundabout
		case 8:
			return <MdRoundaboutRight />; // Exit roundabout
		case 9:
			return <FaArrowDown />; // U-turn
		case 10:
			return <PiFlagCheckeredFill />; // Arrive/Goal
		case 11:
			return <FaPlay />; // Depart/Start
		case 12:
			return <FaArrowCircleLeft />; // Keep left
		case 13:
			return <FaArrowCircleRight />; // Keep right
		default:
			return <FaArrowUp />; // Fallback
	}
};

export const formatDuration = (seconds: number, hLabel: string, minLabel: string) => {
	const mins = Math.floor(seconds / 60);
	const hrs = Math.floor(mins / 60);
	const restMin = mins % 60;

	if (hrs > 0) return `${hrs} ${hLabel} ${restMin} ${minLabel}`;
	return `${restMin} ${minLabel}`;
};

export const formatDistance = (meters: number, kmLabel: string, mLabel: string, round = false) => {
	return meters >= 1000
		? `${round ? Math.round(meters / 1000) : (meters / 1000).toFixed(1)} ${kmLabel}`
		: `${Math.round(meters)} ${mLabel}`;
};
