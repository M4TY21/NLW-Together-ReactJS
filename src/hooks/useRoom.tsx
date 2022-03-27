import { useEffect, useState } from "react";

import { database } from "../services/firebase";
import { onValue, ref } from "firebase/database";

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
	const [title, setTitle] = useState("");
	const [newQuestion, setNewQuestion] = useState("");
	const [questions, setQuestions] = useState<Question[]>(
		[]
	);

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

	return { questions, title };
}
