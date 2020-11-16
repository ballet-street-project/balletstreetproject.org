/**
 * Parallax panel custom element
 */

class ParallaxPanel extends HTMLElement {

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host {
        --column: 1/-1;
        position: relative;
        display: grid;
        grid-template-columns: minmax(auto, var(--content-width)) 1fr;
        align-content: end;
        background-color: var(--background-color);
        min-height: var(--landscape-height, 75vw);
        overflow: hidden;
      }

      @media(orientation: portrait) {
        :host {
          min-height: var(--portrait-height, 180vw);
        }
      }

      .background {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
      }

      .background::slotted(*) {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .content {
        display: block;
        position: relative;
        max-width: var(--content-width);
     }
    </style>

    <slot class="background" name="background"></slot>
    <slot class="content"></slot>
    `;
    return t;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

    // Convenience
    this._background = this.shadowRoot.querySelector(".background");
  }

  connectedCallback() {
    observer.observe(this);

    // Shuffle possible backgrounds if set
    if(this.dataset.shuffle == "background") {
      const backgrounds = this.querySelectorAll("[slot=background][hidden]");
      const random = Math.floor(Math.random() * backgrounds.length);
      backgrounds.item(random).hidden = false;
    }
  }

  disconnectedCallback() {
    observer.unobserve(this);
  }

  start() {
    const bbox = this.getBoundingClientRect();
    const yPos = -(bbox.y * this.speed) / 100;
    this._background.style.transform = `translate3d(0, ${yPos}px, 0)`;
    this._af = window.requestAnimationFrame(this.start.bind(this));
  }

  stop() {
    window.cancelAnimationFrame(this._af);
  }

  get speed() {
    return this.dataset.speed || 10;
  }
}

/**
 * Intersection Observer
 */

const handleIntersect = (entries) => {
  entries.forEach(entry => {
    entry.isIntersecting ? entry.target.start() : entry.target.stop();
  });
}

const observer = new IntersectionObserver(handleIntersect);

// Register the element
customElements.define("parallax-panel", ParallaxPanel);

// ES6 export
export default ParallaxPanel;
