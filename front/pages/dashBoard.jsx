import { BackApi } from "./api/axios"
import { useForm } from "react-hook-form"
import styles from "../styles/Form.module.css"


export default function DashBoard(props) {
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true })

    const createPad = async ({ createTitle }) => {
        console.log(createTitle)
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