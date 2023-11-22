import {LitElement, html, css} from 'lit';
import {skeletonBoxSizing} from "../styles.js";

export class SkeletonDrawer extends LitElement {
    static styles = [
        skeletonBoxSizing,
        css`:host {
          background-color: var(--drawer-color, #fff);
          width: 74px;
          height: 100%;
          border-right: var(--drawer-border-color, #ECECEE) 1px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 25px 15px 0;
          overflow: hidden;
          box-sizing: border-box;

          @media (min-width: 1440px) {
            width: 250px;
          }
        }`,
    ];

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define('po-skeleton-drawer', SkeletonDrawer);