/**
 * Easier Vimeo Embeds
 */

class VimeoPlayer extends HTMLElement {
  
  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host {
        position: relative;
        padding-top: 56.25%;
      }

      iframe {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    </style>

    <iframe src="https://player.vimeo.com/video/${this.dataset.id}" frameborder="0" allow="fullscreen"></iframe>
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
customElements.define("vimeo-player", VimeoPlayer);

// ES6 export
export default VimeoPlayer;
