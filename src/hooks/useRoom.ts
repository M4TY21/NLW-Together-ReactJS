import { useEffect, useState } from "react";

import { database } from "../services/firebase";
import { onValue, ref, off } from "firebase/database";
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
		likes: Record<
			string,
			{
				authorId: string;
			}
		>;
	}
>;

export function useRoom(roomId: string) {
	const { user } = useAuth();
	const [title, setTitle] = useState("");
	const [questions, setQuestions] = useState<Question[]>(
		[]
	);

	useEffect(() => {
		const roomRef = ref(database, `rooms/${roomId}`);

    const unsubscribe = onValue(roomRef, (room) => {
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
					likeCount: Object.values(value.likes ?? {})
						.length,
					hasLinked: Object.values(value.likes ?? {}).some(
						(like) => like.authorId === user?.id
					),
				};
			});

			setTitle(databaseRoom.title);
			setQuestions(parsedQuestions);
		});

    return {
      ref.off('value', unsubscribe)
    }
	}, [roomId, user?.id]);

	return { questions, title };
}
