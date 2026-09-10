export default function bot({ history, memory }) {
    const A = ["C", "D", "C", "C", "D", "C"]
    const B = ["C", "C", "C", "D", "D", "D"]
    memory = memory ?? {
        canExploit: true,
        canColab: true,
        fullCoop: true,
        streakDeffect: 0,
        haveD: false,
        lucky: true
    };

    if (memory.streakDeffect > 5) return ["D", memory];
    if (history.length && history.at(-1).opponent === "D") memory.streakDeffect++;
    else memory.streakDeffect = 0;
    if (history.length <= 5) return [B[history.length], memory];
    if (history.length === 6) {
        for (let i = 0; i < A.length; i++) {
            if (history.at(i).opponent !== A[i]) memory.canExploit = false;
            if (history.at(i).opponent !== B[i]) memory.canColab = false;
            if (history.at(i).opponent === "D") memory.fullCoop = false;

        }
        return ["D", memory];
    }
    if (history.length > 6) memory.haveD = true;

    const p = ["30", "111"].map(x => parseInt(x, 4));
    if (p.some(n => history.length % n === 0) && history.at(-1).opponent !== "C") memory.lucky = false;

    if (memory.fullCoop) return ["D", memory];
    else if (memory.canColab) {
        if (p.some(n => history.length % n === 0)) return ["C", memory];
        else return ["D", memory];
    } else if (memory.canExploit) {
        let move = "D";
        if (memory.haveD) move = Math.random() < 0.4 ? "D" : "C";
        return [move, memory];
    } else if (memory.lucky) {
        return ["C", memory];
    }
    return ["C", memory];
}