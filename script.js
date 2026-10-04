/* ==========================================================================
   Abhishek Sen — Personal Academic Portfolio Scripts
   Clean, lightweight interaction (tabs, image lightbox, mobile nav)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = window.getComputedStyle(navMenu).display === 'none';
      navMenu.style.display = isHidden ? 'flex' : 'none';
      if (isHidden) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '64px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#0b0f19';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid #1e293b';
        navMenu.style.gap = '1rem';
      }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          navMenu.style.display = 'none';
        }
      });
    });
  }

  // Achievement Tab Switching
  const tabs = document.querySelectorAll('.ach-tab');
  const panels = document.querySelectorAll('.ach-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Lightbox / Image Modal
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.querySelector('.modal-close');

  const openModal = (src, caption) => {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = caption || 'Certificate / Photograph Preview';
    if (modalCaption) modalCaption.textContent = caption || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const src = el.getAttribute('data-src') || el.querySelector('img')?.src;
      const caption = el.getAttribute('data-caption') || el.querySelector('img')?.alt || '';
      if (src) openModal(src, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
