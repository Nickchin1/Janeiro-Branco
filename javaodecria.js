// Função para carregar os comentários do localStorage
function loadComments() {
    // Obtém a seção de comentários onde os comentários serão exibidos
    const commentsSection = document.getElementById("commentsSection");

    // Limpa a seção de comentários para garantir que os novos comentários sejam exibidos
    commentsSection.innerHTML = '';  

    // Recupera os comentários do localStorage. Se não houver comentários, retorna um array vazio
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Itera sobre cada comentário armazenado e o exibe na tela
    comments.forEach((comment, index) => {
        // Cria uma nova <div> para o comentário
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");  // Adiciona a classe "comment" à <div>

        // Cria uma <div> para o autor do comentário
        const author = document.createElement("div");
        author.classList.add("author");  // Adiciona a classe "author" à <div>
        author.textContent = comment.name;  // Define o nome do autor

        // Cria uma <div> para o e-mail do autor
        const email = document.createElement("div");
        email.classList.add("email");  // Adiciona a classe "email" à <div>
        email.textContent = comment.email;  // Define o e-mail do autor

        // Cria uma <div> para o texto do comentário
        const text = document.createElement("div");
        text.classList.add("text");  // Adiciona a classe "text" à <div>
        text.textContent = comment.comment;  // Define o texto do comentário

        // Cria um botão de exclusão para o comentário
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");  // Adiciona a classe "delete" ao botão
        deleteButton.textContent = "Excluir";  // Define o texto do botão
        deleteButton.onclick = () => deleteComment(index);  // Define a ação para excluir o comentário

        // Adiciona todos os elementos ao <div> do comentário
        commentDiv.appendChild(author);
        commentDiv.appendChild(email);
        commentDiv.appendChild(text);
        commentDiv.appendChild(deleteButton);

        // Adiciona o <div> do comentário à seção de comentários
        commentsSection.appendChild(commentDiv);
    });
}

// Função para salvar um novo comentário
function saveComment(event) {
    event.preventDefault();  // Impede o envio do formulário (comportamento padrão)

    // Recupera os valores dos campos do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;
    const anonymous = document.getElementById("anonymous").checked;  // Verifica se o comentário é anônimo

    // Cria um objeto com os dados do comentário
    const commentData = {
        name: anonymous ? "Anônimo" : name,  // Se for anônimo, usa "Anônimo", caso contrário, usa o nome fornecido
        email: anonymous ? "anonimo@anonimo.com" : email,  // Se for anônimo, usa e-mail fictício
        comment: comment  // Texto do comentário
    };

    // Recupera os comentários armazenados no localStorage e adiciona o novo comentário
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(commentData);  // Adiciona o novo comentário ao array de comentários

    // Salva os comentários atualizados no localStorage
    localStorage.setItem('comments', JSON.stringify(comments));

    // Limpa o formulário após salvar o comentário
    document.getElementById("commentForm").reset();

    // Atualiza a lista de comentários exibidos na página
    loadComments();
}

// Função para excluir um comentário
function deleteComment(index) {
    // Recupera os comentários existentes do localStorage
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Remove o comentário do array pelo índice
    comments.splice(index, 1);  // Remove o comentário na posição indicada

    // Atualiza o localStorage com a lista de comentários modificada
    localStorage.setItem('comments', JSON.stringify(comments));

    // Recarrega os comentários para refletir a exclusão
    loadComments();
}

// Adiciona o ouvinte de evento no formulário para chamar a função saveComment ao submeter
document.getElementById("commentForm").addEventListener("submit", saveComment);

// Carrega os comentários ao carregar a página (executa a função loadComments quando a página é carregada)
window.onload = loadComments;
