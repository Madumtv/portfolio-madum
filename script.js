// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ANIMATION AU SCROLL (Micro-interactions)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

function applyScrollAnimation() {
    document.querySelectorAll('.project-card, .hero-content, .glass-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}
applyScrollAnimation();

// RÉCUPÉRATION GITHUB
async function fetchGitHubRepos() {
    const container = document.getElementById('github-projects');
    const username = 'Madumtv';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const repos = await response.json();
        
        container.innerHTML = ''; // Nettoyer le loading
        
        // Filtrer : Pas de forks (ou tout si demandé) / Ne pas s'afficher soi-même
        // On affiche tout le monde maintenant
        const filteredRepos = repos.filter(repo => repo.name !== 'portfolio-madum');
        
        filteredRepos.forEach(repo => {
            const card = document.createElement('article');
            card.className = 'project-card';
            
            // Image aléatoire par gradient pour correspondre au design premium
            const gradients = [
                'linear-gradient(135deg, #6d28d9, #1e1b4b)',
                'linear-gradient(135deg, #1e1b4b, #7c3aed)',
                'linear-gradient(135deg, #4c1d95, #0f172a)'
            ];
            const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
            
            card.innerHTML = `
                <div class="project-img" style="background: ${randomGradient}"></div>
                <div class="project-info">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "Un projet innovant de Madumtv."}</p>
                    ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
                    <a href="${repo.html_url}" target="_blank" class="btn-link" style="color: #7c3aed; text-decoration: none; font-weight: 700; margin-top: 1rem; display: block;">Voir sur GitHub</a>
                </div>
            `;
            container.appendChild(card);
        });
        
        // Réappliquer l'animation aux nouvelles cartes
        applyScrollAnimation();

    } catch (error) {
        container.innerHTML = '<p class="error">Erreur lors du chargement des projets.</p>';
        console.error(error);
    }
}

fetchGitHubRepos();

// GESTION DU THÈME
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const themeIcon = themeBtn.querySelector('i');

// Vérifier LocalStorage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    updateThemeIcon('sun');
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight ? 'sun' : 'moon');
});

function updateThemeIcon(iconName) {
    themeBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
    lucide.createIcons();
}

// FORMULAIRE DE CONTACT (Simulation)
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Message Envoyé !";
        btn.style.backgroundColor = "#10b981"; // Green Success
        form.reset();
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
        }, 3000);
    });
}
