import { createContext, useState } from "react";

import {
	BrowserRouter,
	Route,
	Routes,
} from "react-router-dom";

import {
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "./services/firebase";

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";

type AuthContextType = {
	user: User | undefined;
	signInWithGoogle: () => Promise<void>;
};

type User = {
	id: string;
	name: string;
	avatar: string;
};

export const AuthContext = createContext(
	{} as AuthContextType
);

function App() {
	const [user, setUser] = useState<User>();

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
		<BrowserRouter>
			<AuthContext.Provider
				value={{ user, signInWithGoogle }}
			>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/rooms/new' element={<NewRoom />} />
				</Routes>
			</AuthContext.Provider>
		</BrowserRouter>
	);
}

export default App;
