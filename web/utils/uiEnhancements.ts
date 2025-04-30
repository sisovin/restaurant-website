export const smoothScroll = (targetId) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};

export const showLoadingState = (isLoading) => {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = isLoading ? 'block' : 'none';
  }
};

export const customAnimations = {
  fadeIn: (element) => {
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s';
    element.style.opacity = 1;
  },
  fadeOut: (element) => {
    element.style.opacity = 1;
    element.style.transition = 'opacity 0.5s';
    element.style.opacity = 0;
  },
};

export const showToastNotification = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

export const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
};

export const toggleMobileMenu = () => {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
  }
};
