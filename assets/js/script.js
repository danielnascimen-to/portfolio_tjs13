// Seção about
const about = document.querySelector('#about')

// Seção projects
const swiperWrapper = document.querySelector('.swiper-wrapper')

// Formulário
const formulario = document.querySelector('#formulario')

// Expressão Regular de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// Função de preenchimento da seção about
async function getAboutGitHub() {
    try {
        // Requisição do tipo GET para a API do GitHub
        const resposta = await fetch(
            'https://api.github.com/users/DNasciment0',
        )

        // Converter a Resposta para JSON
        const perfil = await resposta.json()

        about.innerHTML = ''

        about.innerHTML = `
      
      <!-- Imagem da Seção About -->

        <figure class="about-image">
          <img
            src="${perfil.avatar_url}"
            alt="${perfil.name}"
          />
        </figure>

        <!-- Conteúdo da Seção About -->

         <article class="about-content">
        <h2>Sobre mim</h2>
        <p>
          Olá! Sou o <strong>Daniel Nascimento</strong>, estudante de <strong>Sistemas de Informação (6º período)</strong> e desenvolvedor Full Stack em formação pela <strong>Generation Brasil</strong>.
        </p>
        <p>
          Com 6 anos de experiência em <strong>Suporte de TI e Infraestrutura</strong>, trago uma visão prática sobre estabilidade de sistemas para o desenvolvimento moderno com <strong>TypeScript, React, Node.js e MySQL</strong>.
        </p>
        <p>
          Minhas principais soft skills incluem <strong>resiliência, trabalho em equipe e proatividade</strong>. 
        </p>
        <p>
         <strong> Vamos nos conectar?</strong>
          Explore meus repositórios no GitHub ou acesse meu currículo abaixo para detalhes sobre minha trajetória técnica. <strong>Estou em busca da minha primeira oportunidade como Dev!</strong>
        </p>


          <!-- Links (GitHub + Curriculo) e Dados do GitHub -->

          <div class="about-buttons-data">

          <!-- Links -->
            <div class="buttons-container">
              <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
              <a href="https://drive.google.com/file/d/1b2DPLYqMwZsDe6J71cnarhIIsqud8rWO/view?usp=drivesdk" target="_blank" class="botao-outline">Currículo</a>
            </div>
            

            <!-- Dados - GitHub -->

            <div class="data-container">

              <!-- Nº de Seguidores -->

              <div class="data-item">
                <span class="data-number">${perfil.followers}</span>
                <span class="data-label">Seguidores</span>
              </div>

              <!-- Nº de Repositórios Públicos -->

              <div class="data-item">
                <span class="data-number">${perfil.public_repos}</span>
                <span class="data-label">Repositórios</span>
              </div>
            </div>
          </div>
        </article>

    `;
    } catch (error) {
        console.error('Erro ao buscar dados no GitHub', error)
    }
}

// Função buscar os dados dos projetos

async function getProjectsGitHub() {
    try {
        // Requisição do tipo GET para a API do GitHub
        const resposta = await fetch(
            'https://api.github.com/users/DNasciment0/repos?sort=updated&per_page=6'
        );

        // Converter a Resposta para JSON
        const repositorios = await resposta.json()

        swiperWrapper.innerHTML = '';

        // Ícones das linguagens
        const linguagens = {
            'JavaScript': { icone: 'javascript' },
            'TypeScript': { icone: 'typescript' },
            'Python': { icone: 'python' },
            'Java': { icone: 'java' },
            'HTML': { icone: 'html' },
            'CSS': { icone: 'css' },
            'PHP': { icone: 'php' },
            'C#': { icone: 'csharp' },
            'Go': { icone: 'go' },
            'Kotlin': { icone: 'kotlin' },
            'Swift': { icone: 'swift' },
            'GitHub': { icone: 'github' },
        };

        repositorios.forEach((repositorio) => {

            // Seleciona o nome da Linguagem padrão do repositório
            const linguagem = repositorio.language || 'GitHub'

            // Seleciona o ícone da Linguagem padrão do repositório
            const config = linguagens[linguagem] ?? linguagens['GitHub']

            // Constrói a URL que aponta para o ícone da Linguagem padrão do repositório
            const urlIcone = `./assets/icons/languages/${config.icone}.svg`;

            // Formata o Nome do Repositório
            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ') // Substitui hifens e underlines por espaços em branco
                .replace(/[^a-zA-Z0-9\s]/g, '') // Remove Caracteres especiais
                .replace(/\s+t[a-z0-9]+$/i, '') // Remove a identificação de turma
                .toUpperCase() // Converte a string em letras maiúsculas

            // Função para truncar texto
            // Se a descrição possuir mais de 100 carcateres
            // seleciona os primeiros 97 e acrescenta '...' no final
            // Senão retorna o mesmo texto
            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto

            // Define a descrição do Repositório
            const descricao = repositorio.description ? (repositorio.description.length > 100 ? repositorio.description.substring(0, 97) + '...' : repositorio.description) : 'Projeto desenvolvido no GitHub';


            // tags
            const tags = repositorio.topics?.length > 0 ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('') : `<span class="tag">${linguagem}</span>`;

            // Cria o Botão Deploy
            const botaoDeploy = repositorio.homepage
                ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
                : ''

            // Botões de ação
            const botoesAcao = `
        <div class="project-buttons">
          <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
            GitHub
          </a>
          ${botaoDeploy}
        </div>
      `;

            // Constrói o Card
            swiperWrapper.innerHTML += `
       <div class="swiper-slide">
              <article class="project-card">
                <!-- Ícone da Tecnologia padrão do projeto -->

                <figure class="project-image">
                  <img
                    src="${urlIcone}"
                    alt="${linguagem}"
                  />
                </figure>

                <!-- Conteúdo do Projeto -->

                <div class="project-content">
                  <h3>${nomeFormatado}</h3>
                  <p>${descricao}</p>

                  <!-- Tags do Projeto -->

                  <div class="project-tags">
                     ${tags}
                  </div>

                  <!-- Links do Projeto -->

                  ${botoesAcao}
                </div>
              </article>
            </div>
          
      `
        })

        iniciarSwiper()
    } catch (error) {
        console.error('Erro ao buscar dados no GitHub', error)
    }
}

function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false,
            },
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false,
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 54,
                centeredSlides: false,
            },
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },

        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
    })
}

formulario.addEventListener('submit', function (event) {
    event.preventDefault()

    document
        .querySelectorAll('form span')
        .forEach((span) => (span.innerHTML = ''))

    let isValid = true

    const nome = document.querySelector('#nome')
    const erroNome = document.querySelector('#erro-nome')

    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'
        if (isValid) nome.focus()
        isValid = false
    }

    const email = document.querySelector('#email')
    const erroEmail = document.querySelector('#erro-email')

    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = 'Digite um endereço de e-mail válido'
        if (isValid) email.focus()
        isValid = false
    }

    const assunto = document.querySelector('#assunto')
    const erroAssunto = document.querySelector('#erro-assunto')

    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML =
            'O assunto deve ter no mínimo 5 caracteres'
        if (isValid) assunto.focus()
        isValid = false
    }

    const mensagem = document.querySelector('#mensagem')
    const erroMensagem = document.querySelector('#erro-mensagem')

    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = 'A mensagem não pode ser vazia'
        if (isValid) mensagem.focus()
        isValid = false
    }

    if (isValid) {
        const submitButton = formulario.querySelector(
            'button[type="submit"]',
        )
        submitButton.disabled = true
        submitButton.textContent = 'Enviando...'

        formulario.submit()
    }
})

// ==========================================
// EFEITO DE FUNDO FUTURISTA (PARTÍCULAS)
// ==========================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;
let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Interação com o mouse (empurra levemente)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 1.5;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 1.5;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 1.5;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 1.5;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let numberOfParticles = (canvas.height * canvas.width) / 10000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;

        // Alterna cores entre ciano (teal) e roxo para ficar igual à sua imagem
        let color = Math.random() > 0.5 ? '#2dd4bf' : '#8b5cf6';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacityValue = 1 - (distance / 20000);
                // Linhas em tom de roxo translúcido
                ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

// Inicia o efeito
initParticles();
animateParticles();

// executar a função getAboutGitHub
getAboutGitHub()

// Executar a função getProjects GitHub
getProjectsGitHub()
