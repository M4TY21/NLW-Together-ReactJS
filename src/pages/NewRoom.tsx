import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";

import { IllustrationImg, LogoImg } from "../assets";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";
import { database } from "../services/firebase";
import { ref, set } from "firebase/database";

export function NewRoom() {
	const { user } = useAuth();
	const [newRoom, setNewRoom] = useState("");

	async function handleCreateRoom(event: FormEvent) {
		event.preventDefault();

		if (newRoom.trim() === "") {
			return;
		}

		set(ref(database, "rooms"), {
			title: newRoom,
			authorId: user?.id,
		});
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
						<Link to='/'>clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
