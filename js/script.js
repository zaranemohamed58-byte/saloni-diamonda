document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');
  const diamondsInput = document.getElementById('diamonds');
  const priceInput = document.getElementById('price');
  const resultEl = document.getElementById('result');
  const resultBox = document.getElementById('resultBox');
  const errorMessage = document.getElementById('errorMessage');
  const copyBtn = document.getElementById('copyBtn');
  const resetBtn = document.getElementById('resetBtn');
  const contactForm = document.querySelector('.contact-form');
  const newsletterForms = document.querySelectorAll('.newsletter-form');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  });

  if (diamondsInput && priceInput && resultEl && resultBox) {
    const handleInput = () => calculateLive(diamondsInput, priceInput, resultEl, resultBox, errorMessage);
    diamondsInput.addEventListener('input', handleInput);
    priceInput.addEventListener('input', handleInput);
    handleInput();
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      if (resultEl) {
        try {
          await navigator.clipboard.writeText(resultEl.textContent || '');
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy Result'; }, 1600);
        } catch (error) {
          copyBtn.textContent = 'Copy failed';
          setTimeout(() => { copyBtn.textContent = 'Copy Result'; }, 1600);
        }
      }
    });
  }

  if (resetBtn && diamondsInput && priceInput) {
    resetBtn.addEventListener('click', () => {
      diamondsInput.value = '';
      priceInput.value = '15';
      calculateLive(diamondsInput, priceInput, resultEl, resultBox, errorMessage);
    });
  }

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      if (item) item.classList.toggle('open');
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const statusEl = contactForm.querySelector('.form-status');
      if (submitButton) {
        submitButton.textContent = 'Message sent';
        submitButton.disabled = true;
        setTimeout(() => {
          submitButton.textContent = 'Send message';
          submitButton.disabled = false;
        }, 1800);
      }
      if (statusEl) {
        statusEl.textContent = 'Thanks! Your message has been sent.';
      }
      contactForm.reset();
    });
  }

  newsletterForms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const statusEl = form.querySelector('.form-status');
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = 'Subscribed';
        submitButton.disabled = true;
        setTimeout(() => {
          submitButton.textContent = 'Subscribe';
          submitButton.disabled = false;
        }, 1800);
      }
      if (statusEl) {
        statusEl.textContent = 'Thanks for subscribing!';
      }
      form.reset();
    });
  });

  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 24);
    }
  });
});

function calculateLive(diamondsInput, priceInput, resultEl, resultBox, errorMessage) {
  const diamonds = Number(diamondsInput.value.trim());
  const price = Number(priceInput.value.trim());
  const isInvalidDiamonds = Number.isNaN(diamonds) || diamonds < 0;
  const isInvalidPrice = Number.isNaN(price) || price < 0;

  if (isInvalidDiamonds) {
    displayError('Enter a valid diamond quantity.', resultBox, errorMessage, resultEl);
    return;
  }

  if (isInvalidPrice) {
    displayError('Enter a valid price per 100 diamonds.', resultBox, errorMessage, resultEl);
    return;
  }

  clearError(resultBox, errorMessage);
  const total = (diamonds / 100) * price;
  const formatted = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  resultEl.textContent = `${formatted} DH`;
  resultBox.classList.add('pulse');
  window.clearTimeout(resultBox.pulseTimeout);
  resultBox.pulseTimeout = window.setTimeout(() => resultBox.classList.remove('pulse'), 300);
}

function displayError(message, resultBox, errorMessage, resultEl) {
  if (errorMessage) errorMessage.textContent = message;
  if (resultBox) {
    resultBox.classList.add('error');
  }
  if (resultEl) resultEl.textContent = '0 DH';
}

function clearError(resultBox, errorMessage) {
  if (errorMessage) errorMessage.textContent = '';
  if (resultBox) {
    resultBox.classList.remove('error');
  }
}
