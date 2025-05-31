document.addEventListener('DOMContentLoaded', () => {
    const commentInput = document.getElementById('commentInput');
    const addCommentBtn = document.getElementById('addCommentBtn');
    const commentsList = document.getElementById('commentsList');

    // Cargar comentarios guardados al iniciar
    loadComments();

    addCommentBtn.addEventListener('click', addComment);

    function addComment() {
        const commentText = commentInput.value.trim();

        if (commentText === '') {
            alert('Por favor, escribe un comentario antes de agregarlo.');
            return;
        }

        const now = new Date();
        const dateTimeString = now.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Crear el elemento del comentario
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-item');

        const commentContent = document.createElement('p');
        commentContent.classList.add('comment-content');
        commentContent.textContent = commentText;

        const commentMeta = document.createElement('span');
        commentMeta.classList.add('comment-meta');
        commentMeta.textContent = `Publicado el: ${dateTimeString}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
                commentsList.removeChild(commentItem);
                saveComments(); // Guardar el estado actual de los comentarios
            }
        });

        commentItem.appendChild(commentContent);
        commentItem.appendChild(commentMeta);
        commentItem.appendChild(deleteButton);

        commentsList.prepend(commentItem); // Agrega el comentario al principio de la lista

        commentInput.value = ''; // Limpiar el campo de texto
        saveComments(); // Guardar los comentarios después de añadir uno
    }

    // Funciones para guardar y cargar comentarios usando localStorage
    function saveComments() {
        const comments = [];
        commentsList.querySelectorAll('.comment-item').forEach(item => {
            const content = item.querySelector('.comment-content').textContent;
            const meta = item.querySelector('.comment-meta').textContent;
            comments.push({ content, meta });
        });
        localStorage.setItem('bookComments', JSON.stringify(comments));
    }
 
    function loadComments() {
        const storedComments = localStorage.getItem('bookComments');
        if (storedComments) {
            const comments = JSON.parse(storedComments);
            comments.forEach(commentData => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');

                const commentContent = document.createElement('p');
                commentContent.classList.add('comment-content');
                commentContent.textContent = commentData.content;

                const commentMeta = document.createElement('span');
                commentMeta.classList.add('comment-meta');
                commentMeta.textContent = commentData.meta;

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-btn');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
                 
                        commentsList.removeChild(commentItem);
                        saveComments();
                    }
                });

                commentItem.appendChild(commentContent);
                commentItem.appendChild(commentMeta);
                commentItem.appendChild(deleteButton);

                commentsList.appendChild(commentItem);
            });
        }
        
    }
});