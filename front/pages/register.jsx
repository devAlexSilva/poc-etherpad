import Head from 'next/head'
import styles from '../styles/Form.module.css'
import Router from 'next/router'
import { BackApi } from './api/axios'
import { useForm } from 'react-hook-form'


export default function Register() {

    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true })
    const api = new BackApi().backEndApi

    const registerUser = async ({ email, password, name }) => {
        const result = await api.post('/create', {
            email,
            password,
            name
        })

        console.clear()
        console.log(result)
        await Router.push('/')

    }


    return (
        <div className={styles.container}>
            <Head>
                <title>poc-register</title>
                <meta name="description" content="register user" />
            </Head>

            <main>
              <form className={styles.form} onSubmit={handleSubmit(registerUser)}>

                    <div className={styles.form_box}>

                        <div className={styles.inputField}>
                            <label htmlFor="name">
                                Nome
                            </label>
                            <input
                                {...register('name')}
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Jhon doe"
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="email-address">
                                Email
                            </label>
                            <input
                                {...register('email')}
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="password">
                                Senha
                            </label>
                            <input
                                {...register('password')}
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <button>
                        Registrar
                    </button>
                </form>
            </main>
        </div>
    )
}