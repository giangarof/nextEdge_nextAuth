'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
    const path = usePathname()
    const {data:session} = useSession()
    const [providers, setProviders] = useState(null)
    // console.log(session)
    const profileImage = session?.user?.image;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const setAuthProviders = async () => {
            const res = await getProviders()
            setProviders(res)
            // console.log(res)
        }
        setAuthProviders()

    }, [])

    return ( <>
        <nav className="flex flex-row justify-between items-center bg-cyan-600 text-white p-4">
            {/* Left: Logo */}
            <ul className="flex gap-4 items-center">
                <Link href="/" className="font-bold text-lg">NextJob</Link>
            </ul>

            {/* Middle: Links */}
            {session && (
                <ul className="flex gap-4">
                <Link
                    href="/"
                    className={
                    path === "/"
                        ? "border-b-4 border-yellow-200 text-yellow-200 transition"
                        : "border-b-4 border-transparent hover:border-yellow-200 hover:text-yellow-200 transition"
                    }
                >
                    Home
                </Link>
                <Link
                    href={`/profile/${session.user.id}`}
                    className={
                    path === `/profile/${session.user.id}`
                        ? "border-b-4 border-yellow-200 text-yellow-200 transition"
                        : "border-b-4 border-transparent hover:border-yellow-200 hover:text-yellow-200 transition"
                    }
                >
                    Profile
                </Link>
                <Link
                    href="/add"
                    className={
                    path === "/add"
                        ? "border-b-4 border-yellow-200 text-yellow-200 transition"
                        : "border-b-4 border-transparent hover:border-yellow-200 hover:text-yellow-200 transition"
                    }
                >
                    Add Post
                </Link>
                </ul>
            )}

            {/* Right: Auth Buttons / Profile */}
            <ul className="flex gap-4 items-center">
                {!session && providers &&
                    Object.values(providers).map((provider, index) => (
                        <button
                        key={index}
                        onClick={() => signIn(provider.id)}
                        className={`flex items-center gap-2 border-b-4 px-2 py-1 transition cursor-pointer ${
                            path === "/access/login" || path === "/access/signup"
                            ? "border-yellow-200 text-yellow-200"
                            : "border-transparent hover:border-yellow-200 hover:text-yellow-200"
                        }`}
                        >
                        <FaGoogle className="text-lg" />
                        <span>Login / Signup</span>
                        </button>
                    ))}

                {session && session.user.image && (
                    <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                            <Image
                            src={session.user.image}
                            alt="Profile Picture"
                            width={40}
                            height={40}
                            className="object-cover"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            />

                        {/* Dropdown */}
                        {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-10">
                            <Link href={`/profile/${session.user.id}`} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Profile</Link>
                            <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() => signOut()}
                            >
                            Sign Out
                            </button>
                        </div>
                        )}
                    </div>
                )}
            </ul>
        </nav>

    
    </> );
}
 
export default Navbar; 