const sessao = JSON.parse(localStorage.getItem('sessao') || 'null');
if (!sessao) window.location.href = 'login.html';

const ler = k => JSON.parse(localStorage.getItem(k) || '[]');
const gravar = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// Escapa texto para não executar HTML digitado pelo usuário
function esc(texto) {
    const d = document.createElement('div');
    d.textContent = texto;
    return d.innerHTML;
}

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

function formatar(data) {
    return new Date(data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function dataDeHoje() {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}

function render() {
    document.getElementById('usuario').textContent = 'Olá, ' + sessao.nome;
    const pac = ler('pacientes');
    const con = ler('consultas').sort((a, b) => a.data.localeCompare(b.data));
    const hoje = dataDeHoje();

    document.getElementById('total-pacientes').textContent = pac.length;
    document.getElementById('total-consultas').textContent = con.length;
    document.getElementById('consultas-hoje').textContent =
        con.filter(c => c.data.startsWith(hoje)).length;

    document.getElementById('a-paciente').innerHTML = pac.length
        ? pac.map(p => `<option>${esc(p.nome)}</option>`).join('')
        : '<option value="">Cadastre um paciente primeiro</option>';

    document.getElementById('lista-consultas').innerHTML = con.length
        ? con.map(c => `<tr><td>${esc(c.paciente)}</td><td>${formatar(c.data)}</td><td>${esc(c.dentista)}</td></tr>`).join('')
        : '<tr><td colspan="3" class="vazio">Nenhuma consulta agendada.</td></tr>';

    document.getElementById('lista-pacientes').innerHTML = pac.length
        ? pac.map(p => `<tr><td>${esc(p.nome)}</td><td>${esc(p.tel)}</td></tr>`).join('')
        : '<tr><td colspan="2" class="vazio">Nenhum paciente cadastrado.</td></tr>';
}
render();