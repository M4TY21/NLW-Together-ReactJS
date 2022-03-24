import { CopyImg } from "../../assets";

import "./styles.scss";

export function RoomCode() {
	return (
		<button className='room-code'>
			<div>
				<img src={CopyImg} alt='Copiar codigo da sala' />
			</div>
			<span>Sala #356456</span>
		</button>
	);
}
