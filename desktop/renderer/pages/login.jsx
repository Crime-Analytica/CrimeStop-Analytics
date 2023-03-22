import { useState} from "react";
import Link from "next/link";
import Router from "next/router";
import Store from 'electron-store';
const store = new Store();


const Login = () => {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    try {
      const res = await fetch("http://localhost:80/api/sign-in", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.token) {
        store.set("token", data.token);
        Router.push("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while trying to sign in");    }

  };

  return (
    <div className="flow-root">
      <div className="relative">
        <div className="relative ">
          <img
            src="images/crime.png"
            className=" absolute top-0 right-0 h-screen w-[59.9rem] object-cover "
          />
        </div>
        <div className="flex items-left min-h-screen bg-gray-100 lg:float:left">
          <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:w-2/4 lg:max-w-screen-xl mt-0 mb-0 ml-0">
            {" "}
            <div className="p-4 py-6 text-[#fff] bg-[#8b0000] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:w-2/1 md:justify-evenly mt-0 mb-0 ml-0">
              <div className="my-3 text-4xl font-bold tracking-wider text-center">
                <Link href="#">CRA</Link>
              </div>

              <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                "Unlock a new level of community safety with our cutting-edge
                crime-stopping technology !"
              </p>
              <div className="card w-60 h-40 bg-[#1e1e1e] text-[#fff]-content">
                <div className="flex flex-col items-center justify-center  text-center card-body">
                  <p className="mb-30">Don't Have An Account?</p>
                  <div className="fix justify-content-center">
                    <Link href="/register">
                      <button className="btn bg-[#e01e] hover:bg-[#8b0000] text-[#fff]">
                        Register
                      </button>
                    </Link>{" "}
                  </div>
                </div>
              </div>
              <p className="mt-6 text-sm text-center text-gray-300">
                Read our{" "}
                <a href="#" className="underline">
                  terms
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  conditions
                </a>
              </p>
            </div>
            <div className="p-5 bg-[#1e1e1e] md:flex-1">
              <div className="p-5 bg-white md:flex-1">
                <h3 className="my-4 text-2xl font-semibold text-[#fff]">
                  Account Login
                </h3>
                {error && (
                  <div className="error texr-2xl text-[red]">{error}</div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-5 z-10 mid:w-2/3"
                >
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold  text-[#D3D3D3	]"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 text-[#fff]"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold  text-[#D3D3D3	]"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-[#F2A5A8] hover:underline focus:text-[#1E40AE]"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="px-4 py-2 transition duration-300 border border-white-100 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 text-[#fff]"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-semibold  text-[#D3D3D3	]"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-lg font-semibold text-[#fff] transition-colors duration-300 bg-[#8b0000] rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-red-200 focus:ring-4"
                      id="login-form"
                    >
                      Log in
                    </button>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <span className="flex items-center justify-center space-x-2">
                      <span className="h-px bg-gray-400 w-14"></span>
                      <span className="font-normal text-[#63748E]">
                        or login with
                      </span>
                      <span className="h-px bg-gray-400 w-14"></span>
                    </span>
                    <div className="flex flex-col space-y-4">
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-[#1F2A38] rounded-md group group hover:bg-[#8b0000] focus:outline-none"
                      >
                        <span>
                          <svg
                            className="w-5 h-5 text-[#fff] fill-current group-hover:text-[#fff]"
                            viewBox="0 0 16 16"
                            version="1.1"
                            aria-hidden="true"
                          >
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path>
                          </svg>
                        </span>
                        <span className="text-sm font-medium text-[#fff] group-hover:text-[#fff]">
                          Google
                        </span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-[#1F2A38] rounded-md group hover:bg-[#8b0000] focus:outline-none"
                      >
                        <span>
                          <svg
                            className="text-[#fff] group-hover:text-[#fff]"
                            width="20"
                            height="20"
                            fill="currentColor"
                          >
                            <path d="M7.462 0H0v7.19h7.462V0zM16 0H8.538v7.19H16V0zM7.462 8.211H0V16h7.462V8.211zm8.538 0H8.538V16H16V8.211z" />
                          </svg>
                        </span>
                        <span className="text-sm font-medium  text-[#fff] group-hover:text-[#fff]">
                          Microsoft
                        </span>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
