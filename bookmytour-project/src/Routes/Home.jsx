import React, { useState } from 'react'
import Styles from '../Styles/Body.module.css'
import Card from '../Components/Card.jsx'

const Home = () => {
  const [city, setCity] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Buscar:', city);
  }

  return (
    <div style={{height: '100vh'}}>
      <img id={Styles.mainImage} src='public/images/espacioParaImagenPrincipal.png' alt='Main-Image'/>
      <form id={Styles.container} onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleChange} placeholder="Ingresa la ciudad o región" id={Styles.input}/>
        <button id={Styles.btnSubmit} className={Styles.btnsForm} type='submit'>Buscar</button>
        <button type='button' id={Styles.btnFilter} className={Styles.btnsForm}>
          <img id={Styles.filterIcon} src='public/images/filterIcon.svg' alt='Filter-Icon' />
        </button>
      </form>
      <div className={Styles.sectionContainer}>
        <h2>Toma fotos y compártelas como nunca antes</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
      </div>
      <div className={Styles.categories}>
          <h2 className={Styles.subtitles}>Categorías</h2>
          <h3>Aventura</h3>
          <div className={Styles.cardsContainer}>
            <Card title="Nombre del tour" img="public/images/espacioImagenesTours.png" price="$000.000" description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur"></Card>
            <Card title="Nombre del tour" img="public/images/espacioImagenesTours.png" price="$000.000" description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur"></Card>
          </div>       
          <h3>Ecoturismo</h3>
          <div className={Styles.cardsContainer}>
            <Card title="Nombre del tour" img="public/images/espacioImagenesTours.png" price="$000.000" description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur"></Card>
            <Card title="Nombre del tour" img="public/images/espacioImagenesTours.png" price="$000.000" description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur"></Card>
          </div>
      </div>
      <div className={Styles.recommendations}>
          <h2 className={Styles.subtitles}>Recomendaciones</h2>
          <div className={Styles.cardsContainer}>
            <Card title="Nombre del tour" img="public/images/espacioImagenesTours.png" price="$000.000" description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur"></Card>
            <Card title="Nombre del tour" img="public/images/espacioImagenesTours.png" price="$000.000" description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur"></Card>
          </div>       
          <div className={Styles.cardsContainer}>
            <Card title="Nombre del tour" img="public/images/espacioImagenesTours.png" price="$000.000" description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur"></Card>
            <Card title="Nombre del tour" img="public/images/espacioImagenesTours.png" price="$000.000" description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur"></Card>
          </div>
      </div>
    </div>
  )
}

export default Home