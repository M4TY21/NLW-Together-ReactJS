import { CopyImg } from "../assets";

export function RoomCode() {
	return (
		<button className='room-code'>
			<div>
				<img src={CopyImg} alt='Copiar codigo da sala' />
			</div>
		</button>
	);
}
