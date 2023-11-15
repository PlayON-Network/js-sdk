import {css} from 'lit';

export const skeletonMainContentStyles = css`
  :host {
    overflow: hidden;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 25px;
  }

  .skeleton-main__item {
    height: 100%;
    border-radius: 10px;
    margin: 15px;
    background-color: #EBECF0;
  }
`;