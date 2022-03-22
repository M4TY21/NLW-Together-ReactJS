import {
	createContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../services/firebase";

type User = {
	id: string;
	name: string;
	avatar: string;
};

type AuthContextType = {
	user: User | undefined;
	signInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext(
	{} as AuthContextType
);

type AuthContextProviderProps = {
	children: ReactNode;
};

export function AuthContextProvider(
	props: AuthContextProviderProps
) {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { displayName, photoURL, uid } = user;

				if (!displayName || !photoURL) {
					throw new Error(
						"Missing information from Google Accont."
					);
				}

				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL,
				});
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();

		const result = await signInWithPopup(auth, provider);

		if (result.user) {
			const { displayName, photoURL, uid } = result.user;

			if (!displayName || !photoURL) {
				throw new Error(
					"Missing information from Google Accont."
				);
			}

			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL,
			});
		}
	}

	return (
		<AuthContext.Provider
			value={{ user, signInWithGoogle }}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
