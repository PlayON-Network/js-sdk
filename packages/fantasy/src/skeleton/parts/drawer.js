import {LitElement, html} from 'lit';
import {skeletonBoxSizing, skeletonLogoSm} from "../styles.js";
import "../components/drawer.js";
import "../components/drawer/tile.js";
import "../components/drawer/divider.js";
import "../components/drawer/logo.js";

class SkeletonFantasyDrawer extends LitElement {
    static styles = [
        skeletonBoxSizing,
    ];

    render() {
        return html`
            <po-skeleton-drawer>
                <slot name="logo"></slot>
                <po-skeleton-drawer-tile modifier="competition"></po-skeleton-drawer-tile>
                <po-skeleton-drawer-tile class="first"></po-skeleton-drawer-tile>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-divider></po-skeleton-drawer-divider>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-divider></po-skeleton-drawer-divider>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-divider></po-skeleton-drawer-divider>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
                <po-skeleton-drawer-tile></po-skeleton-drawer-tile>
            </po-skeleton-drawer>
        `;
    }
}

customElements.define('po-fantasy-drawer', SkeletonFantasyDrawer);
