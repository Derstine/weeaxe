"use client"

import Dashboard from "@/components/dashboard";
import { isSessionValid } from "@/functions/authenticationAPI";
import { useEffect, useState } from "react";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [validSession, setValidSession] = useState(false);

    const [username, setUsername] = useState("");

    useEffect(() => {
        const checkSession = async () => {
            const sessionData = localStorage.getItem("session");
            
            if(sessionData) { // session found
                const session = JSON.parse(sessionData);
                if(session.token) {
                    // make sure session is good
                    const {success, data} = await isSessionValid(session.token);

                    if(success) {
                        setValidSession(true);
                        setUsername(data.owner.name);
                        setLoading(false);
                    } else {
                        setError("Invalid Session");
                    }
                    
                }
            }
        }

        checkSession()
    }, [])

    return (
        <>
            { loading ? <p>Loading dashboard</p> :

                (error ? <p>error screem</p> :
                    <Dashboard username={username} />
                )
            }
        </>
    )
}