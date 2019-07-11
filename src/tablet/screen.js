const setBaseStyling = () => {
    document.body.style.backgroundColor = "#000";
    document.body.style.margin = "0";
};

let outerTextBox, textBox;
const createTextBox = () => {
    // Create the boxes
    outerTextBox = document.createElement("div");
    textBox = document.createElement("h1");
    outerTextBox.appendChild(textBox);
    document.body.appendChild(outerTextBox);
};

const applyBoxStyle = style => {
    // Base styling outer
    outerTextBox.style.padding = "3rem 5rem";
    outerTextBox.style.borderRadius = "2.5rem";
    outerTextBox.style.border = "1.5rem solid";

    // Base text styling
    textBox.style.fontFamily = "sans-serif";
    textBox.style.fontSize = "4rem";
    textBox.style.textAlign = "center";
    textBox.style.color = "rgba(255, 255, 255, .9)";
    textBox.style.margin = "0";
    textBox.style.padding = "0";

    // Style modes
    let r, g, b;
    switch (style) {
        case 1: // Info
            r = 114;
            g = 137;
            b = 218;
            break;
        case 2: // Success
            r = 67;
            g = 181;
            b = 129;
            break;
        case 3: // Warn
            r = 250;
            g = 166;
            b = 26;
            break;
        case 4: // Danger
            r = 240;
            g = 71;
            b = 71;
            break;
        default:
            r = 0;
            g = 0;
            b = 0;
            break;
    }
    outerTextBox.style.backgroundColor = `rgba(${r}, ${g}, ${b}, .3)`;
    outerTextBox.style.borderColor = `rgba(${r}, ${g}, ${b}, .75)`;
};

const centerTextBox = () => {
    outerTextBox.style.position = "absolute";
    outerTextBox.style.left = `${(document.body.clientWidth - outerTextBox.clientWidth) / 2}px`;
    outerTextBox.style.top = `${(document.body.clientHeight - outerTextBox.clientHeight) / 2}px`;
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
        small.style.display = "block";
        textBox.appendChild(small);
    }

    // Center
    centerTextBox();
};

let dataText;
const setDataText = (text) => {
    // Create the elm if it doesn't exist yet
    if (!dataText) {
        dataText = document.createElement("p");
        document.body.appendChild(dataText);
    }

    // Set the text & style
    dataText.textContent = text;
    dataText.style.color = "#fff";
    dataText.style.fontSize = ".7rem";
    dataText.style.fontFamily = "sans-serif";
    dataText.style.padding = ".2rem";

    // Position
    dataText.style.position = "absolute";
    dataText.style.bottom = "0";
    dataText.style.left = "0";
    dataText.style.margin = "0";
};

window.onload = () => {
    setBaseStyling();
    createTextBox();
    applyBoxStyle(1);
    setText("", "...");
    setDataText("");
};
