const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
}

document
  .querySelectorAll('[data-year]')
  .forEach(el => {
    el.textContent = new Date().getFullYear();
  });

const form = document.querySelector('[data-intake-form]');

if (form) {
  form.addEventListener('submit', async event => {
    event.preventDefault();

    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');

    const webhookUrl = form.dataset.webhookUrl;

    if (!webhookUrl) {
      status.textContent =
        'Form configuration error. Please email bill@waypointworkflows.com directly.';
      return;
    }

    status.textContent = 'Sending…';
    button.disabled = true;

    try {
      const payload = Object.fromEntries(
        new FormData(form).entries()
      );

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }

      window.location.href = '/thank-you/';
    } catch (error) {
      console.error('Waypoint intake submission failed:', error);

      status.textContent =
        'We could not send the form. Please email bill@waypointworkflows.com directly.';

      button.disabled = false;
    }
  });
}