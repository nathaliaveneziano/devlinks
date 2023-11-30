import { MdAddLink } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { Header } from '../../components/Header';
import { Logo } from '../../components/Logo';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import './admin.css';

export default function Admin() {
  return (
    <div className="admin">
      <Header />
      <Logo />
      <form className="form">
        <label htmlFor="name" className="label">
          Nome do Link
        </label>
        <Input id="name" placeholder="Nome do link..." />

        <label htmlFor="url" className="label">
          URL do Link
        </label>
        <Input id="url" type="url" placeholder="Digite a URL..." />

        <section className="colors">
          <div>
            <label htmlFor="background" className="label">
              Fundo do Link
            </label>
            <Input id="background" type="color" />
          </div>

          <div>
            <label htmlFor="color" className="label">
              Cor do Link
            </label>
            <Input id="color" type="color" />
          </div>
        </section>

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
