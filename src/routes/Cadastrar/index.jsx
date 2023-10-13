import React, { useState } from "react"
import QrCode from '../../components/QrCode/QrCode'

import blogFetch from "../../assets/axios/config"
import { useForm } from "react-hook-form"

import "./style.css"

const Cadastrar = () => {

    const { register, handleSubmit } = useForm()

    const [id, setId] = useState("")

    const onSubmit = async (values) => {
        values.ranking = 0
        values.pontuacao = 0
        await blogFetch.post("/cad-competidor", values).then((res) => setId(res.data._id))
        // values.linkQR = `http://localhost:4000/site-card-vite/${id}`
    }

    return (
        <div id="container-form">
            <form onSubmit={handleSubmit(async (data) => await onSubmit(data))}>

                <section className="item-form">
                    <label htmlFor="">
                        Nome Competidor
                    </label>
                    <input required type="text" name="nomeCompetidor" placeholder="Nome do competidor" {...register("nomeCompetidor")} />
                </section>

                <section className="item-form">
                    <label htmlFor="">
                        Instagram
                    </label>
                    <input required type="text" name="instagram" placeholder="instagram" {...register("instagram")} />
                </section>

                <section className="item-form">
                    <label htmlFor="">
                        Equipe
                    </label>
                    <input required type="text" name="equipe" placeholder="Equipe" {...register("equipe")} />
                </section>

                <section className="item-form">
                    <label htmlFor="">
                        Link Equipe
                    </label>
                    <input required type="text" name="linkGifEquipe" placeholder="linkGifEquipe" {...register("linkGifEquipe")} />
                </section>

                <section className="item-form">
                    <label htmlFor="">
                        Modalidade
                    </label>
                    <input required type="text" name="modalidade" placeholder="Modalidade" {...register("modalidade")} />
                </section>

                <section className="item-form">
                    <label htmlFor="">
                        Instituição
                    </label>
                    <input required type="text" name="instituicao" placeholder="Instituição" {...register("instituicao")} />
                </section>

                <section className="item-form">
                    <label htmlFor="">
                        Nome do Robô
                    </label>
                    <input required type="text" name="nomeRobo" placeholder="Nome do Robô" {...register("nomeRobo")} />
                </section>

                <section className="item-form">
                    <label htmlFor="">
                        Link Gif
                    </label>
                    <input required type="text" name="linkGif" placeholder="link gif" {...register("linkGif")} />
                </section>

                <section className="item-form">
                    <label htmlFor="">
                        Link foto robô
                    </label>
                    <input required type="text" name="linkRobo" placeholder="link robô" {...register("linkRobo")} />
                </section>

                <section className="containe-button">
                    <button className="button">Enviar</button>
                </section>
            </form>

            {
                id !== "" ? <QrCode id={id} /> : ""
            }

        </div>
    )
}

export default Cadastrar