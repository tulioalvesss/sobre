// Função para gerenciar o tema
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Usa a função getPreferredTheme
    const currentTheme = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme, icon);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Atualiza o tema
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Atualiza o ícone
        updateThemeIcon(newTheme, icon);
        
        // Adiciona classe para animação
        themeToggle.classList.toggle('light-mode');
    });
}

// Função para atualizar o ícone do tema
function updateThemeIcon(theme, icon) {
    if (theme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Chama a função de setup quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', setupThemeToggle);

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Formulário de contato
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    alert('Mensagem enviada com sucesso!');
    this.reset();
});

// Animação de fade-in para os elementos quando aparecem na tela
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Inicialização dos tooltips do Bootstrap
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Adiciona classes do Bootstrap aos elementos do formulário
document.querySelectorAll('input, textarea').forEach(element => {
    element.classList.add('form-control');
});

document.querySelectorAll('button').forEach(button => {
    button.classList.add('btn', 'btn-custom');
});

// Adiciona efeito de hover nos cards
document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('h-100');
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Fecha o menu mobile ao clicar em um link (Bootstrap navbar)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
        }
    });
});

// Adicione esta função no arquivo main.js
function getPreferredTheme() {
    // Verifica se há uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Verifica a preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    
    return 'dark'; // tema padrão
}

// Função para gerenciar a árvore de habilidades
function setupSkillTree() {
    const folders = document.querySelectorAll('.folder');
    
    folders.forEach(folder => {
        // Abre todas as pastas inicialmente
        folder.classList.add('active');
        
        folder.addEventListener('click', (e) => {
            // Previne que o clique se propague para pastas pai
            e.stopPropagation();
            
            // Toggle da classe active
            folder.classList.toggle('active');
            
            // Animação do ícone
            const icon = folder.querySelector('i');
            if (folder.classList.contains('active')) {
                icon.style.transform = 'rotate(90deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Adiciona efeito hover nos arquivos
    const files = document.querySelectorAll('.file');
    files.forEach(file => {
        file.addEventListener('mouseenter', () => {
            const icon = file.querySelector('i');
            icon.style.transform = 'scale(1.2)';
        });
        
        file.addEventListener('mouseleave', () => {
            const icon = file.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
        
        // Previne que o clique no arquivo feche a pasta
        file.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// Chama a função quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    setupSkillTree();
}); 