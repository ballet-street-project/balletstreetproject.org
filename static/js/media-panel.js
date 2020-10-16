/**
 * Media panel custom element
 */

class MediaPanel extends HTMLElement {

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host {
        --column: 1/-1;
        position: relative;
        min-height: var(--panel-height);
        background-color: var(--background-color);
        overflow: hidden;
        display: flex;
        align-items: flex-end;
      }

      .background::slotted(*) {
        position: absolute;
        top: -10%;
        left: 0;
        width: 100%;
        height: 120%;
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
customElements.define("media-panel", MediaPanel);

// ES6 export
export default MediaPanel;
