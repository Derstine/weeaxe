"use client"

export default function Page() {


	return (
		<>
			<div className="absolute flex justify-center items-center w-screen h-screen bg-gray-900 bg-cover bg-center z-0" style={{ backgroundImage: "url('/weeaxe.png')", filter: 'blur(10px)' }} />
			<div className="absolute flex justify-center items-center w-screen h-screen">
				<div className="absolute w-1/4 h-1/2 z-10 bg-white opacity-55 rounded-4xl" />
			</div>
			<div className="absolute flex flex-col justify-center items-center w-full h-full z-10 text-gray-950">
				<a href="/login" className="text-2xl font-bold mb-6 text-center">Login</a>
				<a href="/dashboard" className="text-2xl font-bold mb-6 text-center">Dashboard</a>
			</div>
		</>
	)
}
