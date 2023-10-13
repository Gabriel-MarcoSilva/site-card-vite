import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { baseURL } from "../../assets/axios/config"
import "./style.css"

const ListaVencedores = ({ souCad }) => {

    const { modalidade } = useParams()

    const [ranking, setRanking] = useState([])
    const [vitoria, setVitoria] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (modalidade.match("Follow Line")) {
            axios.get(`${baseURL}/volta`).then((res) => setRanking(res.data))
        } else if (modalidade.match("Mega")) {
            axios.get(`${baseURL}/round`).then((res) => setRanking(res.data))
        } else if (modalidade.match("Mini")) {
            axios.get(`${baseURL}/round-mini`).then((res) => setRanking(res.data))
        } else if (modalidade.match("Robocode")) {
            axios.get(`${baseURL}/round-code`).then((res) => setRanking(res.data))
        }
    }, [ranking.length === 0])

    useEffect(() => {
        if (modalidade.match("Mega")) {
            axios.get(`${baseURL}/vitoria`).then((res) => setVitoria(res.data))
        } else if (modalidade.match("Mini")) {
            axios.get(`${baseURL}/vitoria-mini`).then((res) => setVitoria(res.data))
        } else if (modalidade.match("Robocode")) {
            axios.get(`${baseURL}/vitoria-code`).then((res) => setVitoria(res.data))
        }
    }, [vitoria.length === 0])

    return (
        <>
            <h1 style={{ margin: "20px auto", textAlign: "center", color: "#fff", textDecoration: "underline" }}>
                Partidas Ateriores:
            </h1>
            <section className="resultado">
                <section style={{ borderRight: "2px solid #fff", padding: "5px", color: "#fff" }}>
                    {modalidade.match("Follow")? <p>Corredor</p> : <p>Partida</p> }
                    {ranking.map((key) => {
                        if (key.comp1) {
                            return (
                                <ul key={key._id} className="table" style={{ width: "auto" }}>
                                    <ol style={{ color: "#fff" }}>
                                        <span onClick={() => navigate(`/site-card-vite/${key.comp1._id}`)}> {key.comp1.nomeCompetidor} </span> 
                                        {modalidade.match("Follow") ? "" : <span onClick={() => navigate(`/site-card-vite/${key.comp2._id}`)}>VS  {key.comp2.nomeCompetidor} </span> }
                                        {souCad ? " | " + key._id : ""}
                                    </ol>
                                </ul>
                            )
                        }
                    })}
                </section>
                <section style={{ borderLeft: "2px solid #fff", padding: "10px" }}>
                    {modalidade.match("Follow") ? (
                        <section style={{color: "#fff"}}>
                            Tempo:
                            {ranking.map((key) => {
                                if (key.tempo) {
                                    return (
                                        <ul className="table" style={{ width: "auto" }}>
                                            <ol style={{ color: "#fff", display: "flex", justifyContent: "space-between", width: "100%" }}>
                                                <p> {key.tempo.tempo1 !== "--" ? key.tempo.tempo1 < 100 ? "0:" + key.tempo.tempo1 : Math.floor(key.tempo.tempo1 / 100) + ":" + key.tempo.tempo1 % 100 : "--"} </p>
                                                <p> {key.tempo.tempo2 !== "--" ? key.tempo.tempo2 < 100 ? "0:" + key.tempo.tempo2 : Math.floor(key.tempo.tempo2 / 100) + ":" + key.tempo.tempo2 % 100 : "--"}</p>
                                                <p> {key.tempo.tempo3 !== "--" ? key.tempo.tempo3 < 100 ? "0:" + key.tempo.tempo3 : Math.floor(key.tempo.tempo3 / 100) + ":" + key.tempo.tempo3 % 100 : "--"}</p>
                                            </ol>
                                        </ul>
                                    )
                                }
                            })}
                        </section>
                    ) : (
                        <section style={{color: "#fff"}}>
                            Vencedor:
                            {vitoria.map((key) => {

                                return (
                                    <ul className="table" style={{ width: "auto" }}>
                                        <ol style={{ color: "#fff" }}>
                                            {key.comp.nomeCompetidor}
                                        </ol>
                                    </ul>
                                )
                            })}
                        </section>
                    )}
                </section>
            </section>
        </>
    )
}

export default ListaVencedores