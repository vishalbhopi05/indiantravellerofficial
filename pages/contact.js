import { useState } from 'react';
import {
  FiMail,
  FiInstagram,
  FiYoutube,
  FiSend,
  FiMapPin,
  FiArrowRight,
} from 'react-icons/fi';
import SEO from '@/components/SEO/SEO';
import AnimatedSection from '@/components/AnimatedSection/AnimatedSection';
import { siteConfig } from '@/data/siteData';
import styles from '@/styles/Contact.module.scss';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Simulate form submission
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with IndianTravellerOfficial for travel collaborations, photography inquiries, or just to say hello."
      />

      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <AnimatedSection animation="fadeUp">
              <h1 className={styles.heroTitle}>
                Get in <span>Touch</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Have a travel collaboration idea, a story to share, or just want
                to say hello? I'd love to hear from you.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Content */}
        <section className={styles.content}>
          <div className={styles.inner}>
            {/* Form */}
            <AnimatedSection animation="fadeRight">
              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>
                  Send a <span>Message</span>
                </h2>

                {submitted && (
                  <div className={styles.successMessage}>
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="name">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={styles.input}
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={styles.input}
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="message">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className={styles.textarea}
                      placeholder="Tell me about your collaboration idea, question, or just say hi..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={sending}
                  >
                    {sending ? 'Sending...' : 'Send Message'}{' '}
                    <FiSend style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection animation="fadeLeft" delay={0.2}>
              <div className={styles.infoSection}>
                {/* Email */}
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>
                    <FiMail />
                  </div>
                  <h3 className={styles.infoTitle}>Email</h3>
                  <p className={styles.infoText}>
                    For collaborations and inquiries
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className={styles.infoLink}
                  >
                    {siteConfig.email} <FiArrowRight size={14} />
                  </a>
                </div>

                {/* Instagram */}
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>
                    <FiInstagram />
                  </div>
                  <h3 className={styles.infoTitle}>Instagram</h3>
                  <p className={styles.infoText}>
                    Follow daily travel stories and behind-the-scenes content
                  </p>
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.infoLink}
                  >
                    @indiantravellerofficial <FiArrowRight size={14} />
                  </a>
                </div>

                {/* YouTube */}
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>
                    <FiYoutube />
                  </div>
                  <h3 className={styles.infoTitle}>YouTube</h3>
                  <p className={styles.infoText}>
                    Watch cinematic travel videos and destination guides
                  </p>
                  <a
                    href={siteConfig.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.infoLink}
                  >
                    IndianTravellerOfficial <FiArrowRight size={14} />
                  </a>
                </div>

                {/* Location */}
                <div className={styles.mapPlaceholder}>
                  <FiMapPin />
                  <p>Based in India, Exploring the World</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
}
