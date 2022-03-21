import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
	IllustrationImg,
	LogoImg,
	GoogleImg,
} from "../assets";

import { Button } from "../components/Button";

import { AuthContext } from "../App";

import "../styles/auth.scss";

export function Home() {
	const navigate = useNavigate();
	const { user, signInWithGoogle } =
		useContext(AuthContext);

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}
		navigate("/rooms/new");
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
					<form>
						<input
							type='text'
							placeholder='Digite o código da sala'
						/>
						<Button type='submit'>Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
}
