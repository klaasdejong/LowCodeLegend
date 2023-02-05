function toPowerFX(obj, indent = "  ") {
    let output = "";
    if (Array.isArray(obj)) {
        output += "[";
        for (let i = 0; i < obj.length; i++) {
            output += "\n" + indent + toPowerFX(obj[i], indent + "  ");
            if (i < obj.length - 1) {
                output += ",";
            }
        }
        output += "\n" + indent.slice(2) + "]";
    } else if (typeof obj === "object") {
        output += "{";
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let newKey = key.replace(/^"(.+(?="$))"$/, '$1');
            let value = obj[key];
            let newValue = typeof value === "string" ? `"${value}"` : value;
            output += "\n" + indent + newKey + ": " + toPowerFX(newValue, indent + "  ");
            if (i < keys.length - 1) {
                output += ",";
            }
        }
        output += "\n" + indent.slice(2) + "}";
    } else {
        output = obj;
    }
    return output;
}

function runRemoveQuotes() {
    let input = document.getElementById("input").value;
    let obj = JSON.parse(input);
    let output = toPowerFX(obj);
    document.getElementById("output").value = output;
}