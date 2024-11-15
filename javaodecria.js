// Função para carregar os comentários do localStorage
function loadComments() {
    const commentsSection = document.getElementById("commentsSection");
    commentsSection.innerHTML = '';  // Limpa a seção de comentários antes de exibir os novos

    // Recupera os comentários armazenados
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Exibe os comentários
    comments.forEach((comment, index) => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = comment.name;

        const email = document.createElement("div");
        email.classList.add("email");
        email.textContent = comment.email;

        const text = document.createElement("div");
        text.classList.add("text");
        text.textContent = comment.comment;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Excluir";
        deleteButton.onclick = () => deleteComment(index);

        commentDiv.appendChild(author);
        commentDiv.appendChild(email);
        commentDiv.appendChild(text);
        commentDiv.appendChild(deleteButton);

        commentsSection.appendChild(commentDiv);
    });
}

// Função para salvar um novo comentário
function saveComment(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;
    const anonymous = document.getElementById("anonymous").checked;

    // Se for anônimo, usar um nome genérico e e-mail fictício
    const commentData = {
        name: anonymous ? "Anônimo" : name,
        email: anonymous ? "anonimo@anonimo.com" : email,
        comment: comment
    };

    // Recupera os comentários antigos e adiciona o novo comentário
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(commentData);

    // Salva no localStorage
    localStorage.setItem('comments', JSON.stringify(comments));

    // Limpa o formulário
    document.getElementById("commentForm").reset();

    // Atualiza a lista de comentários
    loadComments();
}

// Função para excluir um comentário
function deleteComment(index) {
    // Recupera os comentários existentes
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Remove o comentário pelo índice
    comments.splice(index, 1);

    // Atualiza o localStorage
    localStorage.setItem('comments', JSON.stringify(comments));

    // Recarrega os comentários para refletir a exclusão
    loadComments();
}

// Adiciona o ouvinte de evento no formulário
document.getElementById("commentForm").addEventListener("submit", saveComment);

// Carrega os comentários ao carregar a página
window.onload = loadComments;
