import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { Social } from '../../components/Social';
import { db } from '../../services/firebaseConnection';
import './home.css';

export default function Home() {
  const [links, setLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});

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

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, 'social', 'link');
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data()) {
          setSocialLinks(snapshot.data());
        }
      });
    }

    loadSocialLinks();
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

        {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
          <footer>
            {socialLinks?.facebook && (
              <Social url={socialLinks.facebook}>
                <FaFacebook size={35} color="#ffffff" />
              </Social>
            )}

            {socialLinks?.youtube && (
              <Social url={socialLinks.youtube}>
                <FaYoutube size={35} color="#ffffff" />
              </Social>
            )}

            {socialLinks?.instagram && (
              <Social url={socialLinks.instagram}>
                <FaInstagram size={35} color="#ffffff" />
              </Social>
            )}
          </footer>
        )}
      </main>
    </div>
  );
}
