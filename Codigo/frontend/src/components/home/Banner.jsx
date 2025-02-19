import React from 'react'
import { Link } from "react-router-dom";
import toolsImage from '../img/tools.png'
import home from '../../json/home.json'
import { useAuth } from '../contexts/AuthProvider';


const Banner = () => {
	const { userType } = useAuth()

  return (
    <div className="hero">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro-excerpt">
								<h1>{home.banner.titulo}</h1>
								<p className="mb-4">{home.banner.descricao}</p>
								<p>
                                    {/* */}
									
									

									{
										 userType === 'ROLE_USER' ?
										 (
											 <Link to='/todos-produtos' className="btn btn-secondary me-2">Comprar</Link>
										 )
										 :  userType === 'ROLE_ADMIN' ?
										 (
											<Link className="btn btn-secondary me-2" to={"/cadastrar-produto"}><i >Cadastrar Produto</i></Link>
										 )
										 : (
										 <Link className="btn btn-secondary me-2" to={"/login"}><i >Login</i></Link>

										 )
									}
                                </p>
							</div>
						</div>
						<div className="col-lg-7 ">
							<div className="hero-img-wrap ">
								<img src={toolsImage} className="img-fluid col-md-12 com-sm-2 ms-5" style={{ width: '90%' }}  />
							</div>
						</div>
						
					</div>
				</div>
			</div>
  )
}

export default Banner
