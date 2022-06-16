import '../styles/globals.css'
import Footer from './components/footer'
import Header from './components/header'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
