import React from "react";

import "./style.css"

const FollowLineTelao = ({ item }) => {

    return (
        <section className="container-follow-espec">

            <section className="espectador" style={{ justifyContent: "space-around" }}>
                <img src="https://th.bing.com/th/id/OIP.OTSTDNhQ2wEJ2LOpftI84AHaEG?pid=ImgDet&rs=1" alt="" />
                <div style={{ color: "#fff" }}>
                    { 
                        item.tempo.tempo2 === "--" 
                            ? (item.tempo.tempo1 < 100 ?  "0:" + item.tempo.tempo1 : Math.floor(item.tempo.tempo1 / 100) + ":" + item.tempo.tempo1 % 100)
                            : (item.tempo.tempo3 === '--') 
                                ? (item.tempo.tempo2 < 100 ?  "0:" + item.tempo.tempo2 : Math.floor(item.tempo.tempo2 / 100) + ":" + item.tempo.tempo2 % 100)
                                : (item.tempo.tempo3 < 100 ?  "0:" + item.tempo.tempo3 : Math.floor(item.tempo.tempo3 / 100) + ":" + item.tempo.tempo3 % 100)
                    } s </div>
            </section>

            <section id="info-follow-espec">
                <section className="min-card" key={item.comp1._id}>
                    <section className="header">
                        <p>{item.comp1.ranking}</p>
                        <h5 style={{fontSize:"8pt"}}>{item.comp1.nomeCompetidor}</h5>
                    </section>

                    <section className="competidor">
                        <div style={{ backgroundImage: `url(${item.comp1.linkGif})`, backgroundSize: "contain", width: "100%", height: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} > </div>
                    </section>
                    <section className="robo">
                        <img src={item.comp1.linkRobo} />
                    </section>
                    <section className="body">
                        <section className="content">
                            <p><b>Equipe:</b> <span>{item.comp1.equipe}</span></p>
                            <p><b>Modalidade:</b> <span>{item.comp1.modalidade}</span></p>
                            <p><b>Instituição:</b> <span>{item.comp1.instituicao}</span></p>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default FollowLineTelao