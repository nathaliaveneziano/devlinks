import './button.css';

export function Button({ children, ...props }) {
  return (
    <>
      <button {...props} className="form-button">
        {children}
      </button>
    </>
  );
}
