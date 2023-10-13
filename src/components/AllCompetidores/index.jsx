import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { baseURL } from "../../assets/axios/config"

const Ranking = () => {

    const { modalidade } = useParams()

    const [ranking, setRanking] = useState([])

    useEffect(() => {
        if (modalidade.match("Follow Line")) {
            axios.get(`${baseURL}/vitoria`).then((res) => setRanking(res.data))
        } else if (modalidade.match("Mega")) {
            axios.get(`${baseURL}/round`).then((res) => setRanking(res.data))
            console.log("ranking")
            console.log(ranking)
        } else if (modalidade.match("Mini")) {

        } else if (modalidade.match("Robocode")) {

        }
    }, [ranking.length === 0])

    return (
        <>
            {ranking.map((key) => {
                return (
                    <section key={key._id} id="card">
                        <section className="header">
                            <p>{key.ranking}</p>
                            <h5>{key.nomeCompetidor}</h5>
                        </section>

                        <section className="competidor">
                            <div style={{ backgroundImage: `url(${key.linkGif})`, backgroundSize: "contain", width: "100%", height: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} > </div>
                        </section>
                        <section className="robo">
                            <img src={key.linkRobo} />
                        </section>
                        <section className="body">
                            <section className="content">
                                <p><b>Equipe:</b> <span>{key.equipe}</span></p>
                                <p><b>Modalidade:</b> <span>{key.modalidade}</span></p>
                                <p><b>Instituição:</b> <span>{key.instituicao}</span></p>
                            </section>
                        </section>
                    </section>
                )
            })}
        </>
    )
}

export default Ranking