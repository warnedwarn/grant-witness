"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { connect, EXPLORER, read, write } from "../lib/chain";
const stops = [
  {
    n: "01",
    name: "Baseline",
    sub: "Survey public need",
    amount: "18K",
    state: "RELEASED",
    copy: "Six neighbourhood councils signed the baseline and published the initial air-quality map.",
  },
  {
    n: "02",
    name: "Mesh",
    sub: "Deploy civic sensors",
    amount: "42K",
    state: "IN WITNESS",
    copy: "The network is live. Two councils still need calibration kits before custody can transfer.",
  },
  {
    n: "03",
    name: "Commons",
    sub: "Publish operations guide",
    amount: "20K",
    state: "LOCKED",
    copy: "Documentation unlocks after the sensor mesh passes independent witness review.",
  },
];
function Skeleton() {
  return (
    <main className="skeleton">
      <div className="pulse">
        <i />
        <i />
        <i />
      </div>
      <b>FOLLOWING THE FUNDS</b>
    </main>
  );
}
export default function Page() {
  const [loading, setLoading] = useState(true),
    [step, setStep] = useState(1),
    [open, setOpen] = useState(false),
    [account, setAccount] = useState(""),
    [status, setStatus] = useState(""),
    [hash, setHash] = useState(""),
    [record, setRecord] = useState<any>(null);
  async function wallet() {
    try {
      setAccount(await connect());
    } catch (e: any) {
      setStatus(e.message);
    }
  }
  async function witness() {
    try {
      const packageId = `GW-${Date.now()}`;
      await write(
        "submit_witness_package",
        [
          packageId,
          "Build and transfer an open sensor network to six neighbourhood councils.",
          [
            "Six sensor locations published",
            "Public readings remain openly accessible",
            "Operational custody accepted by every council",
          ],
          "Deploy community sensor mesh",
          ["https://www.who.int/publications/i/item/9789240090259"],
          BigInt(42000),
        ],
        (s, h) => {
          setStatus(s);
          if (h) setHash(h);
        },
      );
      setStatus("READING RECORDED WITNESS");
      const [charter, milestone, witnessed] = await Promise.all([
        read<any>("get_charter", [packageId]),
        read<any>("get_milestone", [packageId]),
        read<any>("get_witness", [packageId]),
      ]);
      setRecord({ charter, milestone, witness: witnessed });
      setStatus("WITNESS RECORDED ON STUDIONET");
    } catch (e: any) {
      setStatus(e.message);
    }
  }
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);
  if (loading) return <Skeleton />;
  const s = stops[step];
  return (
    <main>
      <header>
        <div className="logo">
          <i />
          GRANT
          <br />
          <b>WITNESS</b>
        </div>
        <div className="mission">
          NEIGHBOURHOOD AIR COMMONS <span>GW–0084</span>
        </div>
        <button onClick={wallet}>
          {account
            ? `${account.slice(0, 6)}…${account.slice(-4)}`
            : "CONNECT WALLET"}
        </button>
      </header>
      <section className="intro">
        <small>ONE PROMISE · THREE RELEASE GATES</small>
        <h1>
          Watch public money
          <br />
          <em>become public work.</em>
        </h1>
        <p>
          Every grant moves through visible commitments. Nothing releases
          because a box was ticked—independent witnesses read the evidence
          against the frozen charter.
        </p>
        <div className="total">
          <span>GRANT CEILING</span>
          <b>80,000</b>
          <i>GEN</i>
        </div>
      </section>
      <section className="journey">
        <div className="rail">
          {stops.map((x, i) => (
            <button
              key={x.n}
              className={step === i ? "on" : ""}
              onClick={() => setStep(i)}
            >
              <span>{x.n}</span>
              <i />
              <small>{x.state}</small>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="stage"
            key={s.n}
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -70 }}
          >
            <div className="giant">{s.n}</div>
            <div className="stage-copy">
              <small>
                MILESTONE {s.n} / {s.state}
              </small>
              <h2>{s.name}</h2>
              <h3>{s.sub}</h3>
              <p>{s.copy}</p>
              <div className="money">
                <span>ELIGIBLE VALUE</span>
                <b>{s.amount}</b>
                <i>GEN</i>
              </div>
            </div>
            <div className="proof">
              <span>LIVE PROOF</span>
              {[
                ["COORDINATES", "06 VERIFIED"],
                ["PUBLIC ENDPOINT", "RESPONSIVE"],
                ["CUSTODY", "04 / 06 SIGNED"],
              ].map((x, i) => (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={x[0]}
                >
                  <small>{x[0]}</small>
                  <b>{x[1]}</b>
                  <i style={{ width: `${90 - i * 15}%` }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="controls">
          <button disabled={step === 0} onClick={() => setStep(step - 1)}>
            ← PREVIOUS
          </button>
          <span>{step + 1} / 3</span>
          <button disabled={step === 2} onClick={() => setStep(step + 1)}>
            NEXT →
          </button>
        </div>
      </section>
      <section className="witness-call">
        <div>
          <small>CURRENT GATE</small>
          <h2>
            {step === 1
              ? "Evidence is ready for human-scale judgment."
              : "Explore the commitment before requesting review."}
          </h2>
        </div>
        <div className="rings">
          <i />
          <i />
          <b>4/5</b>
        </div>
        <p>
          <b>PRELIMINARY:</b> Deployment and open access are proven. Complete
          custody is still missing for two councils.
        </p>
        <button onClick={() => setOpen(true)}>ENTER WITNESS ROOM ↗</button>
      </section>
      <section className="principle">
        <span>TERMS</span>
        <span>BEFORE</span>
        <span>TRUST.</span>
      </section>
      <footer>
        <b>GRANTWITNESS</b>
        <span>GENLAYER / STUDIONET / 5 INDEPENDENT VALIDATORS</span>
      </footer>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="veil"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.section
              className="room"
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(75% at 50% 50%)" }}
              exit={{ clipPath: "circle(0% at 50% 50%)" }}
            >
              <button onClick={() => setOpen(false)}>EXIT ×</button>
              <small>WITNESS ROOM / MILESTONE {s.n}</small>
              <h2>What must the network decide?</h2>
              <div className="question">
                Has “Deploy community sensor mesh” been fulfilled under the
                frozen public charter?
              </div>
              <ul>
                <li>
                  <i>✓</i> Six sensor locations published
                </li>
                <li>
                  <i>✓</i> Public endpoint responds
                </li>
                <li>
                  <i>!</i> Two custody signatures absent
                </li>
              </ul>
              <button className="seal" onClick={witness}>
                SEAL EVIDENCE & CONVENE →
              </button>
              {record && (
                <div className="recorded-witness">
                  <small>RECORDED WITNESS / CONTRACT STATE</small>
                  <h3>{record.witness.outcome} · {record.witness.confidence}%</h3>
                  <p>{record.witness.summary}</p>
                  <b>FROZEN MISSION</b><p>{record.charter.mission}</p>
                  <b>AUTHENTICATED SOURCE</b>
                  <a href={record.charter.sources[0]} target="_blank">{record.charter.sources[0]}</a>
                  <p>{record.charter.snapshots[0]}</p>
                  <b>FROZEN OBLIGATIONS</b>
                  <ul>{record.charter.obligations.map((x:string)=><li key={x}>{x}</li>)}</ul>
                </div>
              )}
            </motion.section>
          </>
        )}
      </AnimatePresence>
      {status && (
        <div className="chain-status">
          <b>{status}</b>
          {hash && (
            <a href={`${EXPLORER}/${hash}`} target="_blank">
              VIEW TRANSACTION ↗
            </a>
          )}
          <button onClick={() => setStatus("")}>×</button>
        </div>
      )}
    </main>
  );
}
