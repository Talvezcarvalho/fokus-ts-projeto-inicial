"use strict";
const formTask = document.querySelector('.app__form-add-task');
const toggleFormTaskBtn = document.querySelector('.app__button--add-task');
const cancelFormTaskBtn = document.querySelector('.app__form-footer__button--cancel');
const taskListContainer = document.querySelector('.app__section-task-list');
const taskAtiveDescription = document.querySelector('.app__section-active-task-description');
const textarea = document.querySelector('.app__form-textarea');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const btnDeletar = document.querySelector('.app__form-footer__button--delete');
const btnDeletarConcluidas = document.querySelector('#btn-remover-concluidas');
const btnDeletarTodas = document.querySelector('#btn-remover-todas');
const formLabel = document.querySelector('.app__form-label');
// cria uma interface para o estado da aplicação
let estadoInicial = {
    tarefas: [
        {
            descricao: 'Tarefa concluída',
            concluida: true
        },
        {
            descricao: 'Tarefa pendente 1',
            concluida: false
        },
        {
            descricao: 'Tarefa pendente 2',
            concluida: false
        }
    ],
    tarefaSelecionada: null,
    editando: false
};
// insere um valor inicial para o estado da aplicação, o valor da tarefaSelecionada é mudada posteriorminente por funcões, assim como o valor de editando
const deletar = (estado) => {
    if (estado.tarefaSelecionada) {
        console.log(estado.tarefaSelecionada);
        const tarefas = estado.tarefas.filter(tarefa => tarefa != estado.tarefaSelecionada);
        return Object.assign(Object.assign({}, estado), { tarefas, tarefaSelecionada: null, editando: false });
    }
    else {
        return estado;
    }
};
// deleta uma tarefa, caso exista uma tarefa selecionada, ela é deletada, caso contrário, nada acontece
const deletarTodas = (estado) => {
    return Object.assign(Object.assign({}, estado), { tarefas: [], tarefaSelecionada: null, editando: false });
};
// deleta todas as tarefas, setando o array de tarefas como vazio
const deletarTodasConcluidas = (estado) => {
    const tarefas = estado.tarefas.filter(t => !t.concluida);
    return Object.assign(Object.assign({}, estado), { tarefas, tarefaSelecionada: null, editando: false });
};
// deleta todas as tarefas concluídas, filtrando as tarefas que não estão concluídas
const editarTarefa = (estado, tarefa) => {
    return Object.assign(Object.assign({}, estado), { editando: !estado.editando, tarefaSelecionada: tarefa });
};
// edita uma tarefa, setando o valor de editando como true, e a tarefa selecionada como a tarefa que foi passada como parâmetro
const selecionarTarefa = (estado, tarefa) => {
    return Object.assign(Object.assign({}, estado), { tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa });
};
// seleciona uma tarefa, caso a tarefa passada como parâmetro seja a mesma que a tarefa selecionada, a tarefa selecionada é setada como null, caso contrário, a tarefa passada como parâmetro é setada como a tarefa selecionada
const adicionarTarefa = (estado, tarefa) => {
    return Object.assign(Object.assign({}, estado), { tarefas: [...estado.tarefas, tarefa] });
};
// adiciona uma tarefa, adicionando a tarefa passada como parâmetro ao array de tarefas
// const editarTarefa = (tarefa: Tarefa, paragraph: HTMLParagraphElement) => {
//     formTask!.classList.toggle
//     formLabel!.textContent = 'Editar tarefa'
// }
// metodo sem uso de ts
const atualizarUI = () => {
    const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;
    taskAtiveDescription.textContent = estadoInicial.tarefaSelecionada ? estadoInicial.tarefaSelecionada.descricao : '';
    // Caso haja tarefa selecionada o valor do texto é setado como a descrição da tarefa selecionada, caso contrário, o valor é setado como uma string vazia
    if (estadoInicial.editando && estadoInicial.tarefaSelecionada) {
        formTask === null || formTask === void 0 ? void 0 : formTask.classList.toggle('hidden');
        textarea.value = estadoInicial.tarefaSelecionada.descricao;
    }
    else {
        formTask === null || formTask === void 0 ? void 0 : formTask.classList.add('hidden');
        textarea.value = '';
    }
    // Caso o valor de editando seja true e haja uma tarefa selecionada, o formulário é exibido e o valor do textarea é setado como a descrição da tarefa selecionada, caso contrário, o formulário é escondido e o valor do textarea é setado como uma string vazia
    const ulTarefas = document.querySelector('.app__section-task-list');
    const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
    if (!btnAdicionarTarefa) {
        throw new Error('Botão de adicionar tarefa não encontrado');
    }
    btnAdicionarTarefa.onclick = () => {
        formTask === null || formTask === void 0 ? void 0 : formTask.classList.toggle('hidden');
    };
    formTask.onsubmit = (evento) => {
        evento.preventDefault();
        const descricao = textarea.value;
        estadoInicial = adicionarTarefa(estadoInicial, {
            descricao,
            concluida: false
        });
        atualizarUI();
    };
    btnDeletar.onclick = () => {
        estadoInicial = deletar(estadoInicial);
        atualizarUI();
    };
    btnDeletarTodas.onclick = () => {
        estadoInicial = deletarTodas(estadoInicial);
        atualizarUI();
    };
    btnDeletarConcluidas.onclick = () => {
        estadoInicial = deletarTodasConcluidas(estadoInicial);
        atualizarUI();
    };
    if (ulTarefas) {
        ulTarefas.innerHTML = '';
    }
    estadoInicial.tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.classList.add('app__section-task-list-item');
        li.onclick = () => {
            estadoInicial = selecionarTarefa(estadoInicial, tarefa);
            atualizarUI();
        };
        const paragraph = document.createElement('p');
        paragraph.classList.add('app__section-task-list-item-description');
        paragraph.textContent = tarefa.descricao;
        const button = document.createElement('button');
        button.classList.add('app_button-edit');
        const editImg = document.createElement('img');
        editImg.src = 'imagens/edit.png';
        const svgIcon = document.createElement('svg');
        svgIcon.innerHTML = taskIconSvg;
        svgIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            button.setAttribute('disabled', '');
            tarefa.concluida = true;
            li.classList.add('app__section-task-list-item-complete');
        });
        const editIcon = document.createElement('img');
        editIcon.setAttribute('src', '/imagens/edit.png');
        editIcon.onclick = (evento) => {
            evento.stopPropagation();
            estadoInicial = editarTarefa(estadoInicial, tarefa);
            atualizarUI();
        };
        button.appendChild(editIcon);
        if (tarefa.concluida) {
            button.setAttribute('disabled', 'true');
            li.classList.add('app__section-task-list-item-complete');
        }
        li.appendChild(svgIcon);
        li.appendChild(paragraph);
        li.appendChild(button);
        ulTarefas === null || ulTarefas === void 0 ? void 0 : ulTarefas.appendChild(li);
    });
    // itera sobre a lista de tarefas criando um elemento para cada um dos valores, setando a descrição da tarefa como o texto do parágrafo, e adicionando um botão de editar, caso a tarefa esteja concluída, o botão de editar é desabilitado e a classe de completada é adicionada ao elemento li
};
document.addEventListener('TarefaFinalizada', () => {
    if (estadoInicial.tarefaSelecionada) {
        estadoInicial.tarefaSelecionada.concluida = true;
        atualizarUI();
    }
});
atualizarUI();
