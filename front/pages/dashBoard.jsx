import styles from "../styles/Form.module.css";
import { BackApi, EtherApi } from "./api/axios";
import { useCallback, useRef, useState } from "react";

const secret = process.env.NEXT_PUBLIC_SECRET;

export default function DashBoard({ data, token }) {
  const textTitleRef = useRef();
  const [email, setEmail] = useState("");
  const [padList, setPadList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(0);
  const api = new EtherApi().etherpadApi;
  const backApi = new BackApi(token).backEndApi;

  function validSession() {
    let time = Math.floor(new Date().getTime() / 1000);
    time += 60 * 120; // 60 seconds * 120 = 2 hours
    return time;
  }

  async function createPad(e) {
    const title = e.current.value;

    const { data } = await backApi.post("/pad", {
      name: title,
    });

    window.location = `http://localhost:9001/p/${data.nameHash}`;
  }
  /*
  function accessPad(e) {
    const title = e.current.value;
    window.location = `http://localhost:9001/p/${title}`;
  }
*/
  async function listPads() {
    const info = await backApi.get("/pad");
    console.log(info.data);
    setPadList(info.data);
  }

  async function deletePad(id) {
    console.log(id);
    await backApi.delete(`/pad/${id}`);
    await listPads();
  }

  function sharePad(id) {
    console.log(id);
    setModalIsOpen(id);
  }

  async function addUserInPad(email, padId) {
    const { data } = await backApi.post(`/user`, {email});
    if(!data) return alert("usuario não encontrado")

    const userId = data.id
    const subscribe = await backApi.post(`/pad/sub`, {userId, padId})

    console.log(subscribe)
  }
  return (
    <div>
      <main className={styles.container}>
        <div>
          <h1>nome: {data.name}</h1>
          <p>id: {data.id}</p>
        </div>
        <div>
          <h2>Abrir o Etherpad</h2>
        </div>

        <nav className={styles.nav}>
          <button>
            <a href="http://localhost:9001" target="_blank">
              pad
            </a>
          </button>
          <button onClick={listPads}>Listar Pads</button>
        </nav>
        <input type="text" ref={textTitleRef} />
        <button onClick={() => createPad(textTitleRef)}>criar pad</button>
        {/*} <button onClick={() => accessPad(textTitleRef)}>acessar um pad</button> */}
      </main>
      <aside className={styles.aside}>
        <div>
          <h2>criados pelo usuario:</h2>
          {padList?.[0]
            ? padList.map((pad) => {
                return (
                  <ul key={pad.id} className={styles.ul}>
                    <li>id do criador: {pad.creatorUser}</li>
                    <li>
                      nome do pad: <strong>{pad.name}</strong>
                    </li>
                    <li>hash do pad: {pad.nameHash}</li>
                    <li>id do pad: {pad.id}</li>
                    <a
                      href={`http://localhost:9001/p/${pad.nameHash}`}
                      target="_blank"
                    >
                      <button> abrir pad </button>
                    </a>
                    <button onClick={() => deletePad(pad.id)}> delete </button>
                    <button onClick={() => sharePad(pad.id)}>
                      compartilhar
                    </button>

                    {modalIsOpen == pad.id ? (
                      <div>
                        <input
                          type="text"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="adicionar usuario pelo email"
                        />
                        <button onClick={() => addUserInPad(email, pad.id)}> + </button>
                      </div>
                    ) : null}
                  </ul>
                );
              })
            : null}
        </div>
        <div>
          <h2>compartilhados comigo: </h2>
        </div>
      </aside>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const token = ctx.req.cookies.user;

  if (!token)
    return {
      redirect: {
        destination: "/",
      },
    };

  const backApi = new BackApi(token).backEndApi;

  const { data } = await backApi.get("/user");

  return {
    props: { data, token },
  };
}

/*
*to do

[x] buscar usuario por email

[] retornar o usuario com a opção de adicionar ao pad

[] assinar ao subOfPad do pad com o id do usuario adicionado

[] exibir os pads compartilhados com base no subOfPad
*/
