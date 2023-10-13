import React, { useEffect, useState } from "react";

import "./style.css"
import axios from "axios";
import { baseURL } from "../../../assets/axios/config";

const MegaSumo = ({ batalha, comecar, reboot, fim }) => {

    let id1, id2

    if (batalha.length === 2) {
        id1 = batalha[0]._id
        id2 = batalha[1]._id
    }

    const [round, setRound] = useState([])
    const [vitoria, setVitoria] = useState("")
    const [vencedor, setVencedor] = useState([])

    const vitorias = (id) => {

        const newRound = [
            ...round,
            {
                id
            }
        ]

        setRound(newRound)
    }

    useEffect(() => {
        let cont1 = 0, cont2 = 0;
        round.map((item) => {
            item.id === id1 ? cont1++ : cont2++
        })

        if (round.length >= 2) {
            cont1 > cont2 ? setVitoria(id1) : (cont2 === cont1 ? setVitoria("empate") : setVitoria(id2))
        }

    }, [round])

    useEffect(() => {
        if (vitoria !== "" && vitoria != "empate") {
            axios.get(`${baseURL}/competidor/${vitoria}`).then((res) => {
                axios.post(`${baseURL}/vitoria`, { comp: res.data, acabou: false }).then((res) => {
                    fim({ _id: res.data._id, comp: res.data.comp, acabou: false })
                }).catch((err) => console.log(err))
                setVencedor(res.data)
            })
        }
    }, [vitoria !== "" && vitoria !== "empate"])

    if (reboot) {
        setVencedor([])
        setVitoria("")
    }

    return (
        <>
            {(vitoria !== "empate" && vitoria !== "") ? (
                <section id="container-sumo" key={vencedor._id}>
                    <section className="min-card" >
                        <section className="header">
                            {/* <p>{vencedor.ranking}</p> */}
                            <h5>{vencedor.nomeCompetidor}</h5>
                        </section>

                        <section className="competidor">
                            <div style={{ backgroundImage: `url(${vencedor.linkGif})`, backgroundSize: "contain", width: "100%", height: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} > </div>
                        </section>
                        <section className="robo">
                            <img src={vencedor.linkRobo} />
                        </section>
                        <section className="body">
                            <section className="content">
                                <p><b>Equipe:</b> <span>{vencedor.equipe}</span></p>
                                <p><b>Modalidade:</b> <span>{vencedor.modalidade}</span></p>
                                <p><b>Instituição:</b> <span>{vencedor.instituicao}</span></p>
                            </section>
                        </section>
                    </section>
                </section>
            ) : (
                batalha.map((item) => {
                    return (
                        <section id="container-sumo" key={item._id}>
                            <section className="min-card" >
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
                            {!comecar ? "" : (
                                <section>
                                    <button onClick={() => vitorias(item._id)}>vitoria</button>
                                </section>
                            )}
                        </section>
                    )
                })
            )}

        </>
    )
}

export default MegaSumo