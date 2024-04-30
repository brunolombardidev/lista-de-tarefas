const localStorageKey = 'to-do-list'

function validarTarefaRepetida() {
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let inputValue = document.getElementById('textoNova').value
    let exists     = values.find(x => x.titulo == inputValue)
    return !exists ? false : true
}

function adicionarTarefa() {
    let input = document.getElementById('textoNova')
    input.style.border = '1px solid var(--color-white)'
    //Validação de Texto
    if(!input.value) {
        input.style.border = '1px solid var(--color-red)'
        alert('Digite algo para inserir em sua lista.')
    }
    else if(validarTarefaRepetida())
        alert('Você já adicionou essa Tarefa.')
    else {
        //Inserir texto no local.
        let values=JSON.parse(localStorage.getItem(localStorageKey) || '[]')
        values.push({
            titulo: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        mostrarTarefas()
    }
    input.value = ''
}

function mostrarTarefas() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('tarefasListadas')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['titulo']}<button id="botaoFeito" onclick='removerItem("${values[i]['titulo']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg></button></li>`
    }
}

function removerItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.find(x => x.titulo == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    mostrarTarefas()
}

mostrarTarefas()