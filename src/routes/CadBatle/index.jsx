import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../assets/axios/config";

import "./style.css"
import FollowLine from "../Modalidades/FollowLine";
import MegaSumo from "../Modalidades/MegaSumo";
import ListaVencedores from "../../components/ListaVencedores";
import MiniSumo from "../Modalidades/MiniSumo";
import Robocode from "../Modalidades/Robocode";
import { useForm } from "react-hook-form";

const CadBatle = () => {
    const { modalidade } = useParams()

    const [competidores, setCompetidores] = useState([])

    const [batalha, setBatalha] = useState([])

    const [comecar, setComecar] = useState(false)

    const [reboot, setReboot] = useState(false)

    const [vitoria, setVitoria] = useState([])

    const navigate = useNavigate()

    const { register, handleSubmit } = useForm()

    const fim = (item) => {
        !item.comp.pontuacao ? item.comp.pontuacao = 1 : item.comp.pontuacao += 1
        axios.put(`${baseURL}/edit-competidor/${item.comp._id}`, item.comp)
        setVitoria(item)
    }

    useEffect(() => {
        axios.get(`${baseURL}/competidor`).then((res) => setCompetidores(res.data))
    }, [])

    const escolherCompetidores = (item) => {

        if (modalidade != "Follow Line" & batalha.length < 2) {
            if (batalha[0]) {
                if (batalha[0]._id !== item._id) {
                    const newBatle = [
                        ...batalha,
                        item
                    ]
                    setBatalha(newBatle)
                }
            }
            if (batalha.length === 0) {
                const newBatle = [
                    ...batalha,
                    item
                ]
                setBatalha(newBatle)
            }
        } else {
            setBatalha([item])
        }
    }

    const fight = () => {
        if (batalha.length === 1) {
            batalha.map((item) => {
                axios.post(`${baseURL}/volta`, { comp1: batalha[0], tempo:{tempo1:"--", tempo2:"--", tempo3:"--"} })
                console.log("Corrida do robô: " + item.nomeRobo)
            })
        } else if (batalha.length === 2) {

            if (modalidade.match("Mega")) {
                axios.post(`${baseURL}/round`, { comp1: batalha[0], comp2: batalha[1] })
            }

            else if (modalidade.match("Mini")) {
                axios.post(`${baseURL}/round-mini`, { comp1: batalha[0], comp2: batalha[1] })
            }

            else if (modalidade.match("Robocode")) {
                axios.post(`${baseURL}/round-code`, { comp1: batalha[0], comp2: batalha[1] })
            }

            console.log("batalha entre: " + batalha[0].nomeRobo + " VS " + batalha[1].nomeRobo)
        }
        setComecar(true)
    }

    const removerCompetidores = () => {
        setBatalha([])
        setReboot(false)
    }

    const novaPartida = () =>{

        vitoria.acabou = true

        if (modalidade.match("Mega")) {
            axios.put(`${baseURL}/edit-vitoria/${vitoria._id}`, vitoria)
        } else if (modalidade.match("Mini")) {
            axios.put(`${baseURL}/edit-vitoria-mini/${vitoria._id}`, vitoria)
        } else if (modalidade.match("Robocode")) {
            axios.put(`${baseURL}/edit-vitoria-code/${vitoria._id}`, vitoria)
        }

        navigate(`/site-card-vite/batle/${modalidade}/cadastrar`)
    }

    const newVolta = () => {
        setComecar(!comecar)
        axios.get(`${baseURL}/volta`).then((res) => {
            res.data.map((item) => {
                if (batalha[0]._id === item.comp1._id || batalha[0].comp1._id === item.comp1._id) {
                    setBatalha([item])
                }
            })
        })
    }

    const onSubmit = async (values) => {
        if(modalidade.match("Follow")){
            axios.get(`${baseURL}/volta/${values.idPartida}`).then((res) => escolherCompetidores(res.data))
        }
    }

    return (
        <>
            <section className="arena">
                {(batalha.length < 3 && modalidade !== "Follow Line") ? ( //chamar cada compoente modalidade pra ficar uma melhor visualização, visto que serão itens diferentes
                    <>
                        {modalidade.match("Mega") ? <MegaSumo batalha={batalha} comecar={comecar} reboot={reboot} fim={fim} /> : ""}
                        {modalidade.match("Mini") ? <MiniSumo batalha={batalha} comecar={comecar} reboot={reboot} fim={fim} /> : ""}
                        {modalidade.match("Robocode") ? <Robocode batalha={batalha} comecar={comecar} reboot={reboot} fim={fim} /> : ""}
                    </>
                ) : ((modalidade === "Follow Line" && batalha.length === 1) ? (
                    batalha.map((item) => {
                        return (
                            <FollowLine key={item._id} item={item} comecar={comecar} />
                        )
                    })) : "")}
            </section>

            <section style={{ width: "100vw", display: "flex", alignItems: "center", justifyContent: "space-evenly", margin: "20px auto 0" }}>
                <button onClick={() => fight()} >Começar</button>
                {modalidade === "Follow Line" ? <button onClick={() => newVolta()} >Proxima Volta</button> : <button onClick={() => removerCompetidores()} >reiniciar</button>}
                {modalidade === "Follow Line" ? <button onClick={() => newVolta()} >Proxima Volta</button> : <button onClick={() => novaPartida()} >nova Partida</button>}
            </section>

            <section style={{ width: "100vw", display: "flex", alignItems: "center", justifyContent: "space-evenly", margin: "20px auto 0" }}>
                <form onSubmit={handleSubmit(async (data) => await onSubmit(data))} id="recPartida" >
                    Recuperar partida
                    <input type="text" name="idPartida" placeholder="id partida"  {...register("idPartida")} />
                    <button>salvar</button>
                </form>
            </section>

            <section id="continer-cards-batle">
                {competidores.map((item) => {
                    if (item.modalidade === modalidade) {
                        return (
                            <section className="min-card" key={item._id} onClick={() => escolherCompetidores(item)}>
                                <section className="header">
                                    <p>{item.ranking}</p>
                                    <h5>{item.nomeCompetidor}</h5>
                                </section>

                                <section className="competidor">
                                    <div style={{ backgroundImage: `url(${item.linkGif})`, backgroundSize: "contain", width: "100%", height: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} > </div>
                                </section>
                                <section className="robo">
                                    <img src={item.linkRobo} />
                                </section>
                                <section className="body">
                                    <section className="content">
                                        <p><b>Equipe:</b> <span>{item.equipe}</span></p>
                                        <p><b>Modalidade:</b> <span>{item.modalidade}</span></p>
                                        <p><b>Instituição:</b> <span>{item.instituicao}</span></p>
                                    </section>
                                </section>
                            </section>
                        )
                    }
                })}
            </section>

            <ListaVencedores souCad={true} />
        </>
    )
}

export default CadBatle