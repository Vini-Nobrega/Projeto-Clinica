document.addEventListener('DOMContentLoaded', function() {
    const tokenUsuario = JSON.parse(localStorage.getItem('tokenUsuario'));

    if (!tokenUsuario){
        alert('Por favor, faça login para acessar a página de reservas.');
        location.href = 'login.html';
    }

    const horariosLivres = {
        "Oftalmologia": ["09:00", "10:00", "11:00", "14:00"],
        "Cardiologia": ["09:00", "10:00", "11:00","15:00", "16:00"],
        "Obstetricia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Dermatologia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Ortopedia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Pediatria": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Endocrinologia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Ginecologia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Neurologia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Gastroenterologia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Psiquiatria": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Reumatologia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Urologia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Otorrinolaringologia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Hematologia": ["09:00", "10:00", "11:00","13:00", "17:00"],
        "Nefrologia": ["09:00", "10:00", "11:00","13:00", "17:00"]
    };

    const selectConsulta = document.getElementById('tipoConsulta');
    const selectHorario = document.getElementById('horario');
    const formReserva = document.getElementById('formReserva');
    const minhasReservasList = document.getElementById('minhasReservas');
    const dataReservaInput = document.getElementById('dataReserva');

    // Carregar horários com base no tipo de consulta selecionado
    selectConsulta.addEventListener('change', function() {
        const tipoSelecionado = selectConsulta.value;
        selectHorario.innerHTML = '';
        if (horariosLivres[tipoSelecionado]) {
            horariosLivres[tipoSelecionado].forEach(horario => {
                const option = document.createElement('option');
                option.value = horario;
                option.textContent = horario;
                selectHorario.appendChild(option);
            });
        }
    });

    // Carregar horários padrão no início
    selectConsulta.dispatchEvent(new Event('change'));

    // Verificar se um horário está ocupado
    function isHorarioOcupado(tipoConsulta, horario, dataReserva) {
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        return reservas.some(reserva =>
            reserva.tipoConsulta === tipoConsulta &&
            reserva.horario === horario &&
            reserva.dataReserva === dataReserva
        );
    }

    // Salvar a reserva no localStorage
    formReserva.addEventListener('submit', function(event) {
        event.preventDefault();

        const tipoConsulta = selectConsulta.value;
        const horario = selectHorario.value;
        const dataReserva = dataReservaInput.value;

        if (!dataReserva) {
            alert('Por favor, selecione uma data válida.');
            return;
        }

        if (isHorarioOcupado(tipoConsulta, horario, dataReserva)) {
            alert('Este horário já está reservado. Por favor, escolha outro.');
            return;
        }

        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push({
            nomePaciente: tokenUsuario.email,
            tipoConsulta,
            horario,
            dataReserva
        });

        localStorage.setItem('reservas', JSON.stringify(reservas));
        alert('Reserva realizada com sucesso!');
        listarMinhasReservas();
    });

    // Listar reservas do usuário logado
    function listarMinhasReservas() {
        minhasReservasList.innerHTML = '';
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas = reservas.filter(reserva => reserva.nomePaciente === tokenUsuario.email);

        reservas.forEach(reserva => {
            const li = document.createElement('li');
            li.textContent = `${reserva.tipoConsulta} - ${reserva.horario} em ${reserva.dataReserva}`;
            minhasReservasList.appendChild(li);
        });
    }

    listarMinhasReservas();
});
