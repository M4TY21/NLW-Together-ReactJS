import { FormEvent, useEffect, useState } from "react";

import { database } from "../services/firebase";
import { onValue, ref, set } from "firebase/database";
import { useAuth } from "./useAuth";

type Question = {
	id: string;
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isHighlighted: boolean;
	isAnswered: boolean;
};

type FirebaseQuestions = Record<
	string,
	{
		author: {
			name: string;
			avatar: string;
		};
		content: string;
		isHighlighted: boolean;
		isAnswered: boolean;
	}
>;

export function useRoom(roomId: string) {
	const { user } = useAuth();
	const [title, setTitle] = useState("");
	const [newQuestion, setNewQuestion] = useState("");
	const [questions, setQuestions] = useState<Question[]>(
		[]
	);

	async function handleSendQuestion(event: FormEvent) {
		event.preventDefault();

		if (newQuestion.trim() === "") {
			return;
		}

		if (!user) {
			throw new Error("You must be logged in");
		}

		const question = {
			content: newQuestion,
			author: {
				name: user.name,
				avatar: user.avatar,
			},
			isHighlighted: false,
			isAnswered: false,
		};

		let ID = "";
		let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for (var i = 0; i < 12; i++) {
			ID += characters.charAt(
				Math.floor(Math.random() * 36)
			);
		}

		await set(
			ref(database, `rooms/${roomId}/questions/${ID}`),
			question
		);

		setNewQuestion("");
	}

	useEffect(() => {
		const roomRef = ref(database, `rooms/${roomId}`);

		onValue(roomRef, (room) => {
			const databaseRoom = room.val();
			const firebaseQuestions: FirebaseQuestions =
				databaseRoom.questions ?? {};
			const parsedQuestions = Object.entries(
				firebaseQuestions
			).map(([key, value]) => {
				return {
					id: key,
					content: value.content,
					author: value.author,
					isHighlighted: value.isHighlighted,
					isAnswered: value.isAnswered,
				};
			});

			setTitle(databaseRoom.title);
			setQuestions(parsedQuestions);
		});
	}, [roomId]);

	return { questions, title, handleSendQuestion };
}
