// JavaScript simples para o Fórum Gorillaz com LocalStorage
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const postsContainer = document.getElementById('posts-container');
    const nomeInput = document.getElementById('nome');
    const tituloInput = document.getElementById('titulopost');
    const textoInput = document.getElementById('posttexto');
    const botaoPostar = document.getElementById('postar');
    
    carregarPosts();
    
    botaoPostar.addEventListener('click', function() {
        const nome = nomeInput.value.trim();
        const titulo = tituloInput.value.trim();
        const texto = textoInput.value.trim();
        

        if (nome && titulo && texto) {

            const novoPost = {
                nome: nome,
                titulo: titulo,
                texto: texto
            };
            
            const posts = JSON.parse(localStorage.getItem('gorillaz_posts') || '[]');
            
            posts.unshift(novoPost);

            localStorage.setItem('gorillaz_posts', JSON.stringify(posts));

            mostrarPosts(posts);

            nomeInput.value = '';
            tituloInput.value = '';
            textoInput.value = '';
        }
    });

    function carregarPosts() {
        const posts = JSON.parse(localStorage.getItem('gorillaz_posts') || '[]');
        mostrarPosts(posts);
    }

    function mostrarPosts(posts) {
        if (posts.length === 0) {
            postsContainer.innerHTML = '<div class="no-posts">Nenhum post ainda. Seja o primeiro a postar!</div>';
        } else {
            postsContainer.innerHTML = '';
            
            posts.forEach(function(post) {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.innerHTML = `
                    <h2 class="posttitle">${post.titulo}</h2>
                    <p class="posttext">${post.texto}</p>
                    <small class="post-author">Por: ${post.nome}</small>
                `;
                postsContainer.appendChild(postDiv);
            });
        }
    }
});