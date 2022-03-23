import { FormEvent, useState } from "react";

import { database } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { useAuth } from "../../hooks/useAuth";

import {
	IllustrationImg,
	LogoImg,
	GoogleImg,
} from "../../assets";

import { Button } from "../../components/Button";

import "./styles.scss";

export function Home() {
	const navigate = useNavigate();
	const { user, signInWithGoogle } = useAuth();
	const [roomCode, setRoomCode] = useState("");

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}
		navigate("/rooms/new");
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();

		if (roomCode.trim() === "") {
			return;
		}

		const roomRef = await get(
			ref(database, `rooms/${roomCode}`)
		);

		if (!roomRef.exists()) {
			alert("Sala não existe");
			return;
		}

		navigate(`/rooms/${roomCode}`);
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
					<button
						className='create-rom'
						onClick={handleCreateRoom}
					>
						<img
							src={GoogleImg}
							alt='Botão para Autenticação com o Google'
						/>
						Crie sua sala com o Google
					</button>
					<div className='separator'>
						ou entre em uma sala
					</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type='text'
							placeholder='Digite o código da sala'
							onChange={(event) =>
								setRoomCode(event.target.value)
							}
							value={roomCode}
						/>
						<Button type='submit'>Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
}
