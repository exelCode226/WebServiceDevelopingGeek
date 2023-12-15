export function Button({ onClick, children }) {
  return (
    <button 
    
      className="btn btn-outline-primary px-4 py-1 rounded-md my-2 mx-auto flex items-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
