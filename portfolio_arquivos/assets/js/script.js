// script.js - menu and theme toggle (ids use 'trd' prefix)
const trdMenuBtn = document.getElementById('trdMenuBtn');
const trdNav = document.getElementById('trdNav');
const trdThemeBtn = document.getElementById('trdThemeBtn');
const htmlEl = document.documentElement;

// toggle navigation menu
trdMenuBtn.addEventListener('click', () => {
  trdNav.classList.toggle('open');
});

// theme toggle (persist choice in localStorage)
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

    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    projectsContainer.innerHTML = repos.map(repo => {
      const lang = repo.language || 'N/A';
      const icon = langIcons[lang] || langIcons['N/A'];
      const isFeatured = repo.stargazers_count >= 10;
      return `
        <div class="project-card${isFeatured ? ' featured' : ''}">
          <div class="project-lang">${icon} ${lang}</div>
          <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
          <p>${repo.description ? repo.description : 'Sem descrição.'}</p>
          <div class="project-meta">
            <span class="star">⭐ ${repo.stargazers_count}</span>
            <span class="fork">🍴 ${repo.forks_count}</span>
            <span class="date">Atualizado: ${new Date(repo.updated_at).toLocaleDateString('pt-BR')}</span>
          </div>
          <a class="repo-link" href="${repo.html_url}" target="_blank">Ver no GitHub</a>
        </div>
      `;
    }).join('');
  })
  .catch(() => {
    projectsContainer.innerHTML = '<p>Erro ao carregar projetos do GitHub.</p>';
  });
