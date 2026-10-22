const sessao = JSON.parse(localStorage.getItem('sessao') || 'null');
if (!sessao) window.location.href = 'login.html';

const ler = k => JSON.parse(localStorage.getItem(k) || '[]');
const gravar = (k, v) => localStorage.setItem(k, JSON.stringify(v));

function sair() { localStorage.removeItem('sessao'); window.location.href = 'index.html'; }

function addPaciente(e) {
    e.preventDefault();
    const p = ler('pacientes');
    p.push({
        nome: document.getElementById('p-nome').value,
        tel: document.getElementById('p-tel').value
    });
    gravar('pacientes', p);
    e.target.reset(); render();
}

function addConsulta(e) {
    e.preventDefault();
    const c = ler('consultas');
    const data = document.getElementById('a-data').value;
    if (c.some(x => x.data === data)) return alert('Horário já ocupado!');
    c.push({
        paciente: document.getElementById('a-paciente').value, data,
        dentista: document.getElementById('a-dentista').value
    });
    gravar('consultas', c);
    e.target.reset(); render();
}

function render() {
    document.getElementById('usuario').textContent = 'Olá, ' + sessao.nome;
    const pac = ler('pacientes'), con = ler('consultas');
    document.getElementById('total-pacientes').textContent = pac.length;
    document.getElementById('total-consultas').textContent = con.length;
    document.getElementById('a-paciente').innerHTML =
        pac.map(p => `<option>${p.nome}</option>`).join('');
    document.getElementById('lista-consultas').innerHTML =
        con.map(c => `<tr><td>${c.paciente}</td><td>${c.data.replace('T', ' ')}</td><td>${c.dentista}</td></tr>`).join('');
}
render();