const form = document.querySelector('#form-cadastro');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletar dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Verificar se os campos estão preenchidos
    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Carregar dados existentes ou inicializar um array vazio
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar se o email já está cadastrado
    const emailExistente = usuarios.find(usuario => usuario.email === email);
    if (emailExistente) {
        alert('Este email já está cadastrado!');
        return;
    }

    // Adicionar novo usuário ao array
    usuarios.push({ nome, email, senha });

    // Salvar de volta no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso!');
    document.getElementById('form-cadastro').reset(); // Limpar o formulário
});
