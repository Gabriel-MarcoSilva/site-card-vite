import React, { useEffect, useState } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { baseURL } from "../../../assets/axios/config";

import "./style.css"

const FollowLine = ({ item, comecar }) => {

    const { register, handleSubmit } = useForm()

    const [voltas, setVoltas] = useState([])

    useEffect(() => {
        axios.get(`${baseURL}/volta`).then((res) => setVoltas(res.data))
    }, [comecar])

    const onSubmit = async (values) => {

        voltas.map((key) => {
            if (key.tempo) {
                axios.get(`${baseURL}/volta/${key._id}`).then(res => {
                    console.log(res.data)
                    if (res.data.comp1._id === item._id || res.data.comp1._id === item.comp1._id) {
                        if (res.data.tempo.tempo1 === "--") {
                            key.comp1.pontuacao = Number(res.data.tempo.tempo1)
                            axios.put(`${baseURL}/volta/${key._id}`, { comp1: key.comp1, tempo: { tempo1: values.tempo, tempo2: "--", tempo3: "--" } })
                        } else {
                            if (res.data.tempo.tempo2 === "--") {
                                if (Number(res.data.tempo.tempo1) < Number(values.tempo)) {
                                    key.comp1.pontuacao = Number(res.data.tempo.tempo1)
                                } else {
                                    key.comp1.pontuacao = Number(values.tempo)
                                }
                                axios.put(`${baseURL}/volta/${key._id}`, { comp1: key.comp1, tempo: { tempo1: res.data.tempo.tempo1, tempo2: values.tempo, tempo3: "--" } })
                            } else {
                                if (Number(res.data.tempo.tempo2) < Number(values.tempo)) {
                                    key.comp1.pontuacao = Number(res.data.tempo.tempo2)
                                } else {
                                    if (Number(res.data.tempo.tempo1) < Number(values.tempo)) {
                                        key.comp1.pontuacao = Number(res.data.tempo.tempo1)
                                    } else {
                                        key.comp1.pontuacao = Number(values.tempo)
                                    }
                                }
                                axios.put(`${baseURL}/volta/${key._id}`, { comp1: key.comp1, tempo: { tempo1: res.data.tempo.tempo1, tempo2: res.data.tempo.tempo2, tempo3: values.tempo } })
                            }

                        }
                        console.log(key.comp1)
    
                        axios.put(`${baseURL}/edit-competidor/${key.comp1._id}`, key.comp1).then(res => console.log(res.data))
                    }
                })
            } else {
                axios.get(`${baseURL}/volta/${key._id}`).then(res => {
                    if (res.data.comp1._id === item._id || res.data.comp1._id === item.comp1._id) {
                        axios.put(`${baseURL}/volta/${key._id}`, { comp1: key.comp1, tempo: { tempo1: values.tempo, tempo2: "--", tempo3: "--" } })
                    }
                })

            }
        })

        setVoltas([])
    }

    return (
        <section id="container-follow">

            <section className="pista">
                <img src="https://th.bing.com/th/id/OIP.OTSTDNhQ2wEJ2LOpftI84AHaEG?pid=ImgDet&rs=1" alt="" />

                <form onSubmit={handleSubmit(async (data) => await onSubmit(data))} id="ranking" >
                    <input type="text" name="tempo" placeholder="tempo percorrido"  {...register("tempo")} />
                    <button>salvar</button>
                </form>
            </section>

            <section id="info-follow">
                <section className="min-card" key={item._id ? item._id : item.comp1._id}>
                    <section className="header">
                        {/* <p>{item.ranking ? item.ranking : item.comp1.ranking}</p> */}
                        <h5>{item.nomeCompetidor ? item.nomeCompetidor : item.comp1.nomeCompetidor}</h5>
                    </section>

                    <section className="competidor">
                        {item.linkGif ? (
                            <div style={{ backgroundImage: `url(${item.linkGif})`, backgroundSize: "contain", width: "100%", height: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} > </div>
                        ) : (
                            <div style={{ backgroundImage: `url(${item.comp1.linkGif})`, backgroundSize: "contain", width: "100%", height: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} > </div>
                        )}
                    </section>
                    <section className="robo">
                        {item.linkRobo ? (
                            <img src={item.linkRobo} />
                        ) : (
                            <img src={item.comp1.linkRobo} />
                        )}
                    </section>
                    <section className="body">
                        <section className="content">
                            <p><b>Equipe:</b> <span>{item.equipe ? item.equipe : item.comp1.equipe}</span></p>
                            <p><b>Modalidade:</b> <span>{item.modalidade ? item.modalidade : item.comp1.modalidade}</span></p>
                            <p><b>Instituição:</b> <span>{item.instituicao ? item.instituicao : item.comp1.instituicao}</span></p>
                        </section>
                    </section>
                </section>

                <section id="container-imagem-robo">
                    <img src={item.nomeRobo} alt="" />
                </section>
            </section>
        </section>
    )
}

export default FollowLine