export async function uploadSkinRequest(user: string, skin: string, token: string, captionText: string, captionColor: string, value: string, signature: string) {
    const url = `https://api.weeaxe.cn:15102/skin/v3/data/${user}/${skin}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caption: {
          text: captionText,
          color: captionColor,
        },
        data: {
          value: value,
          signature: signature,
        },
      }),
    });
  
	const data = await response.json();
  return {success: response.ok, data: data};
}
  
export async function listUserSkins(token: string, user: string, count: number | boolean) {
  let countString = "false";
  if(typeof count === "boolean") {
    if(count) { countString = "true"}
  }

  const url = `https://api.weeaxe.cn:15102/skin/v3/data/${user}?count=${count}`;
    
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return {success: response.ok, data: data};
}

export async function getSkinDetails(token: string, skin: string, user: string, exists: boolean) {
  const existsString = exists ? "?exists=true" : "";
  const url = `https://api.weeaxe.cn:15102/skin/v3/data/${user}/${skin}${existsString}`;
    
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return {success: response.ok, data: data};
}