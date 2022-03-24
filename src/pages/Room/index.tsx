import { ref, set } from "firebase/database";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { LogoImg } from "../../assets";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import "./styles.scss";

type RoomParams = {
	id: string | undefined;
};

export function Room() {
	const { user } = useAuth();
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const [newQuestion, setNewQuestion] = useState("");

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
						<span>
							Para enviar uma pergunta,{" "}
							<button>faça seu login</button>.
						</span>
						<Button type='submit' disabled={!user}>
							Enviar pergunta
						</Button>
					</div>
				</form>
			</main>
		</div>
	);
}
