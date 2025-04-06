"use client"

import { useState } from "react";

import { sendSessionLoginRequest } from "@/functions/authenticationAPI";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function createSession(username: string, password: string, remember: boolean) {
		const {success, data} = await sendSessionLoginRequest(username, password, remember);

		if(success) {
			// set local storage session
			localStorage.setItem("session", JSON.stringify(data));

			if (remember) {
				localStorage.setItem("remember", "true");
			}
		} else {
			// error
			setError(data.message);
			console.log(data)
		}
	}

	const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRemember(e.target.checked);
	};

	return (
		<div>
			<p>Create Session</p>
			<p className="text-red-600">{error}</p>
			<input type="Username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
			<input type="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
			<label>
				<input type="checkbox" checked={remember} onChange={handleRememberChange} />
				Remember Me
			</label>
			<button onClick={() => createSession(username, password, false)}>Submit</button>
		</div>
	)
}