/**
 * Youtube embeds
 */

class YoutubePlayer extends HTMLElement {

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

    <iframe src="https://www.youtube.com/embed/${this.dataset.id}?ytp-pause-overlay=0&rel=0&modestbranding=1" frameborder="0" allow="fullscreen" allowfullscreen></iframe>
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
customElements.define("youtube-player", YoutubePlayer);

// ES6 export
export default YoutubePlayer;
