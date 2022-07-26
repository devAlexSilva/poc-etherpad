import styles from "../styles/Form.module.css"
import { BackApi, EtherApi } from "./api/axios"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { setCookie } from "nookies"


const secret = process.env.NEXT_PUBLIC_SECRET

export default function DashBoard(props) {
    const [showFrame, setShowFrame] = useState(false)
    const [showInfo, setShowInfo] = useState('')


    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true })
    const api = new EtherApi().etherpadApi
    const loginEtherpad = new EtherApi().apache

    function validSession() {
        let time = Math.floor(new Date().getTime() / 1000)
        time += (60 * 120) // 60 seconds * 120 = 2 hours
        return time
    }

    const createPad = async ({ createTitle }) => {
        const { data: author } = await api.get(`/createAuthorIfNotExistsFor?apikey=${secret}&name=${props.name}&authorMapper=${props.id}`)
        const { authorID } = author.data
        console.log('author id: ', authorID)

        const { data: group } = await api.get(`/createGroupIfNotExistsFor?apikey=${secret}&groupMapper=${props.id}`)
        const { groupID } = group.data
        console.log('group id: ', groupID)

        const { data: pad } = await api.get(`/createGroupPad?apikey=${secret}&groupID=${groupID}&padName=${createTitle}&text=bla bla`)
        console.log(pad.data)

        const { data: session } = await api.get(`/createSession?apikey=${secret}&groupID=${groupID}&authorID=${authorID}&validUntil=${validSession()}`)
        const { sessionID } = session.data
        console.log('a session id é: ', sessionID)

        setCookie(null, 'sessionID', sessionID, {
            maxAge: 60 * 120 // 2h
        })

        setShowInfo(`http://localhost:9001/p/${createTitle}`)
        setShowFrame(true)
    }

    const showFrameWithProxy = () => {
        setShowInfo(`http://localhost:80/`)
        setShowFrame(true)
    }


    return (
        <div>
            <div>
                <h1>nome: {props.name}</h1>
                <p>id: {props.id}</p>
            </div>
            <main className={styles.container}>
                <div>
                    <h2>Abrir o Etherpad</h2>
                </div>

                <nav className={styles.nav}>
                    <button>
                        <a href="http://localhost:9001" target="_blank">
                            pad
                        </a>
                    </button>
                    <button onClick={showFrameWithProxy}>
                        reverse proxy
                    </button>
                </nav>
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const token = ctx.req.cookies.user

    if (!token) return {
        redirect: {
            destination: '/'
        }
    }

    const api = new BackApi(token).backEndApi

    const { data } = await api.get('/user')

    return {
        props: data
    }
}