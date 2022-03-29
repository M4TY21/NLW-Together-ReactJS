import { useRoom } from "../../hooks/useRoom";
import { useNavigate, useParams } from "react-router-dom";

import { LogoImg, DeleteImg } from "../../assets";

import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";
import { Button } from "../../components/Button";

import "./styles.scss";
import { ref, remove, update } from "firebase/database";
import { database } from "../../services/firebase";

type RoomParams = {
	id: string | undefined;
};

export function AdminRoom() {
	const navigate = useNavigate();
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { questions, title } = useRoom(
		roomId ? roomId : ""
	);

	async function handleEndRoom() {
		update(ref(database, `rooms/${roomId}`), {
			endedAt: new Date(),
		});

		navigate("/");
	}

	async function handleDeleteQuestion(questionId: string) {
		if (
			window.confirm(
				"Tem certeza que deseja excluir esta pergunta?"
			)
		) {
			await remove(
				ref(
					database,
					`rooms/${roomId}/questions/${questionId}`
				)
			);
		}
	}

	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={LogoImg} alt='Letmeask Logo' />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Encerrar Sala
						</Button>
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
							<Question
								key={question.id}
								content={question.content}
								author={question.author}
							>
								<button
									type='button'
									onClick={() =>
										handleDeleteQuestion(question.id)
									}
								>
									<img
										src={DeleteImg}
										alt='Deletar pergunta'
									/>
								</button>
							</Question>
						);
					})}
				</div>
			</main>
		</div>
	);
}
