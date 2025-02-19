import React from "react";

function LogoutModal({ show, handleClose, onLogout }) {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar sua Saída</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">Tem certeza de que deseja sair?</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={onLogout}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
