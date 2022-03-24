import { FormEvent, useEffect, useState } from "react";

import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { onValue, ref, set } from "firebase/database";
import { useParams } from "react-router-dom";

import { LogoImg } from "../../assets";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import "./styles.scss";

type RoomParams = {
	id: string | undefined;
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

export function Room() {
	const { user } = useAuth();
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const [newQuestion, setNewQuestion] = useState("");

	useEffect(() => {
		const roomRef = ref(database, `rooms/${roomId}`);

		onValue(roomRef, (room) => {
			const databaseRoom = room.val();
			const firebaseQuestions: FirebaseQuestions =
				databaseRoom.questions ?? {};
			const parsedQuestions = Object.entries(
				firebaseQuestions
			);
		});
	}, [roomId]);

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

		await set(
			ref(database, `rooms/${roomId}/questions/${user.id}`),
			question
		);

		setNewQuestion("");
	}

	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={LogoImg} alt='Letmeask Logo' />
					<RoomCode code={roomId} />
				</div>
			</header>

			<main>
				<div className='room-title'>
					<h1>Sala </h1>
					<span>4 perguntas</span>
				</div>

				<form onSubmit={handleSendQuestion}>
					<textarea
						placeholder='Digite sua pergunta'
						onChange={(event) =>
							setNewQuestion(event.target.value)
						}
						value={newQuestion}
					/>

					<div className='form-footer'>
						{user ? (
							<div className='user-info'>
								<img
									src={user.avatar}
									alt={`avatar de ${user.id}`}
								/>
								<span>{user.name}</span>
							</div>
						) : (
							<span>
								Para enviar uma pergunta,{" "}
								<button>faça seu login</button>.
							</span>
						)}
						<Button type='submit' disabled={!user}>
							Enviar pergunta
						</Button>
					</div>
				</form>
			</main>
		</div>
	);
}
