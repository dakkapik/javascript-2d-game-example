class Console {
    constructor() {
        // multiple object tracking implementation needed
        this.window = document.getElementById("console");
        // 2d array, first item is name, second item is value
        this.data = []
    }

    addTracker(label, object){
        this.data.push([label, object]);
        let div = document.createElement("div");
        div.id = label;
        this.window.appendChild(div);
    }

    update(){
        this.data.forEach(([label, obj])=> {
            let doc = document.getElementById(label);
            doc.innerHTML = `${label}: ${obj[label].toFixed(4)}`;
        })
    }
}