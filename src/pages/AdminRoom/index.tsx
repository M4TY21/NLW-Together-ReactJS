import { useRoom } from "../../hooks/useRoom";
import { useParams } from "react-router-dom";

import { LogoImg } from "../../assets";

import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";
import { Button } from "../../components/Button";

import "./styles.scss";

type RoomParams = {
	id: string | undefined;
};

export function AdminRoom() {
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { questions, title } = useRoom(
		roomId ? roomId : ""
	);

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
							<Question
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
