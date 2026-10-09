// PagesForward — Toast notification system

const container = document.createElement('div');
container.className = 'toast-container';
document.body.appendChild(container);

export function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, duration);
}
