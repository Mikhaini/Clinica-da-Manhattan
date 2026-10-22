const getUsers = () => JSON.parse(localStorage.getItem('usuarios') || '[]');

function cadastrar(e) {
    e.preventDefault();
    const nome = document.getElementById('c-nome').value;
    const email = document.getElementById('c-email').value;
    const senha = document.getElementById('c-senha').value;
    const users = getUsers();
    if (users.some(u => u.email === email)) return alert('E-mail já cadastrado!');
    users.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(users));
    alert('Cadastro realizado! Faça login.');
    e.target.reset();
}

function entrar(e) {
    e.preventDefault();
    const email = document.getElementById('l-email').value;
    const senha = document.getElementById('l-senha').value;
    const user = getUsers().find(u => u.email === email && u.senha === senha);
    if (!user) return alert('E-mail ou senha inválidos.');
    localStorage.setItem('sessao', JSON.stringify({ nome: user.nome, email: user.email }));
    window.location.href = 'sistema.html';
}