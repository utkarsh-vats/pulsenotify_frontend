"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function RegisterPage() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async () => {
		try {
			if (password === confirmPassword) {
				await api.registerUser(username, password, email);
				router.push("/login");
			} else {
				setError("Passwords don't match.");
				setPassword("");
				setConfirmPassword("");
			}
			// setToken(data.access);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else if (
				typeof err === "object" &&
				err !== null &&
				"error" in err &&
				typeof (err as { error: unknown }).error === "string"
			) {
				setError((err as { error: string }).error);
			} else {
				setError("Registration failed!");
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
			<div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-white">
						PulseNotify
					</h1>
					<p className="text-gray-400 mt-2">Sign up your account</p>
				</div>

				{!!error && (
					<div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
						<p className="text-red-400 text-sm text-center">
							{error}
						</p>
					</div>
				)}

				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
					className="space-y-4"
				>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username*"
						className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email*"
						className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password*"
						className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>

					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm Password"
						className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>

					<button
						type="submit"
						className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
					>
						Register
					</button>
				</form>

				<p className="text-center text-gray-400 text-sm">
					Already have an account?{" "}
					<span
						onClick={() => router.push("/login")}
						className="text-blue-400 hover:text-blue-300 cursor-pointer"
					>
						Login
					</span>
				</p>
			</div>
		</div>
	);
}
