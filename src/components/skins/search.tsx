import { useState } from "react";

import { getSkinDetails } from "@/functions/skinAPI";
import { createAccessToken, getSessionToken } from "@/functions/authenticationAPI";

export default function SkinSearch() {
	const [skinID, setSkinID] = useState("");
	const [error, setError] = useState("");

	async function search() {
		console.log("searching");
		const session = await getSessionToken();
		const sessionToken = session.token;
		const sessionUser = session.owner.name;

		const createAccessTokenResponse = await createAccessToken(sessionToken, "skin");
		if (!createAccessTokenResponse.success) {
			setError("Trouble creating access token");
			return;
		}

		const accessToken = createAccessTokenResponse.data.token;

		const getSkinDetailsResponse = await getSkinDetails(accessToken, skinID, sessionUser, false);
		console.log(getSkinDetailsResponse.data) 
	}

	function handleSubmit(e: { preventDefault: () => void; }) {
		e.preventDefault();
		search();
	}

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<input
				type="text"
				value={skinID}
				onChange={(e) => setSkinID(e.target.value)}
				placeholder="Search skins..."
				className="border px-2 py-1 rounded"
			/>
			<button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
				Search
			</button>
		</form>
	);
}
