async function hashCredentials(username: string, password: string) { //chatgpt generated lmao
	// Hash password with SHA-256
	const data = new TextEncoder().encode(password);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);

	// Convert hash to hex
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");

	// hash with base64
	const encodedCredentials = btoa(username + ":" + hex);

	return encodedCredentials
}

export async function sendSessionLoginRequest(username: string, password: string, remember: boolean) {
    const rememberString = remember ? "true" : "false";
    const credentials = await hashCredentials(username, password);

	const response = await fetch(
		`https://api.weeaxe.cn:15102/auth/v2/session/login?remember=${rememberString}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Basic ${credentials}`,
				"Content-Type": "application/json",
			}
		}
	);

	const data = await response.json();
    return {success: response.ok, data: data};

}

export async function isSessionValid(token: string) {
    console.log("token: " + token)
    const response = await fetch("https://api.weeaxe.cn:15102/auth/v2/session", {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

    const data = await response.json();
    return {success: response.ok, data: data};
}