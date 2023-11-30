import { useEffect, useState } from 'react';
import { MdAddLink } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { Logo } from '../../components/Logo';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { db } from '../../services/firebaseConnection';
import './admin.css';

export default function Admin() {
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [backgroundInput, setBackgroundInput] = useState('#f1f1f1');
  const [colorInput, setColorInput] = useState('#121212');
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const linksRef = collection(db, 'links');
    const queryRef = query(linksRef, orderBy('created', 'asc'));
    onSnapshot(queryRef, (snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          background: doc.data().background,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if (!nameInput || !urlInput) {
      toast.warn('Preencha todos os campos!');
      return;
    }

    addDoc(collection(db, 'links'), {
      name: nameInput,
      url: urlInput,
      background: backgroundInput,
      color: colorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput('');
        setUrlInput('');
        setBackgroundInput('#f1f1f1');
        setColorInput('#121212');
        toast.success('Link registrado com sucesso!');
      })
      .catch((error) => {
        console.log('Error ao registrar' + error.message);
        toast.error('Ops! Erro ao salvar o link');
      });
  }

  async function handleDeleteLink(id) {
    const docRef = doc(db, 'links', id);
    await deleteDoc(docRef);
  }

  return (
    <div className="admin">
      <Header />
      <Logo />
      <form className="form" onSubmit={handleRegister}>
        <label htmlFor="name" className="label">
          Nome do Link
        </label>
        <Input
          id="name"
          placeholder="Nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label htmlFor="url" className="label">
          URL do Link
        </label>
        <Input
          id="url"
          type="url"
          placeholder="Digite a URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="colors">
          <div>
            <label htmlFor="background" className="label">
              Fundo do Link
            </label>
            <Input
              id="background"
              type="color"
              value={backgroundInput}
              onChange={(e) => setBackgroundInput(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="color" className="label">
              Cor do Link
            </label>
            <Input
              id="color"
              type="color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput && (
          <div className="preview">
            <label className="label">Veja como está ficando 👇 </label>
            <article
              className="list"
              style={{ backgroundColor: backgroundInput }}>
              <p style={{ color: colorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <Button type="submit" className="form-button">
          Cadastrar
          <MdAddLink size={28} color="#fff" />
        </Button>
      </form>

      <h2 className="title">Meus links</h2>

      {links.map((item, index) => (
        <article
          key={index}
          className="list animate-pop"
          style={{ backgroundColor: item.background, color: item.color }}>
          <p>{item.name}</p>
          <div>
            <Button
              className="delete"
              onClick={() => handleDeleteLink(item.id)}>
              <FiTrash2 size={18} color="#fff" />
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
