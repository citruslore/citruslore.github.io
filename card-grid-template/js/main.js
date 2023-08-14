CardGridTemplate = (function () {
    const dom = {
        body: document.querySelector('body'),
        palette: document.querySelector('.palette'),
        cards: document.querySelectorAll('.card'),
        mainPaletteCards: document.querySelectorAll('.main-palette-card'),
        selectedCard: null
    }

    function init () {
        dom.body.addEventListener('click', e => {
            if (e.target.classList.contains('card')) {
                cardSelect(e.target);
                showPalette();
            } else if (e.target.classList.contains('palette-card')) {
                cardSet(dom.selectedCard, e.target.firstChild.src);
                hidePalette();
            } else if (e.target.classList.contains('toolbar-button-clear')) {
                templateClear();
                hidePalette();
            } else if (e.target.classList.contains('toolbar-button-random')) {
                templateRandomize();
                hidePalette();
            } else if (e.target.classList.contains('toolbar-button-print')) {
                hidePalette();
                templatePrint();
            } else {
                hidePalette();
            }
        });
    }

    function cardSelect (element) {
        if (dom.selectedCard) dom.selectedCard.classList.remove('selected');

        dom.selectedCard = element;
        dom.selectedCard.classList.add('selected');
    }

    function cardSet (card, src) {
        card.firstChild.setAttribute('src', src);
    }

    function showPalette () {
        dom.palette.style.display = `grid`;

        const pos = dom.selectedCard.getBoundingClientRect();
        const rect = dom.palette.getBoundingClientRect();

        let x = Math.max(0, Math.min(pos.left + 15, window.innerWidth - rect.width));
        let y = Math.max(0, Math.min(pos.top - (rect.height / 2) + 30, window.innerHeight - rect.height));

        dom.palette.style.left = `${x}px`;
        dom.palette.style.top = `${y}px`;
    }

    function hidePalette () {
        dom.palette.style.display = `none`;
    }

    function templateClear () {
        dom.cards.forEach(card => {
            card.firstChild.src = 'images/cards/blank.svg';
        });

        if (dom.selectedCard) dom.selectedCard.classList.remove('selected');
        dom.selectedCard = null;
    }

    function templateRandomize () {
        const deck = [];
        dom.mainPaletteCards.forEach(card => deck.push(card.firstChild.src, card.firstChild.src));

        const shuffled = deck.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        dom.cards.forEach(card => {
            card.firstChild.src = shuffled.pop();
        });

        if (dom.selectedCard) dom.selectedCard.classList.remove('selected');
        dom.selectedCard = null;
    }

    function templatePrint () {
        if (dom.selectedCard) dom.selectedCard.classList.remove('selected');
        dom.selectedCard = null;
        print();
    }

    init();
    return {};
})();
