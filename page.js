let outerTextBox, textBox;
const createTextBox = () => {
    // Create the boxes
    outerTextBox = document.createElement("div");
    textBox = document.createElement("h1");
    outerTextBox.appendChild(textBox);
    document.body.appendChild(outerTextBox);
};

const setText = (main, sub) => {
    // Don't continue if textBox not established
    if (!textBox) return;

    // Wipe the textBox
    while (textBox.firstChild) {
        textBox.removeChild(textBox.firstChild);
    }

    // Create the new main text
    const text = document.createTextNode(main);
    textBox.appendChild(text);

    // Create the new small text
    if (sub) {
        const small = document.createElement("small");
        small.textContent = sub;
        textBox.appendChild(small);
    }
};

createTextBox();
setText("hello", "world!");
