const HIDE_TIMEOUT = 500;
const RESET_TIMEOUT = 700;
const SHOW_ALL_CARDS_TIMEOUT = 1000;

const contentElement = document.querySelector('.content');
const cellElements = contentElement.querySelectorAll('.cell');

const state = {
    isBoardBlocked: false,
    firstCard: null,
    secondCard: null,
};

const resetState = () => {
    state.secondCard = null;
    state.firstCard = null;
    state.isBoardBlocked = false;
}

const hideAllCards = () => {
    state.isBoardBlocked = false;
    cellElements.forEach(card => {
        card.classList.remove('opened');
    })
};

const temporaryShowAllCards = () => {
    state.isBoardBlocked = true;
    cellElements.forEach(card => {
        card.classList.add('opened');
    })

    setTimeout(hideAllCards, SHOW_ALL_CARDS_TIMEOUT);
};

const flipCard = (card) => {
    const isClickOnEqualCard = card === state.firstCard;

    if (
        state.isBoardBlocked ||
        isClickOnEqualCard
    ) {
        return;
    }
    card.classList.add('flip', 'opened');

    if (!state.firstCard) {
        state.firstCard = card;
    } else {
        state.secondCard = card;
        checkIsCardsMatch();
    }
};

const hideMatchCards = () => {
    setTimeout(() => {
        state.firstCard.classList.add('closed');
        state.secondCard.classList.add('closed');
        resetState();
    }, HIDE_TIMEOUT);
};

const blockBoard = () => {
    state.isBoardBlocked = true;

    setTimeout(() => {
        state.firstCard.classList.remove('opened', 'flip');
        state.secondCard.classList.remove('opened', 'flip');

        resetState();
    }, RESET_TIMEOUT);
}

const checkIsCardsMatch = () => {
    if (state.firstCard.innerText === state.secondCard.innerText) {
        return hideMatchCards();
    }

    blockBoard();
}

contentElement.addEventListener('click', function ({ target }) {
    // get parent if click on cell__symbol
    const targetCell = target.closest('.cell');
    if (state.firstCard && state.secondCard) {
        return;
    }

    flipCard(targetCell);
});

const init = () => {
    cellElements.forEach(item => {
        item.style.order = String(Math.floor(Math.random() * cellElements.length));
    });
    temporaryShowAllCards();
};

window.requestAnimationFrame(init);
