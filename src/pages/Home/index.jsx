import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Social } from '../../components/Social';
import './home.css';

export default function Home() {
  return (
    <div className="home">
      <h1>Nathália Veneziano</h1>
      <span>Veja meus links 👇 </span>

      <main className="links">
        <section className="link-area">
          <a href="#">
            <p className="link-text">Canal no YouTube</p>
          </a>
        </section>
        <section className="link-area">
          <a href="#">
            <p className="link-text">Canal no YouTube</p>
          </a>
        </section>
        <section className="link-area">
          <a href="#">
            <p className="link-text">Canal no YouTube</p>
          </a>
        </section>

        <footer>
          <Social url="https://www.facebook.com">
            <FaFacebook size={35} color="#ffffff" />
          </Social>
          <Social url="https://www.youtube.com">
            <FaYoutube size={35} color="#ffffff" />
          </Social>
          <Social url="https://www.instagram.com">
            <FaInstagram size={35} color="#ffffff" />
          </Social>
        </footer>
      </main>
    </div>
  );
}
