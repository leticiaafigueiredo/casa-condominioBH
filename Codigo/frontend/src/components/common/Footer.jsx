import React from 'react'


const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container relative">


                <div className="row">
                    <div className="col-lg-8">
                        <div className="subscription-form">
                            <h3 className="d-flex align-items-center"><span className="me-1"><i className="fa-regular fa-envelope"></i></span><span>Se inscreva para receber nossas novidades</span></h3>

                            <form action="#" className="row g-3">
                                <div className="col-auto">
                                    <input type="text" className="form-control" placeholder="Digite seu nome" />
                                </div>
                                <div className="col-auto">
                                    <input type="email" className="form-control" placeholder="Digite seu email" />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary">
                                        <span className="fa fa-paper-plane"></span>
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="row g-5 mb-5">
                    <div className="col-lg-4">
                        <div className="mb-4 footer-logo-wrap"><a href="#" className="footer-logo">casa&condominio<span>.bh</span></a></div>
                        <p className="mb-4">Bem-vindo à nossa loja de materiais de construção e utensílios para o lar! Aqui, oferecemos uma ampla variedade de produtos de qualidade para atender às suas necessidades, desde reformas e construções até soluções práticas para o dia a dia da sua casa.</p>

                    </div>

                    <div className="col-lg-8">
                        <div className="row links-wrap">
                            <div className="col-6 col-sm-6 col-md-3">
                                <ul className="list-unstyled">
                                    <li><a href="#">Sobre nós</a></li>
                                    <li><a href="#">Serviços</a></li>
                                    <li><a href="#">Suporte</a></li>
                                </ul>
                            </div>

                            <div className="col-6 col-sm-6 col-md-3">
                                <ul className="list-unstyled">
                                    <li><a href="#">Entrar</a></li>
                                    <li><a href="#">Cadastrar</a></li>
                                    <li><a href="#">Produtos</a></li>
                                </ul>
                            </div>

                            <div className="col-6 col-sm-6 col-md-3">
                                <ul className="list-unstyled">
                                    <li><a href="#">Ferramentas</a></li>
                                    <li><a href="#">Tintas</a></li>
                                    <li><a href="#">Organizadores</a></li>
                                </ul>
                            </div>
                            <div className="col-6 col-sm-6 col-md-3">
                                <ul className="list-unstyled custom-social mt-4">
                                    <li><a href="#"><span className="fa fa-brands fa-facebook-f"></span></a></li>
                                    <li><a href="#"><span className="fa fa-brands fa-twitter"></span></a></li>
                                    <li><a href="#"><span className="fa fa-brands fa-instagram"></span></a></li>
                                    <li><a href="#"><span className="fa fa-brands fa-linkedin"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                {/*<div className="border-top copyright">
                    <div className="row pt-4">
                        <div className="col-lg-6">
                            <p className="mb-2 text-center text-lg-start">Copyright &copy;<script>document.write(new Date().getFullYear());</script>. All Rights Reserved. &mdash; Designed with love by <a href="https://untree.co">Untree.co</a> Distributed By <a hreff="https://themewagon.com">ThemeWagon</a> 
                            </p>
                        </div>

                        <div className="col-lg-6 text-center text-lg-end">
                            <ul className="list-unstyled d-inline-flex ms-auto">
                                <li className="me-4"><a href="#">Terms &amp; Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
*/}
            </div>
        </footer>
    )
}

export default Footer
