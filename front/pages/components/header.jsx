import Link from "next/link"

export default function Header() {
    return (
        <>
            <div>
                <nav>
                    <button>
                        <Link href="/">
                            home
                        </Link>
                    </button>
                    <button>
                        <Link href="/logout">
                            log out
                        </Link>
                    </button>
                </nav>
            </div>
        </>
    )
}
// Log out é um verbo
// Logout é um substantivo 