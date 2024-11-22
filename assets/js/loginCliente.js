document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletar dados do formulário de login
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    // Carregar usuários do localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar se as credenciais estão corretas
    const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
    console.log(usuarioValido);

    if (usuarioValido) {
        const token = gerarToken();
        const tokenUsuario = {
            email: usuarioValido.email,
            tipo: usuarioValido.tipo,
            token: token
        };
        localStorage.setItem('tokenUsuario', JSON.stringify(tokenUsuario));
        alert(`Bem-vindo, ${usuarioValido.nome}!`);
        window.location.href = '../projetoClinicaJS/reserva.html'; // Redirecionar para a página desejada
    } else {
        alert('Email ou senha incorretos.');
    }

    function gerarToken() {
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
    }
});
