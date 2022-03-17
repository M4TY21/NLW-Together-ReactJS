import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import googleIcon from "../assets/google-icon.svg";

import "../styles/auth.scss";

export function Home() {
	return (
		<div id='page-auth'>
			<aside>
				<img
					src={illustrationImg}
					alt='Ilustração apresentando a aplicação de perguntas e respostas'
				/>
				<strong>Toda pergunta tem uma resposta.</strong>
				<p>
					Aprenda e compartilhe conhecimento com outras
					pessoas
				</p>
			</aside>
			<main>
				<div id='main-content'>
					<img src={logoImg} alt='LetMeAsk Logo' />
					<button>
						<img
							src={googleIcon}
							alt='Botão para Autenticação com o Google'
						/>
						Crie sua sala com o Google
					</button>
					<div>
						<form>
							<input
								type='text'
								placeholder='Digite o código da sala'
							/>
							<button type='submit'>Entrar na sala</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}
