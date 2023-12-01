import { useEffect, useState } from 'react';
import { MdAddLink } from 'react-icons/md';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { db } from '../../services/firebaseConnection';
import './networks.css';

export default function Networks() {
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, 'social', 'link');
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data()) {
          setFacebook(snapshot.data().facebook);
          setInstagram(snapshot.data().instagram);
          setYoutube(snapshot.data().youtube);
        }
      });
    }

    loadLinks();
  }, []);

  async function handleSave(e) {
    e.preventDefault();

    await setDoc(doc(db, 'social', 'link'), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        toast.success('Links registrados com sucesso!');
      })
      .catch((error) => {
        console.log('Error ao registrar' + error.message);
        toast.error('Ops! Erro ao salvar o link');
      });
  }

  return (
    <div className="admin">
      <Header />
      <h1 className="title-social">Suas redes sociais</h1>

      <form className="form" onSubmit={handleSave}>
        <label className="label" htmlFor="facebook">
          Link do facebook
        </label>
        <Input
          placeholder="Digite a url do facebook..."
          id="facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <label className="label" htmlFor="instagram">
          Link do instagram
        </label>
        <Input
          placeholder="Digite a url do instagram..."
          id="instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className="label" htmlFor="youtube">
          Link do youtube
        </label>
        <Input
          placeholder="Digite a url do youtube..."
          id="youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />

        <Button type="submit" className="form-button">
          Salvar links
          <MdAddLink size={28} />
        </Button>
      </form>
    </div>
  );
}
