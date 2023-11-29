import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';
import './header.css';

export function Header() {
  async function handleLougout() {
    await signOut(auth);
  }

  return (
    <header className="admin-header">
      <nav className="nav-header">
        <button onClick={handleLougout}>
          <BiLogOut size={28} color="#db2629" />
        </button>
        <Link to="/admin">Links</Link>
        <Link to="/admin/social">Redes Sociais</Link>
      </nav>
    </header>
  );
}
