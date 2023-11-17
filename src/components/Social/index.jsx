import './social.css';

export function Social({ url, children }) {
  return (
    <a className="social" rel="noopener noreferrer" href={url} target="_blank">
      {children}
    </a>
  );
}
