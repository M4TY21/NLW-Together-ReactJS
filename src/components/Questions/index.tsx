import { ReactNode } from "react";

import "./styles.scss";

type QuestionProps = {
	content: string;
	author: {
		name: string;
		avatar: string;
	};
	children?: ReactNode;
};

export function Questions(props: QuestionProps) {
	return (
		<div className='question'>
			<p>{props.content}</p>
			<footer>
				<div className='user-info'>
					<img
						src={props.author.avatar}
						alt={`Avatar do usuário ${props.author.name}`}
					/>
					<span>{props.author.name}</span>
				</div>
				<div>{props.children}</div>
			</footer>
		</div>
	);
}
