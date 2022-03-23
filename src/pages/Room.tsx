import { LogoImg } from "../assets";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import "../styles/room.scss";

export function Room() {
	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={LogoImg} alt='Letmeask Logo' />
					<RoomCode />
				</div>
			</header>

			<main>
				<div className='room-title'>
					<h1>Sala </h1>
					<span>4 perguntas</span>
				</div>

				<form>
					<textarea placeholder='Digite sua pergunta' />

					<div className='form-footer'>
						<span>
							Para enviar uma pergunta,{" "}
							<button>faça seu login</button>.
						</span>
						<Button type='submit'>Enviar pergunta</Button>
					</div>
				</form>
			</main>
		</div>
	);
}
