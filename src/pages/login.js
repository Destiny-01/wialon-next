import Image from "next/image";
import wialon2 from "../../public/gig.png";

import wialonLogin1 from "../../public/wialonLogin1.jpg";
import wialonDecoration from "../../public/auth-decoration.png";

const login = () => {
	return (
		<main class="bg-white">
			<div class="relative flex">
				<div class="w-full md:w-1/2">
					<div class="min-h-screen h-full flex flex-col after:flex-1">
						<div class="flex-1">
							<div class="flex items-center justify-between mt-8 h-16 px-4 sm:px-6 lg:px-8">
								<a class="block" href="index.html">
									<Image src={wialon2} width={200} height={200} alt="wialon-logo" />
								</a>
							</div>
						</div>

						<div class="w-[320px] lg:w-[520px] mx-auto px-4 py-8">
							<h1 class="text-3xl text-slate-800 font-bold mb-6">Welcome back! ✨</h1>
							<form>
								<div class="space-y-4">
									<div>
										<label class="block text-sm font-medium mb-1" for="email">
											Username
										</label>
										<input id="email" class="form-input w-full" type="email" />
									</div>
									<div>
										<label class="block text-sm font-medium mb-1" for="password">
											Password
										</label>
										<input
											id="password"
											class="form-input w-full"
											type="password"
											autocomplete="on"
										/>
									</div>
								</div>
								<div class="flex items-center justify-between mt-6">
									<div class="mr-1">
										<a
											class="text-sm underline hover:no-underline"
											href="reset-password.html"
										>
											Forgot Password?
										</a>
									</div>
									<a
										class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
										href="index.html"
									>
										Sign In
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div
					class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
					aria-hidden="true"
				>
					<Image
						className="object-cover object-center w-full h-full"
						src={wialonLogin1}
						width={860}
						height={860}
						alt="wialon-login"
					/>
					<Image
						className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block"
						src={wialonDecoration}
						width={218}
						height={224}
						alt="auth-decoration"
					/>
				</div>
			</div>
		</main>
	);
};

export default login;
