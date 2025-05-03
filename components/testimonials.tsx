import styles from "./testimonials.module.css"

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className={styles.testimonialsHeader}>
          <h2>
            SUCCESS <span className="gradient-text">STORIES</span>
          </h2>
          <p>What our fitness clients say about working with us</p>
        </div>

        <div className={styles.testimonialsGrid}>
          <div className={`${styles.testimonialItem} fade-in`}>
            <div className={styles.testimonialContent}>
              Since launching my new website with Click2Fitness, I've doubled my program sales and increased my average
              order value by 75%. The design perfectly matches my brand and the sales funnel converts like crazy.
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorImage}>
                <img src="https://placehold.co/200x200/111111/CCCCCC" alt="Alex Johnson" />
              </div>
              <div className={styles.authorInfo}>
                <h4>Alex Johnson</h4>
                <p>Fitness Coach, 85K Followers</p>
                <div className={styles.socialHandle}>
                  <i className="fab fa-instagram"></i> @alexfitcoach
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.testimonialItem} fade-in`}>
            <div className={styles.testimonialContent}>
              I was struggling to convert my TikTok followers into paying clients. My new website from Click2Fitness
              changed everything. Now I have a clear path for my followers to become clients, and my income has never
              been more stable.
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorImage}>
                <img src="https://placehold.co/200x200/111111/CCCCCC" alt="Sarah Williams" />
              </div>
              <div className={styles.authorInfo}>
                <h4>Sarah Williams</h4>
                <p>Nutrition Coach, 32K Followers</p>
                <div className={styles.socialHandle}>
                  <i className="fab fa-tiktok"></i> @sarahnutrition
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.testimonialItem} fade-in`}>
            <div className={styles.testimonialContent}>
              The team at Click2Fitness understands fitness marketing better than any web designer I've worked with.
              They created a website that not only looks amazing but actually converts my Instagram followers into
              high-ticket clients.
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorImage}>
                <img src="https://placehold.co/200x200/111111/CCCCCC" alt="Mike Thompson" />
              </div>
              <div className={styles.authorInfo}>
                <h4>Mike Thompson</h4>
                <p>Strength Coach, 65K Followers</p>
                <div className={styles.socialHandle}>
                  <i className="fab fa-instagram"></i> @mike_strength
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
