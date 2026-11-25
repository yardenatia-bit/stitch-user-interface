import { useState } from 'react'
import { INITIAL_COUNT } from '../data/counter.js'

function CounterPage() {
  const [count, setCount] = useState(INITIAL_COUNT)

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-5 py-12">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent-soft blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-purple-200/60 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-[32px] bg-white p-8 shadow-[0_24px_60px_-20px_rgba(76,29,149,0.35)] ring-1 ring-purple-100 sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-accent-dark">
              Simple counter
            </span>
            <span className="text-xs font-semibold text-slate-400">v1</span>
          </div>

          <h1 className="text-center text-2xl font-extrabold tracking-tight text-ink">
            Count anything
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Tap the buttons to change the number.
          </p>

          <div
            className="my-10 text-center text-[7rem] font-extrabold leading-none tracking-tighter text-ink tabular-nums"
            aria-live="polite"
          >
            {count}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setCount((value) => value - 1)}
              aria-label="Decrease count"
              className="h-16 rounded-2xl bg-accent-soft text-3xl font-semibold text-accent-dark transition hover:bg-purple-200 active:scale-95"
            >
              &minus;
            </button>
            <button
              type="button"
              onClick={() => setCount((value) => value + 1)}
              aria-label="Increase count"
              className="h-16 rounded-2xl bg-accent text-3xl font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-accent-dark active:scale-95"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => setCount(INITIAL_COUNT)}
            className="mt-4 w-full rounded-2xl border border-slate-200 py-3 text-sm font-bold text-slate-500 transition hover:border-purple-200 hover:text-accent-dark"
          >
            Reset to {INITIAL_COUNT}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Made with React, Vite and Tailwind CSS
        </p>
      </div>
    </main>
  )
}

export default CounterPage
