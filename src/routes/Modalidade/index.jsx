import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../assets/axios/config";

import "./style.css"
import MegaSumoTelao from "../Modalidades/MegaSumoTelao";
import FollowLineTelao from "../Modalidades/FollowLineTelao";
import ListaVencedores from "../../components/ListaVencedores";
import MiniSumoTelao from "../Modalidades/MiniSumoTelao";
import RobocodeTelao from "../Modalidades/RobocodeTelao";

const Modalidade = () => {
    const { modalidade } = useParams()

    const [competidores, setCompetidores] = useState([])

    const [vencedor, setVencedor] = useState([])


    useEffect(() => {

        if (modalidade !== "Follow Line") {
            if(modalidade.match("Mega")){
                axios.get(`${baseURL}/round`).then((res) => {
                    newComp(res.data.pop())
                })
            }else if( modalidade.match("Mini")){
                axios.get(`${baseURL}/round-mini`).then((res) => {
                    newComp(res.data.pop())
                })
            }else if( modalidade.match("code")){
                axios.get(`${baseURL}/round-code`).then((res) => {
                    newComp(res.data.pop())
                })
            }
        } else {
            axios.get(`${baseURL}/volta`).then((res) => {
                newComp(res.data.pop())
            })
        }

    }, [])

    const newComp = (item) => {

        if(item){
            if (modalidade !== "Follow Line") {
                const Comp = [
                    ...competidores,
                    item.comp1,
                    item.comp2
                ]
                setCompetidores(Comp)
            } else {
                setCompetidores([item])
            }
        }

    }

    useEffect(() => {
        if (modalidade !== "Follow Line") {
            if(modalidade.match("Mega")){
                axios.get(`${baseURL}/vitoria`).then((res) => newVenc(res.data.pop()))
            } else if(modalidade.match("Mini")){
                axios.get(`${baseURL}/vitoria-mini`).then((res) => newVenc(res.data.pop()))
            }else if(modalidade.match("code")){
                axios.get(`${baseURL}/vitoria-code`).then((res) => newVenc(res.data.pop()))
            }
        }
    }, [])

    const newVenc = (item) => {

        const Venc = [
            ...vencedor,
            item
        ]

        setVencedor(Venc)
    }

    return (
        <>
            <section id="arena" className="arena-espec">
                {(modalidade !== "Follow Line") ? (
                    <>
                        {modalidade.match("Mega") ? <MegaSumoTelao competidores={competidores} vencedor={vencedor} /> : ""}
                        {modalidade.match("Mini") ? <MiniSumoTelao competidores={competidores} vencedor={vencedor}/> : ""}
                        {modalidade.match("Robocode") ? <RobocodeTelao competidores={competidores} vencedor={vencedor} /> : ""}
                    </>
                ) : ((modalidade === "Follow Line") ? (
                    competidores.map((item) => {
                        return (
                            <FollowLineTelao key={item._id} item={item} />
                        )
                    })) : "")}
            </section>

            <ListaVencedores souCad={false}/>
        </>
    )
}

export default Modalidade