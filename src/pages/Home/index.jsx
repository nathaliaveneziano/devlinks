import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Social } from '../../components/Social';
import { db } from '../../services/firebaseConnection';
import './home.css';

export default function Home() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, 'links');
      const queryRef = query(linksRef, orderBy('created', 'asc'));

      getDocs(queryRef).then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setLinks(lista);
      });
    }

    loadLinks();
  }, []);

  return (
    <div className="home">
      <h1>Nathália Veneziano</h1>
      <span>Veja meus links 👇 </span>

      <main className="links">
        {links.map((item) => (
          <section
            key={item.id}
            className="link-area"
            style={{ backgroundColor: item.background }}>
            <Link to={item.url} target="_blank" rel="noopener noreferrer">
              <p className="link-text" style={{ color: item.color }}>
                {item.name}
              </p>
            </Link>
          </section>
        ))}

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
