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
      </main>
    </div>
  );
}
