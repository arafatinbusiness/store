/**
 * Tula Medical Equipment - Global Theme JS
 * Handles AJAX Cart, UI Interactions, and E-commerce optimizations
 */

class TulaTheme {
  constructor() {
    this.initCart();
    this.initFAQ();
    this.initHeader();
  }

  /**
   * AJAX Cart Integration
   * Demonstrates Requirement #1: AJAX API knowledge
   */
  async initCart() {
    const cartIcon = document.querySelector('#cart-icon-bubble');
    if (!cartIcon) return;

    // Example: Fetch current cart state
    try {
      const response = await fetch(`${window.routes.cart_url}.js`);
      const cart = await response.json();
      this.updateCartBubble(cart.item_count);
    } catch (e) {
      console.error('Failed to fetch cart', e);
    }

    // Listen for add-to-cart events
    document.addEventListener('cart:add', async (e) => {
      const { id, quantity } = e.detail;
      await this.addToCart(id, quantity);
    });
  }

  async addToCart(id, quantity = 1) {
    const formData = {
      'items': [{ 'id': id, 'quantity': quantity }]
    };

    try {
      const response = await fetch(window.routes.cart_add_url + '.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const item = await response.json();
      
      // Refresh cart bubble
      const cartRes = await fetch(window.routes.cart_url + '.js');
      const cart = await cartRes.json();
      this.updateCartBubble(cart.item_count);
      
      // Trigger success UI (e.g., mini-cart open)
      console.log('Added to cart:', item);
    } catch (e) {
      console.error('Add to cart failed', e);
    }
  }

  updateCartBubble(count) {
    const bubble = document.querySelector('.cart-count-bubble span');
    if (bubble) bubble.textContent = count;
  }

  /**
   * UI Interactions
   */
  initFAQ() {
    const triggers = document.querySelectorAll('.faq-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', !expanded);
        const content = trigger.nextElementSibling;
        content.hidden = expanded;
      });
    });
  }

  initHeader() {
    let lastScroll = 0;
    const header = document.querySelector('.header-wrapper');
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.classList.add('header--sticky');
      } else {
        header.classList.remove('header--sticky');
      }
      lastScroll = currentScroll;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.tula = new TulaTheme();
});
