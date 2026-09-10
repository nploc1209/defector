export default function bot({ history: h, memory: m }) {
  const HS = ["C","D","C","C","D","D","C","D","C","C","D","C","D","D","C","C","D","C","D","D","C","C","D","D","C","D","C","D","C","C","D","C"];
  const HL = HS.length;
  const RR = 2;
  const IL = false;

  if (!m) {
    m = {
      s: "H",
      hs: 0,
      nm: {
        om: [],
        mm: [],
        lom: null,
        or: null,
        cd: 0,
        cc: 0,
      }
    };
  }

  const nm = m.nm;
  const r = h.length;

  if (m.s === "H") {
    const step = m.hs;
    if (step < HL) {
      const exp = HS[step];
      const opp = h[step]?.opponent;
      if (opp !== exp) {
        m.s = "N";
        nm.om = h.map(x => x.opponent).slice(-10);
        nm.mm = h.map(x => x.you).slice(-10);
        nm.lom = h[step]?.opponent || null;
        return dn(h, m);
      }
      m.hs = step + 1;
      return [exp, m];
    } else if (step < HL + RR) {
      const my = "C";
      const opp = h[step]?.opponent;
      let ok = (opp === "D" || opp === "C");
      if (!ok) {
        m.s = "N";
        nm.om = h.map(x => x.opponent).slice(-10);
        nm.mm = h.map(x => x.you).slice(-10);
        nm.lom = h[step]?.opponent || null;
        return dn(h, m);
      }
      nm.or = opp === "D" ? "L" : "S";
      m.hs = step + 1;
      return [my, m];
    } else {
      m.s = "T";
      return dt(h, m);
    }
  }

  if (m.s === "T") return dt(h, m);
  if (m.s === "N") return dn(h, m);

  return ["C", m];
}

function dt(h, m) {
  return ["C", m];
}

function dn(h, m) {
  const nm = m.nm;
  const r = h.length;
  const last = h[r-1];
  const opp = last ? last.opponent : null;
  const my = last ? last.you : null;

  if (opp) {
    nm.om.push(opp);
    if (nm.om.length > 10) nm.om.shift();
    nm.lom = opp;
  }
  if (my) {
    nm.mm.push(my);
    if (nm.mm.length > 10) nm.mm.shift();
  }

  if (nm.om.length >= 10) {
    const dr = nm.om.filter(mv => mv === "D").length / nm.om.length;
    if (dr <= 0.1) return ["D", m];
    if (dr >= 0.9) return ["D", m];
  }

  if (last && last.opponent === "D") return ["D", m];
  if (last && last.opponent === "C") {
    const mdr = nm.mm.filter(mv => mv === "D").length / Math.max(1, nm.mm.length);
    if (mdr < 0.35) return ["D", m];
    return ["C", m];
  }
  return ["C", m];
}