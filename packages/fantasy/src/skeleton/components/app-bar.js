import {LitElement, html, css} from 'lit';
import {skeletonAnimated, skeletonBoxSizing, skeletonIcon} from "../styles.js";

export const skeletonAppBarStyles = css`
    .skeleton-app-bar {
        height: 72px;
        background-color: #fff;
        border-bottom: #ECECEE 0.5px solid;
        display: flex;
        padding: 10px 40px;
        align-items: center;
    }

    .skeleton-app-bar__title {
        width: 150px;
        height: 35px;
        border-radius: 4px;
        background-color: #D1D6DE;
    }

    .skeleton-app-bar__icon {
        margin-left: auto;
    }

    .skeleton-app-bar__event-selector {
        width: 430px;
        height: 100%;
        border-radius: 4px;
        background-color: #EBECF0;
        margin-right: auto;
    }
    
    .skeleton-app-bar__label {
        width: 60px;
        height: 16px;
        border-radius: 3px;
        background-color: #D1D6DE;
        margin-left: 30px;
    }
    
    .skeleton-app-bar__button {
        width: 100px;
        height: 30px;
        border-radius: 4px;
        background-color: #F2F2F2;
        margin-left: 30px;
    }
`;

class SkeletonAppBar extends LitElement {
    static styles = [
        skeletonBoxSizing,
        skeletonAnimated,
        skeletonIcon,
        skeletonAppBarStyles,
    ];

    render() {
        return html`
            <div class="skeleton-app-bar">
                <div class="skeleton-animated skeleton-app-bar__title"></div>
                <div class="skeleton-animated skeleton-icon skeleton-app-bar__icon"></div>
            </div>
        `;
    }
}

customElements.define('po-skeleton-app-bar', SkeletonAppBar);