
import axios from "axios"
import "./style.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../assets/axios/config";

const Home = () => {

    const [competidores, setCompetidores] = useState([])

    const [follow, setFollow] = useState([])
    const [mega, setMega] = useState([])
    const [mini, setMini] = useState([])
    const [robocode, setRobocode] = useState([])

    useEffect(() => {
        axios.get(`${baseURL}/competidor`).then(res => setCompetidores(res.data))
    }, [])
    // Mostra o array ordenado em ordem crescente

    const navigate = useNavigate()

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
        } else if (modalidade.match("mega")) {
            const sortedData = [...mega];
            sortedData.sort((a, b) => {
                return b[field] - a[field];
            });

            setMega(sortedData);
        } else if (modalidade.match("mini")) {
            const sortedData = [...mini];
            sortedData.sort((a, b) => {
                return b[field] - a[field];
            });

            setMini(sortedData);
        } else if (modalidade.match("robocode")) {
            const sortedData = [...robocode];
            sortedData.sort((a, b) => {
                return b[field] - a[field];
            });

            setRobocode(sortedData);
        }
    };

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
        <section id="table-home">
            <h2>Follow:</h2>
            <hr />
            <section id="continer-cards">
                {follow.map((item) => {
                    contFollow++
                    return (
                        <>
                            <section key={item._id} id="card" className="cardFollow" onClick={() => navigate(`/site-card-vite/${item._id}`)}>
                                <section className="header">
                                    <p>{contFollow}</p>
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
                        </>
                    )
                })}
            </section>
            <br />
            <h2>Mega:</h2>
            <hr />
            <section id="continer-cards">
                {mega.map((item) => {
                    contMega++
                    return (
                        <>
                            <section key={item._id} id="card" onClick={() => navigate(`/site-card-vite/${item._id}`)}>
                                <section className="header">
                                    <p>{contMega}</p>
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
                        </>
                    )
                })}
            </section>
            <br />
            <h2>Mini:</h2>
            <hr />
            <section id="continer-cards">
                {mini.map((item) => {
                    contMini++
                    return (
                        <>
                            <section key={item._id} id="card" onClick={() => navigate(`/site-card-vite/${item._id}`)}>
                                <section className="header">
                                    <p>{contMini}</p>
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
                        </>

                    )
                })}
            </section>
            <br />
            <h2>Robocode:</h2>
            <hr />
            <section id="continer-cards">
                {robocode.map((item) => {
                    contCode++
                    return (
                        <>
                            <section key={item._id} id="card" onClick={() => navigate(`/site-card-vite/${item._id}`)}>
                                <section className="header">
                                    <p>{contCode}</p>
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
                        </>
                    )
                })}
            </section>
        </section>
    )
}

export default Home;