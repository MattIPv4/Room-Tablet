const request = (type, url, callback, data) => {
    const xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    if (data) xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const resp = JSON.parse(xhr.responseText);
            callback(resp);
        }
    };
    xhr.send(data ? JSON.stringify(data) : null);
};

const setText = () => {
    const large = document.getElementById("textLarge").value;
    const small = document.getElementById("textSmall").value;
    const data = {large, small};
    request("PATCH", "api/text", (res) => {}, data);
};

const setStyle = () => {
    const radios = document.getElementsByName("style");
    let style;
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            style = parseInt(radios[i].value);
            break;
        }
    }
    request("PATCH", "api/style", (res) => {}, {style});
};

const preset = (large, small, style) => {
    document.getElementById("textLarge").value = large;
    document.getElementById("textSmall").value = small;

    const radios = document.getElementsByName("style");
    for (let i = 0, length = radios.length; i < length; i++) {
        radios[i].checked = parseInt(radios[i].value) === style;
    }

    document.getElementById("setTextBtn").click();
    document.getElementById("setStyleBtn").click();
};

const setDisplay = brightness => {
    request("PATCH", "api/display", (res) => {}, {brightness});
};

const callQuit = () => {
    request("GET", "api/quit", (res) => {});
};

const callRestart = () => {
    request("GET", "api/restart", (res) => {});
};

const callUpdate = () => {
    request("GET", "api/update", (res) => {});
};
