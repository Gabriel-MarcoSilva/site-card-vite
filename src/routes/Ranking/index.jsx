import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../assets/axios/config";

import "./style.css"

const Ranking = () => {

    const [competidores, setCompetidores] = useState([])

    const [follow, setFollow] = useState([])
    const [mega, setMega] = useState([])
    const [mini, setMini] = useState([])
    const [robocode, setRobocode] = useState([])

    useEffect(() => {
        axios.get(`${baseURL}/competidor`).then(res => setCompetidores(res.data))
    }, [])
    // Mostra o array ordenado em ordem crescente

    useEffect(() => {

        setMega(competidores.filter((e) => e.modalidade.match("Mega")))
        setFollow(competidores.filter((e) => e.modalidade.match("Follow")))
        setMini(competidores.filter((e) => e.modalidade.match("Mini")))
        setRobocode(competidores.filter((e) => e.modalidade.match("Robocode")))

    }, [competidores.length < 1])

    const sortDataAscending = (field, modalidade) => {

        if (modalidade.match("follow")) {
            const sortedData = [...follow];
            sortedData.sort((a, b) => {
                return a[field] - b[field];
            });
            setFollow(sortedData);
            ordenarRanking(follow, true)
        } else if (modalidade.match("mega")) {
            const sortedData = [...mega];
            sortedData.sort((a, b) => {
                return b[field] - a[field];
            });

            setMega(sortedData);
            ordenarRanking(mega, false)
        } else if (modalidade.match("mini")) {
            const sortedData = [...mini];
            sortedData.sort((a, b) => {
                return b[field] - a[field];
            });

            setMini(sortedData);
            ordenarRanking(mini, false)
        } else if (modalidade.match("robocode")) {
            const sortedData = [...robocode];
            sortedData.sort((a, b) => {
                return b[field] - a[field];
            });

            setRobocode(sortedData);
            ordenarRanking(robocode, false)
        }
    };

    const ordenarRanking = (item, mod) =>{
        if(mod){
            let cont = item.length + 1 
            item.map((key) =>{
                cont --
                key.ranking = cont.toString()
                console.log(key.ranking)
                axios.put(`${baseURL}/edit-competidor/${key._id}`, key).then((res) => console.log(res.data))
            })
        }else{
            let cont = 0
            item.map((key) =>{
                cont ++
                key.ranking = cont.toString()
                console.log(key.ranking)
                axios.put(`${baseURL}/edit-competidor/${key._id}`, key).then((res) => console.log(res.data))
            })
        }
    }

    useEffect(() => {
        sortDataAscending('pontuacao', "follow")
    }, [follow.length < 1])
    useEffect(() => {
        sortDataAscending('pontuacao', "mega")
    }, [mega.length < 1])
    useEffect(() => {
        sortDataAscending('pontuacao', "mini")
    }, [mini.length < 1])
    useEffect(() => {
        sortDataAscending('pontuacao', "robocode")
    }, [robocode.length < 1])

    let contFollow = 0, contMega = 0, contMini = 0, contCode = 0

    return (
        <section id="table-ranking">
            <section>
                <h2>Follow:</h2>
                <hr />
                {follow.map((item) => {
                    contFollow++
                    return (
                        <>
                            <section key={item._id} className="itens-ranking">
                                <p style={{ width: "10%", textAlign: "center" }}>{contFollow}</p>
                                <p style={{ width: "35%" }}>{item.nomeRobo} </p>
                                <p style={{ width: "35%" }}>{item.equipe} </p>
                                {item.modalidade.match("Follow")
                                    ? (<p style={{ width: "20%", textAlign: "center" }}>
                                        {
                                            item.pontuacao
                                                ? (item.pontuacao < 100 ? "0:" + item.pontuacao : Math.floor(item.pontuacao / 100) + ":" + item.pontuacao % 100)
                                                : "0:00"
                                        }
                                    </p>)
                                    : (<p style={{ width: "20%", textAlign: "center" }}>{item.pontuacao ? item.pontuacao : 0}</p>)}
                            </section>
                            <hr style={{ width: "95%", margin: "5px auto" }} />

                        </>
                    )
                })}
            </section>
            <br />
            <section>
                <h2>Mega:</h2>
                <hr />
                {mega.map((item) => {
                    contMega++
                    return (
                        <>
                            <section key={item._id} className="itens-ranking">
                                <p style={{ width: "10%", textAlign: "center" }}>{contMega}</p>
                                <p style={{ width: "35%" }}>{item.nomeRobo} </p>
                                <p style={{ width: "35%" }}>{item.equipe} </p>
                                <p style={{ width: "20%", textAlign: "center" }}>{item.pontuacao ? item.pontuacao : 0}</p>
                            </section>
                            <hr style={{ width: "95%", margin: "5px auto" }} />
                        </>
                    )
                })}
            </section>
            <br />
            <section>
                <h2>Mini:</h2>
                <hr />
                {mini.map((item) => {
                    contMini++
                    return (
                        <>
                            <section key={item._id} className="itens-ranking">
                                <p style={{ width: "10%", textAlign: "center" }}>{contMini}</p>
                                <p style={{ width: "35%" }}>{item.nomeRobo} </p>
                                <p style={{ width: "35%" }}>{item.equipe} </p>
                                <p style={{ width: "20%", textAlign: "center" }}>{item.pontuacao ? item.pontuacao : 0}</p>
                            </section>
                            <hr style={{ width: "95%", margin: "5px auto" }} />
                        </>

                    )
                })}
            </section>
            <br />
            <section>
                <h2>Robocode:</h2>
                <hr />
                {robocode.map((item) => {
                    contCode++
                    return (
                        <>
                            <section key={item._id} className="itens-ranking">
                                <p style={{ width: "10%", textAlign: "center" }}>{contCode}</p>
                                <p style={{ width: "35%" }}>{item.nomeRobo} </p>
                                <p style={{ width: "35%" }}>{item.equipe} </p>
                                <p style={{ width: "20%", textAlign: "center" }}>{item.pontuacao ? item.pontuacao : 0}</p>
                            </section>
                            <hr style={{ width: "95%", margin: "5px auto" }} />
                        </>
                    )
                })}
            </section>
        </section>
    )
}

export default Ranking