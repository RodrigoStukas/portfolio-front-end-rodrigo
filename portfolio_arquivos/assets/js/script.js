// script.js - alternância de menu e tema (os ids usam prefixo 'trd')
const trdMenuBtn = document.getElementById('trdMenuBtn');
const trdNav = document.getElementById('trdNav');
const trdThemeBtn = document.getElementById('trdThemeBtn');
const htmlEl = document.documentElement;

// alternar menu de navegação
trdMenuBtn.addEventListener('click', () => {
  trdNav.classList.toggle('open');
});

// alternar tema (salvar escolha no localStorage)
const storedTheme = localStorage.getItem('trd_theme');
if (storedTheme) {
  htmlEl.setAttribute('data-theme', storedTheme);
  themeIcon.src = storedTheme === 'dark' ? 'assets/img/modo-claro.png' : 'assets/img/lua.png';
  themeIcon.alt = storedTheme === 'dark' ? 'Tema escuro' : 'Tema claro';
}

trdThemeBtn.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('trd_theme', next);

  themeIcon.src = next === 'dark' ? 'assets/img/modo-claro.png' : 'assets/img/lua.png';
  themeIcon.alt = next === 'dark' ? 'Tema escuro' : 'Tema claro';
});

const githubUser = "RodrigoStukas";
const projectsContainer = document.getElementById('github-projects');
const langIcons = {
  'JavaScript': '<i class="fab fa-js-square" style="color:#f7df1e"></i>',
  'TypeScript': '<i class="fab fa-js" style="color:#3178c6"></i>',
  'HTML': '<i class="fab fa-html5" style="color:#e34c26"></i>',
  'CSS': '<i class="fab fa-css3-alt" style="color:#264de4"></i>',
  'N/A': '<i class="fas fa-question-circle" style="color:#888"></i>'
};

fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`)
  .then(res => res.json())
  .then(repos => {
    if (!Array.isArray(repos) || repos.length === 0) {
      projectsContainer.innerHTML = '<p>Nenhum projeto encontrado.</p>';
      return;
    }

  projectsContainer.innerHTML = repos.map(repo => {
  const lang = repo.language || 'N/A';
  const icon = langIcons[lang] || langIcons['N/A'];
  const isFeatured = repo.stargazers_count >= 10;

  // imagem de fundo do projeto
  const imageMap = {
  'portfolio-front-end-rodrigo': 'portfolio-preview.png',
  'ProjetoRodrigo': 'devlinks-preview.png',
  'RodrigoStukas': 'apresentacao-preview.png',
  'html-css': 'html-css-preview.png',
};

const imagePath = `assets/img/${imageMap[repo.name] || 'default.png'}`;

return `
  <div class="project-card${isFeatured ? ' featured' : ''}">
    <img class="project-image" src="${imagePath}" alt="Preview do projeto ${repo.name}">
    <div class="project-overlay">
      <div class="project-lang">${icon} ${lang}</div>
      <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
      <p>${repo.description ? repo.description : 'Sem descrição.'}</p>
      <div class="project-meta">
        <span class="star">⭐ ${repo.stargazers_count}</span>
        <span class="date">Atualizado: ${new Date(repo.updated_at).toLocaleDateString('pt-BR')}</span>
      </div>
      <a class="repo-link" href="${repo.html_url}" target="_blank"><i class="devicon-github-original"></i> Ver no GitHub</a>
      ${repo.homepage ? `<a class="site-link" href="${repo.homepage}" target="_blank"><i class="fa-solid fa-globe" style="color: inherit; margin-right: 6px;"></i> Ver Site</a>` : ''}
    </div>
  </div>
`;
}).join('');

  })
  .catch(() => {
    projectsContainer.innerHTML = '<p>Erro ao carregar projetos do GitHub.</p>';
  });
