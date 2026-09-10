export default function bot({ history, memory }) {
    memory = memory ?? {
        alwaysDefected: false,
        alwaysCoop: false,
        titForTat: false,
        isRandom: false,
        cntDefected: 0,
        cntCoop: 0
    };

    if (history.length !== 0) {
        if (history.at(-1).opponent === "D") memory.cntDefected++;
        else memory.cntCoop++;
    }

    if (history.length === 10) {
        if (Math.abs(memory.cntCoop - memory.cntDefected) <= 2) memory.isRandom = true;
    }

    if (history.length === 0) {
        return ["D", memory];
    } else if (history.at(0).opponent === "D") {
        memory.alwaysDefected = true;
    }

    if (history.length === 2) {
        if (history.at(1).opponent === "C") {
            memory.alwaysCoop = true;
        } else {
            memory.titForTat = true;
        }
    }

    if (memory.alwaysDefected || memory.alwaysCoop || memory.isRandom || history.length >= 101) {
        return ["D", memory];
    } else {
        const move = history.at(-1).opponent;
        return [move, memory];
    }
}