import React from "react";
import LoginForm from "../Auth/Login";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

export default function LoginPage() {
	return (
		<>
			<Navbar />
			<LoginForm/>
			<Footer />
		</>
	);
}
