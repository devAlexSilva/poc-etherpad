import styles from "../styles/Form.module.css"
import { BackApi, EtherApi } from "./api/axios"
import { useForm } from "react-hook-form"
import { setCookie } from "nookies"


const secret = process.env.NEXT_PUBLIC_SECRET

export default function DashBoard(props) {
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true })
    const api = new EtherApi().etherpadApi

    const createPad = async ({ createTitle }) => {
        const { data: author } = await api.get(`/createAuthorIfNotExistsFor?apikey=${secret}&name=${props.name}&authorMapper=${props.id}`)
        const { authorID } = author.data

        const { data: group } = await api.get(`/createGroupIfNotExistsFor?apikey=${secret}&groupMapper=${props.id}`)
        const { groupID } = group.data
        
        const { data: pad } = await api.get(`/createGroupPad?apikey=${secret}&groupID=${groupID}&padName=${createTitle}`)

        const currentTimeInSeconds = Math.floor(Date.now()/1000)
        const validSession = currentTimeInSeconds + 1800 // 30 minutes
        const { data: session } = await api.get(`/createSession?apikey=${secret}&groupID=${groupID}&authorID=${authorID}&validUntil=${validSession}`)
        const { sessionID } = session.data

        setCookie(null, 'sessionID', sessionID, {
            maxAge: 60 * 30 // 60s*30 = 30 minutes
        })
    }
    const accessPad = async ({ title }) => {
        console.log(title)
    }


    return (
        <div>
            <h1>nome: {props.name}</h1>
            <p>id: {props.id}</p>

            <main>
                <div>
                    <h2>criar novo texto</h2>
                    <form className={styles.form} onSubmit={handleSubmit(createPad)}>

                        <div className={styles.form_box}>

                            <div className={styles.inputField}>
                                <label htmlFor="createTitle">
                                    titulo
                                </label>
                                <input
                                    {...register('createTitle')}
                                    id="createTitle"
                                    name="createTitle"
                                    type="text"
                                    required
                                    placeholder="aula 02 de Inglês"
                                />
                            </div>

                        </div>
                        <button>
                            Registrar
                        </button>
                    </form>
                </div>

                <div>
                    <h2>Entrar em um texto existente</h2>
                    <form className={styles.form} onSubmit={handleSubmit(accessPad)}>

                        <div className={styles.form_box}>

                            <div className={styles.inputField}>
                                <label htmlFor="title">
                                    titulo
                                </label>
                                <input
                                    {...register('title')}
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="aula 02 de Inglês"
                                />
                            </div>

                        </div>
                        <button>
                            Entrar
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const token = ctx.req.cookies.user
    const api = new BackApi(token).backEndApi

    const { data } = await api.get('/user')

    return {
        props: data
    }
}