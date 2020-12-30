/**
 * Simple animation on intersection
 */

class AnimateIn extends HTMLElement {

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host {
        display: block;
        overflow: hidden;
      }

      .container {
        transition: transform 1s, opacity 2s;
        transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
      }

      .container.offscreen {
        opacity: 0;
        transform: translateY(100px);
      }

      :host([from=left]) .container.offscreen {
        transform: translateX(-100vw);
      }

      :host([from=right]) .container.offscreen {
        transform: translateX(100vw);
      }
    </style>

    <div class="container">
      <slot></slot>
    </div>
    `;
    return t;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    let observer = new IntersectionObserver(this.handleIntersection, {
      rootMargin: "0px 0px -100px 0px"
    });
    observer.observe(this)
  }

  handleIntersection(entries, observer) {
    entries.forEach(entry => {
      let container = entry.target.shadowRoot.querySelector(".container");

      if(entry.isIntersecting) {
        container.classList.remove("offscreen");
      } else if(entry.boundingClientRect.top > entry.rootBounds.height) {
        container.classList.add("offscreen");
      }
    });
  }
}

// Register the element
customElements.define("animate-in", AnimateIn);

// ES export
export default AnimateIn;
