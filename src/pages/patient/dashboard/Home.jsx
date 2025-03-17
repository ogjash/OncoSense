import React from 'react'
import Header from '../../../components/Header'
import SpecialityMenu from '../../../components/SpecialityMenu'
import TopDoctors from '../../../components/TopDoctors'
import Banner from '../../../components/Banner'
import Footer from '../../../components/Footer'

const Home = () => {
  return (
    <div>
    <div className='mx-8 py-8'>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
      
    </div>
    <Footer/>
    </div>
  )
}

export default Home
