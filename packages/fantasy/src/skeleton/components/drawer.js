import {LitElement, html, css} from 'lit';

export class SkeletonDrawer extends LitElement {
    static styles = [
        css`:host {
          box-sizing: border-box;
        }`,
        css`.skeleton-drawer {
          width: 74px;
          height: 100%;
          background-color: #fff;
          border-right: #ECECEE 1px solid;
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
        return html`
            <div class="skeleton-drawer">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('po-skeleton-drawer', SkeletonDrawer);