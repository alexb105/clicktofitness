import styles from "./hero.module.css"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <video className={styles.heroVideo} autoPlay muted loop>
        <source src="https://placehold.co/1920x1080.mp4" type="video/mp4" />
      </video>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.heroSubtitle}>Premium Website Design</div>
        <h1 className={styles.heroTitle}>
          WEBSITES THAT <span className="fire-gradient-text">CONVERT</span> YOUR{" "}
          <span className="ice-gradient-text">FOLLOWERS</span>
        </h1>
        <p>
          We create stunning, high-performance websites for fitness coaches and influencers that turn your social media
          followers into paying clients.
        </p>
        <div className={styles.heroButtons}>
          <a href="#portfolio" className={`btn ${styles.btnGradient}`}>
            VIEW OUR WORK
          </a>
          <a href="#contact" className={`btn ${styles.btnSecondary}`}>
            GET A FREE QUOTE
          </a>
        </div>
      </div>
      <div className={styles.socialProof}>
        <div className={styles.socialProofContent}>
          <p className={styles.socialProofText}>Trusted by fitness influencers on</p>
          <div className={styles.socialProofLogos}>
            <img src="https://placehold.co/24x24" alt="Instagram" className={styles.socialProofLogo} />
            <img src="https://placehold.co/24x24" alt="TikTok" className={styles.socialProofLogo} />
            <img src="https://placehold.co/24x24" alt="YouTube" className={styles.socialProofLogo} />
          </div>
        </div>
      </div>
    </section>
  )
}
