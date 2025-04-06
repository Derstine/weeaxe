"use client"

import Image from "next/image";
import Login from "@/components/session";
import { useEffect, useState } from "react";
import { isSessionValid } from "@/functions/authenticationAPI";

export default function Home() {
	const [validSession, setValidSession] = useState(false);

	useEffect(() => {
		const checkSession = async () => {
			const sessionData = localStorage.getItem("session");
			
			if(sessionData) { // session found
				const session = JSON.parse(sessionData);
				if(session.token) {
					// make sure session is good
					const {success, data} = await isSessionValid(session.token);

					if(success) {
						setValidSession(true)
					} else {
						console.log(data)
					}
					
				}
			}
		}

		checkSession()
	}, [])

	return (
		<>
			{validSession ?
				<p>Hello</p>
			:
				<Login />}
		</>
	)
}
