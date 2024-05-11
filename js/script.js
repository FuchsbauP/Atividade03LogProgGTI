var alunos = [] // Memory BD
var alunoAlterado = null // Guarda o objeto a ser alterado

function showModal() {
    let formModal = document.getElementById('register-modal')
    formModal.style.display = "block"
}

function hideModal() {
    let formModal = document.getElementById('register-modal')
    clearModalInputs()
    formModal.style.display = "none"
}

function clearModalInputs() {
    document.getElementById('ra').value = ''
    document.getElementById('nome').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''
    document.getElementById('curso').value = ''
}

function showSearchBar() {
    let searchBar = document.getElementById('search-bar')
    searchBar.style.display = "flex"
    showStudentsList()
}

function hideSearchBar() {
    let searchBar = document.getElementById('search-bar')
    searchBar.style.display = "none"
    showStudentsList()
}

function addStudent() {
    document.getElementById('ra').disabled = false
    alunoAlterado = null
    showModal()
    clearModalInputs()
}

function saveRegister() {
    let ra = document.getElementById('ra').value.trim()
    let nome = document.getElementById('nome').value.trim()
    let cidade = document.getElementById('cidade').value.trim()
    let estado = document.getElementById('estado').value.trim()
    let curso = document.getElementById('curso').value.trim()

    if (alunoAlterado == null) {
        let camposObrigatorios = ['ra', 'nome', 'cidade', 'estado', 'curso']
        let camposVazios = []

        for (let campo of camposObrigatorios) {
            switch (campo) {
                case 'ra':
                    if (ra === '') camposVazios.push('R.A')
                    break
                case 'nome':
                    if (nome === '') camposVazios.push('Nome')
                    break
                case 'cidade':
                    if (cidade === '') camposVazios.push('Cidade')
                    break
                case 'estado':
                    if (estado === '') camposVazios.push('Estado')
                    break
                case 'curso':
                    if (curso === '') camposVazios.push('Curso')
                    break
            }
        }
        if (camposVazios.length > 0) {
            let mensagem = 'Os seguintes campos são obrigatórios e estão vazios \n'
            for (let campo of camposVazios) {
                mensagem += campo + '\n'
            }
            alert(mensagem)
            return showModal()
        }
        else {
            let aluno = {
                "ra": ra,
                "nome": nome,
                "cidade": cidade,
                "estado": estado,
                "curso": curso
            }
            alunos.push(aluno) //Adiciona o objeto "aluno" ao vetor
        }
    }
    else {
        alunoAlterado.nome = nome
        alunoAlterado.cidade = cidade
        alunoAlterado.estado = estado
        alunoAlterado.curso = curso
    }

    alunoAlterado = null
    hideModal()
    showStudentsList()
    showModal()
}

function showStudentsList() {
    let tbody = document.getElementById('tb-students-list')
    tbody.innerHTML = '' //Limpa a tabela antes de mostrar todos os registros

    for (let i = 0; i < alunos.length; i++) {
        let linha = `
        <tr>
                    <td id="ra-student">${alunos[i].ra}</td>
                    <td id="nome-student">${alunos[i].nome}</td>
                    <td id="cidade-student">${alunos[i].cidade}</td>
                    <td id="estado-student">${alunos[i].estado}</td>
                    <td id="curso-student">${alunos[i].curso}</td>
                    <td>
                        <button id="edit-btn" onclick="editRegister('${alunos[i].ra}')"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button id="delete-btn" onclick="deleteRegister('${alunos[i].ra}')"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>`
        let tr = document.createElement('tr')
        tr.innerHTML = linha
        tbody.appendChild(tr)
    }
}

function editRegister(ra) {
    //Procurar pelo aluno com o RA selecionado
    for (let i = 0; i < alunos.length; i++) {
        let aluno = alunos[i]
        if (aluno.ra == ra) {
            document.getElementById('ra').value = aluno.ra
            document.getElementById('nome').value = aluno.nome
            document.getElementById('cidade').value = aluno.cidade
            document.getElementById('estado').value = aluno.estado
            document.getElementById('curso').value = aluno.curso
            alunoAlterado = aluno
        }
    }
    document.getElementById('ra').disabled = true
    showModal()
}

function deleteRegister(ra) {
    if (confirm('Deseja realmente excluir o registro do aluno(a)?')) {
        for (let i = 0; i < alunos.length; i++) {
            let aluno = alunos[i]
            if (aluno.ra == ra) {
                alunos.splice(i, 1)
            }
        }
        showStudentsList()
    }
}

function sortByRas() {
    alunos.sort(function compare(a, b) {
        if (a.ra < b.ra) return -1
        if (a.ra > b.ra) return 1
        return 0
    })
    showStudentsList()
}

function sortByNames() {
    alunos.sort(function compare(a, b) {
        if (a.nome < b.nome) return -1
        if (a.nome > b.nome) return 1
        return 0
    })
    showStudentsList()
}

function sortByCities() {
    alunos.sort(function compare(a, b) {
        if (a.cidade < b.cidade) return -1
        if (a.cidade > b.cidade) return 1
        return 0
    })
    showStudentsList()
}

function sortByStates() {
    alunos.sort(function compare(a, b) {
        if (a.estado < b.estado) return -1
        if (a.estado > b.estado) return 1
        return 0
    })
    showStudentsList()
}

function sortByCourses() {
    alunos.sort(function compare(a, b) {
        if (a.curso < b.curso) return -1
        if (a.curso > b.curso) return 1
        return 0
    })
    showStudentsList()
}

function searchRegister() {
    //Capturar valor da busca
    let inputSearch = document.getElementById('input-search-bar').value.toUpperCase()
    //Capturar a tabela
    let tbody = document.getElementById('tb-students-list')
    //Capturar todas as linhas da tabela
    let tr = tbody.getElementsByTagName('tr')

    //Loop para percorrer toas as linhas da tabela e ocultar as linhas que não correspondem a pesquisa
    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')
        let found = false
        // Loop para percorrer toas as células da linha selecionada
        for (j = 0; j < td.length; j++) {
            let cell = td[j]
            if (cell) {
                let textValue = cell.textContent || cell.innerText
                if (textValue.toUpperCase().indexOf(inputSearch) > -1) {
                    found = true
                    break
                }
            }
        }
        if (found) {
            tr[i].style.display = 'table-row'
        }
        else {
            tr[i].style.display = 'none'
        }
    }

}