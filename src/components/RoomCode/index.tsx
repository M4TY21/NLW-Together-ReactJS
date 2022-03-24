import { CopyImg } from "../../assets";

import "./styles.scss";

type RoomCodeProps = {
	code: string | undefined;
};

export function RoomCode(props: RoomCodeProps) {
	function copyRoomCodeToClipboard() {
		navigator.clipboard.writeText(
			props.code ? props.code : ""
		);
	}

	return (
		<button
			className='room-code'
			onClick={copyRoomCodeToClipboard}
		>
			<div>
				<img src={CopyImg} alt='Copiar codigo da sala' />
			</div>
			<span>Sala #{props.code}</span>
		</button>
	);
}
