import React from 'react'
import logo from "../img/logo.png"

const SobreNos = () => {
  return (
    <div className="why-choose-section">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-lg-6 ms-2">
						<h2 className="section-title">Por que nos escolher</h2>
						<p>Trabalhamos para oferecer a melhor experiência de compra, priorizando a qualidade dos nossos produtos e a satisfação dos nossos clientes. Conte conosco para atender todas as suas necessidades de materiais de construção com eficiência e dedicação.</p>

						<div className="row my-5">
							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
                                    <i className="fa-solid fa-truck"></i>
									</div>
								  <h3>Entrega personalizada</h3>
								  <p>A entrega é combinada diretamente com você pelo WhatsApp, proporcionando mais conveniência e flexibilidade. Entre em contato e agende a melhor data e horário para receber seus produtos!</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
                                    <i className="fa-solid fa-bag-shopping"></i>
									</div>
									<h3>Fácil de Comprar</h3>
									<p>Com uma navegação intuitiva e filtros de pesquisa eficazes, você encontrará tudo o que precisa em apenas alguns cliques. Faça suas compras de forma rápida e sem complicações.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
                                    <i className="fa-solid fa-phone"></i>
									</div>
									<h3>Suporte Presente</h3>
									<p>Nossa equipe de suporte está disponível a qualquer hora do dia, pronta para resolver suas dúvidas e garantir uma experiência de compra tranquila. Estamos aqui para ajudar, sempre que precisar!</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
                                    <i className="fa-solid fa-arrow-right-arrow-left"></i>
									</div>
									<h3>Devoluções Sem Complicações</h3>
									<p>Se você não estiver satisfeito com sua compra, nossa política de devolução fácil e sem complicações garante que você possa devolver os produtos rapidamente e sem preocupações. Sua satisfação é nossa prioridade!</p>
								</div>
							</div>

						</div>
					</div>

					<div className="col-lg-5 mt-4">
						<div className="img-wrap">
							<img src={logo} alt="Image" className="img-fluid"/>
						</div>
					</div>

				</div>
			</div>
		</div>
  )
}

export default SobreNos
