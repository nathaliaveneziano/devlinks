import { useState } from 'react';
import { MdAddLink } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { addDoc, collection } from 'firebase/firestore';
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

      <article
        className="list animate-pop"
        style={{ backgroundColor: '#000', color: '#fff' }}>
        <p>Grupo exclusivo no Telegram</p>
        <div>
          <Button className="delete">
            <FiTrash2 size={18} color="#fff" />
          </Button>
        </div>
      </article>
    </div>
  );
}
