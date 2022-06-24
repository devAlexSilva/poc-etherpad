import styles from "../styles/Form.module.css"
import { BackApi, EtherApi } from "./api/axios"
import { useForm } from "react-hook-form"
import { useState } from "react"


const secret = process.env.NEXT_PUBLIC_SECRET

export default function DashBoard(props) {
    const [showFrame, setShowFrame] = useState(false)
    const [showInfo, setShowInfo] = useState('')


    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true })
    const api = new EtherApi().etherpadApi

    const createPad = async ({ createTitle }) => {
        const { data: author } = await api.get(`/createAuthorIfNotExistsFor?apikey=${secret}&name=${props.name}&authorMapper=${props.id}`)
        const { authorID } = author.data

        const { data: pad } = await api.get(`/createPad?apikey=${secret}&padID=${createTitle}&text=welcome`)
console.log(pad)
        
        setShowFrame(true)
    }

    const accessPad = async ({ title }) => {
        setShowInfo(`http://localhost:9001/p/${title}`)
        setShowFrame(true)
    }

    const listPads = async (e) => {
        e.preventDefault()
        const { data: author } = await api.get(`/createAuthorIfNotExistsFor?apikey=${secret}&name=${props.name}&authorMapper=${props.id}`)
        const { authorID } = author.data

        const { data } = await api.get(`/getAuthorName?authorID=a.jdqHtZBS8xyf1qjo`)
        console.log(data)
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

                <nav>
                    <button onClick={listPads}>
                        listar pads
                    </button>
                </nav>
            </main>
            {showFrame &&
                <section>
                    <iframe src={showInfo} width={600} height={400}></iframe>

                </section>
            }
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const token = ctx.req.cookies.user
    
    if(!token) return {
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