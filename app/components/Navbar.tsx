import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import {options} from "preact";

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex items-center justify-between">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>
                            <form action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" }); // ✅ Correct syntax
                            }}>
                                <button type="submit">Logout</button>
                            </form>

                            <Link href={`/user/${session.user.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn("github"); // ✅ FIXED SYNTAX
                        }}>
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
