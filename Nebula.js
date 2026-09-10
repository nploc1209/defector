export default function bot({ history, memory }) {
    const A = ["C", "D", "C", "C", "D", "C"]
    const F = ["C", "D", "C", "C", "D", "C", "D"]
    memory = memory ?? {
        canExploit: true,
        fullCoop: true,
        streakDeffect: 0,
        haveD: false,
        isFortuna: false,
        verified: false
    };

    const round = history.length + 1;

    if (history.length <= 6) return [F[history.length], memory];

    if (history.length === 7) {
        memory.isFortuna = true;
        for (let i = 0; i < F.length; i++) {
            if (history.at(i).opponent !== F[i]) memory.isFortuna = false;
        }

        for (let i = 0; i < A.length; i++) {
            if (history.at(i).opponent !== A[i]) memory.canExploit = false;
            if (history.at(i).opponent === "D") memory.fullCoop = false;
        }

        return ["D", memory];
    }

    if (memory.isFortuna) {
        if (round % 12 === 0 || round % 21 === 0) {
            if (history.at(-1).opponent === "C") {
                memory.verified = true;
                return ["C", memory];
            }

            memory.isFortuna = false;
            memory.verified = false;
        }

        if (memory.isFortuna && memory.verified) return ["C", memory];
        if (memory.isFortuna) return ["C", memory];
    }

    if (history.length && history.at(-1).opponent === "D") memory.streakDeffect++;
    else memory.streakDeffect = 0;
    if (memory.streakDeffect >= 6) return ["D", memory];

    if (history.length > 7 && history.at(-1).opponent === "D") memory.haveD = true;

    if (memory.fullCoop) return ["D", memory];
    else if (memory.canExploit) {
        let move = "D";
        if (memory.haveD) move = Math.random() < 0.5 ? "D" : "C";
        return [move, memory];
    }
    return ["C", memory];
}