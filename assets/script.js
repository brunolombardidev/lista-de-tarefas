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
}

function displayProjects() {
    const projectsContainer = document.getElementById("projects");
    projectsContainer.innerHTML = '';

    for (const project in projects) {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `<h3>${project}</h3>`;

        // Adiciona o X apenas se não houver tarefas no projeto
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

        projects[project].forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            // Adicionando background-color conforme a prioridade da tarefa
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
            taskDiv.innerHTML = `<span>${task.task}</span><button class="button" onclick="completeTask(this)">✓</button>`;
            projectDiv.appendChild(taskDiv);
        });

        projectsContainer.appendChild(projectDiv);
    }
}

function completeTask(button) {
    const taskText = button.previousSibling.textContent.trim();
    const projectDiv = button.parentNode.parentNode;
    const projectName = projectDiv.querySelector('h3').textContent.trim();

    projects[projectName] = projects[projectName].filter(task => task.task !== taskText);
    displayProjects();
}

displayProjects(); // Chama a função para exibir os projetos ao carregar a página
