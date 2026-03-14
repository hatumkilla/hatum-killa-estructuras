document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.querySelector('.nav-menu').classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // ================================
    // TABS con auto-rotación cada 4 s
    // ================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const progressBar = document.getElementById('tabProgressBar');
    const carousel = document.getElementById('servicesCarousel');
    const TAB_DURATION = 4000; // ms por tab
    let currentTabIndex = 0;
    let autoTimer = null;
    let progressStart = null;
    let progressFrame = null;

    // Activa un tab por índice
    function activateTab(index) {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        tabBtns[index].classList.add('active');
        const targetId = tabBtns[index].getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    }

    // Anima la barra de progreso
    function startProgress() {
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            // Fuerza reflow para reiniciar la animacion
            progressBar.offsetWidth;
            progressBar.style.transition = `width ${TAB_DURATION}ms linear`;
            progressBar.style.width = '100%';
        }
    }

    // Avanza al siguiente tab
    function nextTab() {
        currentTabIndex = (currentTabIndex + 1) % tabBtns.length;
        activateTab(currentTabIndex);
        startProgress();
    }

    // Inicia el ciclo automático
    function startAutoRotate() {
        clearInterval(autoTimer);
        autoTimer = setInterval(nextTab, TAB_DURATION);
        startProgress();
    }

    // Clic manual: cambia tab y reinicia el ciclo
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentTabIndex = index;
            activateTab(currentTabIndex);
            startAutoRotate();
        });
    });

    // Pausa al pasar el mouse sobre la sección de servicios
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoTimer);
            if (progressBar) {
                // Congela la barra donde está
                const computed = getComputedStyle(progressBar);
                progressBar.style.transition = 'none';
                progressBar.style.width = computed.width;
            }
        });
        carousel.addEventListener('mouseleave', () => {
            startAutoRotate();
        });
    }

    // Arranca la auto-rotación al cargar
    startAutoRotate();
});
