import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { database } from "../services/firebase";
import { ref, set } from "firebase/database";
import { useAuth } from "../hooks/useAuth";

import { IllustrationImg, LogoImg } from "../assets";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function NewRoom() {
	const { user } = useAuth();
	const [newRoom, setNewRoom] = useState("");
	const navigate = useNavigate();

	async function handleCreateRoom(event: FormEvent) {
		event.preventDefault();

		if (newRoom.trim() === "") {
			return;
		}

		const firebaseRoom = ref(database, `rooms/${user?.id}`);

		await set(firebaseRoom, {
			title: newRoom,
			authorId: user?.id,
		});

		navigate(`/rooms/${firebaseRoom.key}`);
	}

	return (
		<div id='page-auth'>
			<aside>
				<img
					src={IllustrationImg}
					alt='Ilustração apresentando a aplicação de perguntas e respostas'
				/>
				<strong>Toda pergunta tem uma resposta.</strong>
				<p>
					Aprenda e compartilhe conhecimento com outras
					pessoas
				</p>
			</aside>
			<main>
				<div className='main-content'>
					<img src={LogoImg} alt='LetMeAsk Logo' />
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type='text'
							placeholder='Nome da sala'
							onChange={(event) =>
								setNewRoom(event.target.value)
							}
							value={newRoom}
						/>
						<Button type='submit'>Criar sala</Button>
					</form>
					<p>
						Quer entrar em uma sala existente?{" "}
						<Link to='/'>clique aqui</Link>.
					</p>
				</div>
			</main>
		</div>
	);
}
