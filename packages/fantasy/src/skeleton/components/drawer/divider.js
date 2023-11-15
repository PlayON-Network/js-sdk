import {LitElement, html, css} from 'lit';
import {skeletonBoxSizing} from "../../styles.js";

class SkeletonDrawerDivider extends LitElement {
    static properties = {
        modifier: {type: String},
        class: {type: String},
    };

    static styles = [
        skeletonBoxSizing,
        css`:host {
          width: 100%;
          min-height: 2px;
          background-color: #ECECEE;
          margin: 10px 0;
        }`,
    ];
}

customElements.define('po-skeleton-drawer-divider', SkeletonDrawerDivider);