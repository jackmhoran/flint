import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('text')
export class Text extends LitElement {
  

  static styles = css`
    :host {
      display: block;
      line-height: 2rem;
    }
    
    ::slotted(*) {
      display: inline;
      line-height: 2rem;
    }
  `
  render() {
    return html`
        <slot></slot> 
        <br />
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'text': Text
  }
}

