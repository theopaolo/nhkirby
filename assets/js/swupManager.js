// swupManager.js
import Swup from 'swup';

export function initSwup(onContentReplaced) {
    const swup = new Swup();

    swup.on('contentReplaced', () => {
        if (onContentReplaced) {
            onContentReplaced();
        }
    });

    return swup;
}
