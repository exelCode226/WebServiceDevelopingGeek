export function ButtonCancelar({ onClick, children }) {
    return (
      <button 
        title="Cancelar acción"
        className="btn btn-outline-danger px-4 py-1 rounded-md my-2 mx-auto flex items-center"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  