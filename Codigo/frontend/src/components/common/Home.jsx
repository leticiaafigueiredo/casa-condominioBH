import React from 'react'
import Header from './Header'
import Banner from '../home/Banner'
import ProdutoCarrosselEst from '../home/ProdutoCarrosselEst'
import SobreNos from '../home/SobreNos'
import Footer from './Footer'

const Home = () => {

  

  return (
    <>
      
      <Header></Header> 
      <Banner/>
      <ProdutoCarrosselEst />
      <SobreNos></SobreNos>
      <Footer></Footer>

    </>
  )


}

export default Home
