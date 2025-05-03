import styles from "./services.module.css"

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <div className={styles.servicesContainer}>
          <div className={`${styles.servicesContent} slide-in-left`}>
            <h2>
              SERVICES <span className="gradient-text">DESIGNED</span> FOR FITNESS INFLUENCERS
            </h2>
            <p>
              We understand the unique needs of fitness coaches and influencers who want to monetize their following and
              build a sustainable online business.
            </p>

            <div className={styles.servicesList}>
              <div className={styles.serviceItem}>
                <div className={styles.serviceContent}>
                  <h3>CUSTOM WEBSITE DESIGN</h3>
                  <p>
                    Stunning, mobile-optimized websites that reflect your brand and convert visitors into clients.
                    Perfect for coaches with 3K-100K+ followers.
                  </p>
                </div>
              </div>

              <div className={styles.serviceItem}>
                <div className={styles.serviceContent}>
                  <h3>SALES FUNNEL DEVELOPMENT</h3>
                  <p>
                    High-converting sales funnels designed specifically for fitness programs, challenges, and coaching
                    services.
                  </p>
                </div>
              </div>

              <div className={styles.serviceItem}>
                <div className={styles.serviceContent}>
                  <h3>PAYMENT INTEGRATION</h3>
                  <p>Seamless payment processing for one-time purchases, payment plans, and recurring memberships.</p>
                </div>
              </div>

              <div className={styles.serviceItem}>
                <div className={styles.serviceContent}>
                  <h3>SOCIAL MEDIA INTEGRATION</h3>
                  <p>
                    Connect your Instagram and TikTok profiles to your website to leverage your existing audience and
                    content.
                  </p>
                </div>
              </div>

              <div className={styles.serviceItem}>
                <div className={styles.serviceContent}>
                  <h3>LEAD GENERATION SYSTEMS</h3>
                  <p>
                    Automated lead capture and nurturing systems to convert your social media followers into paying
                    clients.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.servicesImage} slide-in-right`}>
            <img src="https://placehold.co/600x800/111111/CCCCCC" alt="Fitness website on devices" />
          </div>
        </div>
      </div>
    </section>
  )
}
