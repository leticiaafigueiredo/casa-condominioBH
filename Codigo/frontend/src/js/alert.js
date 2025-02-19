// alerts.js
function alerta(tipo, mensagem) {
    const tiposPermitidos = ['success', 'danger', 'warning', 'primary'];
    if (!tiposPermitidos.includes(tipo)) {
        console.error(`Tipo de alerta inválido: ${tipo}`);
        return;
    }

    const alertHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    const container = document.getElementById('alert-container');
    if (container) {
        container.innerHTML = alertHTML;
    } else {
        console.error('Container para o alerta não encontrado. Certifique-se de que exista um elemento com o ID "alert-container".');
    }
}

export default alerta;
