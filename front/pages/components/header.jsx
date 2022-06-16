import Link from "next/link"
import Router from "next/router"
import { destroyCookie } from "nookies"

export default function Header() {
    
    const logout = async () => {
        destroyCookie(null, 'user')
        await Router.push('/')
    }
    
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
                        <a title="logout" onClick={logout}>
                            log out
                        </a>
                    </button>
                </nav>
            </div>
        </>
    )
}
// Log out é um verbo
// Logout é um substantivo 