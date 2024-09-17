let projects = {};

function addTask() {
    const projectInput = document.getElementById("projectInput").value.trim();
    const taskInput = document.getElementById("taskInput").value.trim();
    const priorityInput = document.getElementById("priorityInput").value;

    if (projectInput === '' || taskInput === '') {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (!projects[projectInput]) {
        projects[projectInput] = [];
    }

    projects[projectInput].push({ task: taskInput, priority: priorityInput });
    displayProjects();

    // Limpa os campos após adicionar a tarefa
    document.getElementById("projectInput").value = '';
    document.getElementById("taskInput").value = '';
    document.getElementById("priorityInput").value = 'Comum';
}

function displayProjects() {
    const projectsContainer = document.getElementById("projects");
    projectsContainer.innerHTML = '';

    for (const project in projects) {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `<h3>${project}</h3>`;

        // Exibe Botão FECHAR se não houver tarefas no projeto
        if (projects[project].length === 0) {
            const deleteButton = document.createElement('span');
            deleteButton.classList.add('delete-project');
            deleteButton.textContent = 'X';
            deleteButton.onclick = function() {
                delete projects[project];
                displayProjects();
            };
            projectDiv.appendChild(deleteButton);
        }

        projects[project].sort((a, b) => {
            const priorityOrder = { 'Urgente': 1, 'Importante': 2, 'Comum': 3 }; // Prioridades reordenadas
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        projects[project].forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            // Prioridade da Tarefa muda Cor
            switch(task.priority) {
                case 'Urgente':
                    taskDiv.style.backgroundColor = 'var(--color-yellow3)';
                    break;
                case 'Importante':
                    taskDiv.style.backgroundColor = 'var(--color-yellow2)';
                    break;
                default:
                    taskDiv.style.backgroundColor = 'transparent';
            }
            taskDiv.innerHTML = `
            <svg class="w-6 h-6 edit-task" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" class="bi bi-pencil" viewBox="0 0 24 24" onclick="editTask('${project}', ${index})">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
            </svg>

            <span>${task.task}</span>
            <button class="button" onclick="completeTask(this)">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                </svg>
            </button>`;
            projectDiv.appendChild(taskDiv);
        });

        projectsContainer.appendChild(projectDiv);
    }
}

function completeTask(button) {
    const taskDiv = button.parentNode;
    const projectDiv = taskDiv.parentNode;
    const projectName = projectDiv.querySelector('h3').textContent.trim();

    projects[projectName] = projects[projectName].filter(task => task.task !== taskDiv.querySelector('span').textContent.trim());
    displayProjects();
}

function editTask(project, index) {
    const task = projects[project][index];
    
    // Preenche os inputs com os valores da tarefa
    document.getElementById("projectInput").value = project;
    document.getElementById("taskInput").value = task.task;
    document.getElementById("priorityInput").value = task.priority;
    
    // Remove a tarefa antiga
    projects[project].splice(index, 1);
    displayProjects();
}

displayProjects(); // Chama a função para exibir os projetos ao carregar a página
