import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Form'
import Router from 'next/router'
import { useForm } from 'react-hook-form'


const { register, handleSubmit } = useForm();

const registerUser = async ({ email, password, name }) => {

    console.log(email, '\n', password, '\n', name)
}


export default function Register() {
    return (
        <div className={styles.container}>
            <Head>
                <title>register</title>
                <meta name="description" content="register user" />
            </Head>

            <main>
                <Link href="/">
                    home
                </Link>

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