export default function bot({ history, memory }) {
    memory = memory ?? { opponentDefected: false }
    if (history.lenght === 0)
        return ["C", null]

    const lastOpponentMove = history.at(-1)?.opponent
    if (lastOpponentMove === "D")
        memory.opponentDefected = true

    const move = memory.opponentDefected ? "D" : "C"
    return [move, memory]
}