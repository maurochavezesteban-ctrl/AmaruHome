import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.tag}>✦ Colección Invierno 2026</div>
      <h1 className={styles.title}>
        Tu hogar merece <span>más confort</span>
      </h1>
      <p className={styles.subtitle}>
        Descubrí nuestra colección premium de sábanas, acolchados, toallas y alfombras.
      </p>
      <div className={styles.buttons}>
        <a href="#catalogo" className={styles.btnMain}>Comprar ahora</a>
        <a href="#catalogo" className={styles.btnOutline}>Ver colecciones</a>
      </div>
    </section>
  )
}
