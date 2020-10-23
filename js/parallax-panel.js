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
        min-height: 75vw;
        display: grid;
        grid-template-columns: minmax(auto, var(--content-width)) 1fr;
        align-content: end;
        background-color: var(--background-color);
      }

      @media(orientation: portrait) {
        :host {
          min-height: 150vw;
        }
      }

      .background::slotted(*) {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .screen {
        position: relative;
        padding: var(--spacing);
        color: var(--accent-text);
        background-color: var(--accent-color);
        mix-blend-mode: hard-light;
      }

      .content {
        display: block;
        max-width: var(--content-width);
      }
    </style>

    <slot class="background" name="background"></slot>

    <div class="screen">
      <slot class="content"></slot>
    </div>
    `;
    return t;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }
}

// Register the element
customElements.define("parallax-panel", ParallaxPanel);

// ES6 export
export default ParallaxPanel;
