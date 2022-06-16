import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { BackApi } from './api/axios'
import { setCookie } from 'nookies'


export default function Register() {

    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true })
    const api = new BackApi().backEndApi

    const login = async ({ email, password }) => {
        try {
            const result = await api.post('/login', {
                email,
                password
            })

            if (result.status == 200) {
                const token = result.data
                setCookie(null, 'user', token, {
                    maxAge: 60 * 30 // 60s*30 = 30 minutes
                })
                await Router.push('/dashBoard')
            }
            else {
                alert('tente novamente')
            }
        }
        catch (err) {
            alert('tente novamente')
        }
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>poc-login</title>
                <meta name="description" content="log in on account" />
            </Head>

            <main>
                <Link href="/">
                    home
                </Link>

                <form className={styles.form} onSubmit={handleSubmit(login)}>

                    <div className={styles.form_box}>
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
                        Entrar
                    </button>
                </form>
            </main>
        </div>
    )
}