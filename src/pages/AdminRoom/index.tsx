import { FormEvent, useState } from "react";

import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { ref, set } from "firebase/database";
import { useParams } from "react-router-dom";

import { LogoImg } from "../../assets";

import { Questions } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";
import { Button } from "../../components/Button";

import "./styles.scss";

type RoomParams = {
	id: string | undefined;
};

export function AdminRoom() {
	const { user } = useAuth();
	const [newQuestion, setNewQuestion] = useState("");
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { questions, title } = useRoom(
		roomId ? roomId : ""
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

	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={LogoImg} alt='Letmeask Logo' />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined>Encerrar Sala</Button>
					</div>
				</div>
			</header>

			<main>
				<div className='room-title'>
					<h1>Sala {title}</h1>
					{questions.length > 0 && (
						<span>
							{questions.length} pergunta
							{questions.length < 2 ? "" : "s"}
						</span>
					)}
				</div>

				<div className='question-list'>
					{questions.map((question) => {
						return (
							<Questions
								key={question.id}
								content={question.content}
								author={question.author}
							/>
						);
					})}
				</div>
			</main>
		</div>
	);
}
