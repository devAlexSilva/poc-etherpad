import styles from "../styles/Form.module.css";
import { BackApi, EtherApi } from "./api/axios";
import { useCallback, useRef, useState } from "react";

const secret = process.env.NEXT_PUBLIC_SECRET;

export default function DashBoard({ data, token }) {
  const textTitle = useRef();
  const [padList, setPadList] = useState([]);
  const api = new EtherApi().etherpadApi;
  const backApi = new BackApi(token).backEndApi;

  function validSession() {
    let time = Math.floor(new Date().getTime() / 1000);
    time += 60 * 120; // 60 seconds * 120 = 2 hours
    return time;
  }

  async function createPad(e) {
    const title = e.current.value;

    const newPad = await backApi.post("/pad", {
      name: title,
    });
    console.log(newPad.data);

    window.location = `http://localhost:9001/p/${title}`;
  }

  function subscribePad(e) {
    const title = e.current.value;
    window.location = `http://localhost:9001/p/${title}`;
  }

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

  return (
    <div>
      <div>
        <h1>nome: {data.name}</h1>
        <p>id: {data.id}</p>
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
          <button onClick={listPads}>Listar Pads</button>
        </nav>

        <input type="text" ref={textTitle} />
        <button onClick={() => createPad(textTitle)}>criar pad</button>
        <button onClick={() => subscribePad(textTitle)}>acessar um pad</button>
      </main>
      {padList?.[0]
        ? padList.map((pad) => {
            return (
              <ul key={pad.id}>
                <li>id do criador: {pad.creatorUser}</li>
                <li>nome do pad: {pad.name}</li>
                <li>hash do pad: {pad.nameHash}</li>
                <li>id do pad: {pad.id}</li>
                <button onClick={() => deletePad(pad.id)}> delete </button>
                <a href={`http://localhost:9001/p/${pad.name}`} target="_blank">
                  <button> abrir pad </button>
                </a>
              </ul>
            );
          })
        : null}
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
