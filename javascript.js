(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    // Wrap images and inject buttons
    const imgs = Array.from(gallery.querySelectorAll('img'));
    imgs.forEach((img) => {
      let wrapper;
      const parent = img.parentElement;

      // if already wrapped, skip
      if (parent && parent.classList && parent.classList.contains('gallery-item')) {
        wrapper = parent;
      } else if (parent && parent.tagName && parent.tagName.toLowerCase() === 'a') {
        // If IMG is inside an <a>, wrap the whole anchor to preserve link behavior
        wrapper = document.createElement('div');
        wrapper.className = 'gallery-item';
        parent.parentNode.insertBefore(wrapper, parent);
        wrapper.appendChild(parent);
      } else {
        // Wrap the image in a div.gallery-item
        wrapper = document.createElement('div');
        wrapper.className = 'gallery-item';
        parent.insertBefore(wrapper, img);
        wrapper.appendChild(img);
      }

      // Create nav buttons
      const leftBtn = document.createElement('button');
      leftBtn.className = 'gallery-nav left';
      leftBtn.setAttribute('aria-label', 'Previous');
      leftBtn.innerHTML = '&#9664;'; // ◄

      const rightBtn = document.createElement('button');
      rightBtn.className = 'gallery-nav right';
      rightBtn.setAttribute('aria-label', 'Next');
      rightBtn.innerHTML = '&#9654;'; // ►

      wrapper.appendChild(leftBtn);
      wrapper.appendChild(rightBtn);

      // pointer events (works for mouse & touch pointers)
      wrapper.addEventListener('pointerenter', () => wrapper.classList.add('hover'));
      wrapper.addEventListener('pointerleave', () => wrapper.classList.remove('hover'));

      // keyboard focus so buttons appear when focused
      wrapper.setAttribute('tabindex', '-1'); // optional but allows focusin/out
      wrapper.addEventListener('focusin', () => wrapper.classList.add('hover'));
      wrapper.addEventListener('focusout', () => wrapper.classList.remove('hover'));

      // button actions
      leftBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(wrapper, 'prev');
      });
      rightBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(wrapper, 'next');
      });

      // optional: arrow-key navigation while hovering
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft')  navigate(wrapper, 'prev');
        if (e.key === 'ArrowRight') navigate(wrapper, 'next');
      });
    });

    // navigation helper
    function navigate(currentWrapper, dir) {
      let target = (dir === 'next') ? currentWrapper.nextElementSibling : currentWrapper.previousElementSibling;

      // skip non-gallery-item siblings
      while (target && !target.classList.contains('gallery-item')) {
        target = (dir === 'next') ? target.nextElementSibling : target.previousElementSibling;
      }

      // wrap-around if needed
      if (!target) {
        if (dir === 'next') {
          target = currentWrapper.parentElement.querySelector('.gallery-item');
        } else {
          const items = currentWrapper.parentElement.querySelectorAll('.gallery-item');
          if (items.length) target = items[items.length - 1];
        }
      }
      if (!target) return;

      // if the target contains an anchor, follow it (useful if your images link to pages)
      const anchor = target.querySelector('a[href]');
      if (anchor && anchor.href) {
        // if it's the same origin, follow normally; otherwise it still navigates
        window.location.href = anchor.href;
        return;
      }

      // otherwise scroll target into view and give brief highlight
      target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      target.classList.add('gallery-flash');
      setTimeout(() => target.classList.remove('gallery-flash'), 700);
    }
  });
})();