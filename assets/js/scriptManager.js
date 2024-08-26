// scriptManager.js
export function initScripts() {
    const bio = document.querySelector('.bio');
    const parcour = document.querySelector('.parcour');

    if (bio && parcour) {
        bio.addEventListener("mouseenter", () => {
            if(bio.classList.contains("darkbg")) {
                bio.classList.remove('darkbg');
                parcour.classList.add("darkbg");
            } else {
                bio.classList.add('darkbg');
                parcour.classList.remove("darkbg");
            }
        });

        parcour.addEventListener("mouseenter", () => {
            if(parcour.classList.contains("darkbg")) {
                parcour.classList.remove("darkbg");
                bio.classList.add('darkbg');
            } else {
                parcour.classList.add("darkbg");
                bio.classList.remove('darkbg');
            }
        });
    }
}
