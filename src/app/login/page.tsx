"use client"

import type React from "react"

import { useState } from "react"
import { sendSessionLoginRequest } from "@/functions/authenticationAPI"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function createSession(username: string, password: string, remember: boolean) {
		setLoading(true)
		setError("")
	
		try {
		  const { success, data } = await sendSessionLoginRequest(username, password, remember)
	
		  if (success) {
			// set local storage session
			localStorage.setItem("session", JSON.stringify(data))
	
			if (remember) {
			  localStorage.setItem("remember", "true")
			}

            window.location.href = "dashboard"
		  } else {
			// error
			setError(data.message || "Login failed")
		  }
		} catch (err) {
		  setError("An error occurred")
		} finally {
		  setLoading(false)
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		createSession(username, password, remember)
	}

	return (
		<>
			<div className="absolute flex justify-center items-center w-screen h-screen bg-gray-900 bg-cover bg-center z-0" style={{ backgroundImage: "url('/weeaxe.png')", filter: 'blur(10px)' }} />
			<div className="absolute flex justify-center items-center w-screen h-screen">
				<div className="absolute w-1/4 h-1/2 z-10 bg-white opacity-55 rounded-4xl" />
			</div>
			<div className="absolute flex flex-col justify-center items-center w-full h-full z-10 text-gray-950">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

				{error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label className="text-lg" htmlFor="username">Username</Label>
						<Input
						className="border-gray-400 mt-1"
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
						disabled={loading}
						required
						/>
					</div>

					<div>
						<Label className="text-lg" htmlFor="password">Password</Label>
						<Input
						className=" border-gray-400 mt-1"
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						disabled={loading}
						required
						/>
					</div>

					<div className="flex items-center space-x-2">
						<Checkbox
						id="remember"
						checked={remember}
						onCheckedChange={(checked) => setRemember(checked === true)}
						disabled={loading}
						/>
						<Label htmlFor="remember">Remember me</Label>
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Signing in...
						</>
						) : (
						"Sign in"
						)}
					</Button>
				</form>
			</div>
		</>
		
	)
}