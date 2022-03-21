import {
	IllustrationImg,
	LogoImg,
	GoogleImg,
} from "../assets";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function NewRoom() {
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
					<form>
						<input type='text' placeholder='Nome da sala' />
						<Button type='submit'>Criar sala</Button>
					</form>
					<p>
						Quer entrar em uma sala existente?{" "}
						<a>clique aqui</a>
					</p>
				</div>
			</main>
		</div>
	);
}
