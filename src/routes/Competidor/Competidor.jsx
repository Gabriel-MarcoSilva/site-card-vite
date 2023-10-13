import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { baseURL } from "../../assets/axios/config";

import "./style.css"
import QRCode from "react-qr-code";

const Competidor = () => {

    const { id } = useParams()

    const [item, setItem] = useState({})

    useEffect(() => {
        axios.get(`${baseURL}/competidor/${id}`).then((res) => {
            setItem(res.data)
        })
    }, [])

    return (
        <div className="container-card container-card-comp">
            <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>{item.nomeCompetidor}</h3>
                <section id="competidor" style={{ width: "50vh" }}>
                    <img src={item.linkGif} alt="" />
                    <section id="info-competidor">
                        <p><span>Instituição: </span>{item.instituicao}</p>
                        <hr />
                        <p><span>Ranking: </span>{item.ranking}</p>
                        <hr />
                        <p><span>{item.modalidade == "Follow Line" ? "Melhor Tempo: " : "Pontuação"}</span>{item.modalidade == "Follow Line" ? Math.floor(item.pontuacao / 100) + ":" + item.pontuacao % 100 + "s" : item.pontuacao}</p>
                        <hr />
                        <p><span>Modalidade: </span>{item.modalidade}</p>
                    </section>
                </section>
            </section>

            <hr />

            <section id="competidor" className="equipe">

                <section>
                    <h3 style={{ fontFamily: "sans-serif", fontWeight: "normal" }}> <span style={{ fontWeight: "bold" }}>Equipe:</span>  {item.equipe}</h3>
                    {item.linkGifEquipe ? <img src={item.linkGifEquipe} /> : ""}
                    {item.linkRobo ? <img src={item.linkRobo} /> : ""}
                </section>

                <section>
                    <h3 style={{ fontFamily: "sans-serif", fontWeight: "normal" }}> <span style={{ fontWeight: "bold" }}>Robô:</span>  {item.nomeRobo}</h3>
                    {item.linkRobo ? <img src={item.linkRobo} /> : ""}
                </section>

            </section>

            <hr />
            {/*
            <section id="competidor">
                
            </section>
*/}
            <hr />

            <section className="qrcodes">
                <section id="competidor">
                    <h3 style={{ fontFamily: "sans-serif", fontWeight: "normal" }}> <span style={{ fontWeight: "bold" }}>meu card:</span></h3>
                    <QRCode value={`${baseURL}/${id}`} id="qr-code-comp" />
                </section>

                <section id="competidor">
                    <h3 style={{ fontFamily: "sans-serif", fontWeight: "normal" }}> <span style={{ fontWeight: "bold" }}>Instagram:</span>  </h3>
                    <QRCode value={`${item.instagram}`} id="qr-code-comp" />
                </section>

            </section>

        </div>
    )
}

export default Competidor;