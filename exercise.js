let nrOfSpins = 4;
let betAmount = prompt('Enter a bet amount:');

const boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const multipliers = ['x15', 'x16', 'x17', 'x18', 'x19', 'x20'];

let boxesOpened = [];
let multipliersFound = [];

// Select three multipliers from the array
function selectThreeMultipliers() {
    const selectedMultipliers = [];

    while (selectedMultipliers.length < 3) {
        const randomIndex = Math.floor(Math.random() * multipliers.length);
        const randomMultiplier = multipliers[randomIndex];

        if (!selectedMultipliers.includes(randomMultiplier))
            selectedMultipliers.push(randomMultiplier);
    }

    return selectedMultipliers;
}

// From the selected multipliers set one randomly on each box
function setMultiplierOnBoxes() {
    const selectedMultipliers = selectThreeMultipliers();

    let valueCounter = 0;
    let result = [];

    multipliersShuffled = shuffle([...selectedMultipliers]);

    for (let i = 0; i < boxes.length; i++) {
        const key = boxes[i];
        const value = multipliersShuffled[valueCounter];

        result.push({ key, value });

        valueCounter++;

        if (valueCounter === multipliersShuffled.length) {
            valueCounter = 0;
        }

        if (i % 3 === 2) {
            valueCounter++;
        }
    }

    console.log(result);
    return result;
}

// Shuffle array method
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Check the multipliers array if it repeats twice
function checkRepeats(multipliersArray) {
    const counter = {};

    for (let i = 0; i < multipliersArray.length; i++) {
        const multipliersArrayValue = multipliersArray[i];
        if (counter[multipliersArrayValue]) {
            counter[multipliersArrayValue]++;
        } else {
            counter[multipliersArrayValue] = 1;
        }

        if (counter[multipliersArrayValue] === 2) {
            return true;
        }
    }

    return false;
}

let setupBoxes = setMultiplierOnBoxes();
showBoxesInConsole();

// Spin event on SPACEBAR
function spaceToSpin(event) {
    if (event.key === ' ') {
        console.log('Spacebar pressed');
        // Spin Logic
        const randomBox = Math.floor(Math.random() * setupBoxes.length) + 1;

        if (!boxesOpened.includes(randomBox)) {
            boxesOpened.push(randomBox);
            multipliersFound.push(setupBoxes[randomBox - 1].value);

            showBoxesInConsole(randomBox);

            let winCondition = checkRepeats(multipliersFound);
            if (winCondition) {
                const lastValue = multipliersFound[multipliersFound.length - 1];
                const numberOnly = lastValue.substring(1);
                alert(`You win ${betAmount * numberOnly}`);
                location.reload();
            }

            console.log(boxesOpened);
        } else {
            spaceToSpin({ key: ' ' });
        }
    }
}

document.addEventListener('keydown', spaceToSpin);

// prettier-ignore
function showBoxesInConsole(value) {
    console.log('-------------------------');
    console.log(`|   ${value == 1 ? setupBoxes[0].value : setupBoxes[0].key}   |   ${value == 2 ? setupBoxes[1].value : setupBoxes[1].key}   |   ${value == 3 ? setupBoxes[2].value : setupBoxes[2].key}   |`);
    console.log(`|   ${value == 4 ? setupBoxes[3].value : setupBoxes[3].key}   |   ${value == 5 ? setupBoxes[4].value : setupBoxes[4].key}   |   ${value == 6 ? setupBoxes[5].value : setupBoxes[5].key}   |`);
    console.log(`|   ${value == 7 ? setupBoxes[6].value : setupBoxes[6].key}   |   ${value == 8 ? setupBoxes[7].value : setupBoxes[7].key}   |   ${value == 9 ? setupBoxes[8].value : setupBoxes[8].key}   |`);
    console.log('-------------------------');
    console.log('Press [SPACE] to spin');
}
