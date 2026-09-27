import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@300;400;600;700&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --cream: #fdf8f0;
    --warm-white: #fffcf7;
    --rose: #e8706a;
    --rose-light: #f5a89e;
    --rose-pale: #fde8e6;
    --plum: #6b3a5e;
    --plum-light: #9b6a8e;
    --plum-pale: #f0e6ed;
    --sage: #6b8f71;
    --sage-pale: #e8f0e9;
    --gold: #c9933a;
    --gold-pale: #fdf0db;
    --text: #2d1f2b;
    --text-soft: #6b5465;
    --border: #e8dde5;
    --card-bg: #ffffff;
    --warn: #d97706;
    --warn-pale: #fff7ed;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--cream); color: var(--text); font-family: 'Nunito', sans-serif; line-height: 1.6; }
  .app { max-width: 860px; margin: 0 auto; padding: 24px 16px 80px; }

  .hero { text-align: center; padding: 48px 20px 40px; border-bottom: 1px solid var(--border); margin-bottom: 32px; position: relative; }
  .hero::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 100px; height: 3px; background: linear-gradient(90deg, var(--rose), var(--plum)); border-radius: 2px; }
  .hero-chip { display: inline-flex; align-items: center; gap: 6px; background: var(--rose-pale); color: var(--rose); border: 1px solid #f5c5c0; font-family: 'DM Mono', monospace; font-size: 11px; padding: 5px 16px; border-radius: 20px; margin-bottom: 20px; letter-spacing: 0.5px; }
  .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(36px, 8vw, 68px); line-height: 1.05; color: var(--text); margin-bottom: 10px; font-weight: 700; }
  .hero h1 em { font-style: italic; color: var(--rose); }
  .hero-sub { font-size: 13.5px; color: var(--text-soft); max-width: 500px; margin: 0 auto; line-height: 1.7; }

  .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; margin-bottom: 32px; }
  .stat-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 14px 10px; text-align: center; box-shadow: 0 1px 4px rgba(107,58,94,0.06); }
  .stat-val { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--plum); line-height: 1; font-weight: 700; }
  .stat-label { font-size: 10px; color: var(--text-soft); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; font-family: 'DM Mono', monospace; }

  .nav { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 28px; border-bottom: 1px solid var(--border); padding-bottom: 16px; }
  .nav-btn { background: var(--card-bg); border: 1px solid var(--border); color: var(--text-soft); font-family: 'Nunito', sans-serif; font-size: 12px; font-weight: 600; padding: 7px 16px; border-radius: 20px; cursor: pointer; transition: all 0.2s; }
  .nav-btn:hover { border-color: var(--rose); color: var(--rose); }
  .nav-btn.active { background: var(--rose); color: white; border-color: var(--rose); }

  .section-title { font-family: 'Playfair Display', serif; font-size: 32px; color: var(--text); margin-bottom: 6px; line-height: 1.2; }
  .section-title em { font-style: italic; color: var(--rose); }
  .section-sub { color: var(--text-soft); font-size: 13px; margin-bottom: 22px; }

  .card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; margin-bottom: 14px; box-shadow: 0 1px 5px rgba(107,58,94,0.05); }
  .card-title { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--text); margin-bottom: 12px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

  .tag { font-family: 'DM Mono', monospace; font-size: 10px; padding: 3px 10px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500; white-space: nowrap; }
  .tag-rose { background: var(--rose-pale); color: var(--rose); border: 1px solid #f5c5c0; }
  .tag-plum { background: var(--plum-pale); color: var(--plum); border: 1px solid #d4b8cf; }
  .tag-sage { background: var(--sage-pale); color: var(--sage); border: 1px solid #c0d4c3; }
  .tag-gold { background: var(--gold-pale); color: var(--gold); border: 1px solid #e8c87a; }
  .tag-warn { background: var(--warn-pale); color: var(--warn); border: 1px solid #fbbf24; }

  .alert { border-radius: 12px; padding: 14px 16px; margin-bottom: 16px; font-size: 13.5px; }
  .alert-rose { background: var(--rose-pale); border: 1px solid #f5c5c0; border-left: 3px solid var(--rose); }
  .alert-plum { background: var(--plum-pale); border: 1px solid #d4b8cf; border-left: 3px solid var(--plum); }
  .alert-sage { background: var(--sage-pale); border: 1px solid #c0d4c3; border-left: 3px solid var(--sage); }
  .alert-gold { background: var(--gold-pale); border: 1px solid #e8c87a; border-left: 3px solid var(--gold); }
  .alert-title { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 7px; }
  .alert-rose .alert-title { color: var(--rose); }
  .alert-plum .alert-title { color: var(--plum); }
  .alert-sage .alert-title { color: var(--sage); }
  .alert-gold .alert-title { color: var(--gold); }
  .alert p { color: var(--text); line-height: 1.75; }

  table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 10px 0; }
  th { background: var(--plum-pale); color: var(--plum); font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.8px; text-transform: uppercase; padding: 9px 12px; text-align: left; border-bottom: 1px solid var(--border); }
  td { padding: 9px 12px; border-bottom: 1px solid #f0ebe8; vertical-align: top; line-height: 1.5; color: #4a3a47; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--warm-white); }

  /* ── WORKOUT DAY CARDS ── */
  .day-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; margin-bottom: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(107,58,94,0.07); }

  .day-card-header { padding: 18px 20px; cursor: pointer; display: flex; align-items: center; gap: 14px; transition: background 0.2s; }
  .day-card-header:hover { background: var(--warm-white); }

  .day-letter { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; line-height: 1; min-width: 52px; }

  .day-info h3 { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--text); margin-bottom: 4px; }
  .day-info p { font-size: 12px; color: var(--text-soft); }

  .day-meta { margin-left: auto; text-align: right; }
  .day-meta .time { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-soft); }
  .expand-btn { font-size: 22px; color: var(--rose); margin-left: 12px; line-height: 1; }

  .day-body { padding: 0 20px 20px; }

  /* ── SUPERSET BLOCKS ── */
  .superset-block { background: var(--warm-white); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
  .superset-label { background: var(--plum-pale); padding: 7px 14px; font-family: 'DM Mono', monospace; font-size: 10px; color: var(--plum); letter-spacing: 1px; text-transform: uppercase; font-weight: 500; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px; }
  .superset-rest { margin-left: auto; color: var(--rose); font-weight: 500; }

  .ex-item { padding: 12px 14px; border-bottom: 1px solid #f0ebe8; }
  .ex-item:last-child { border-bottom: none; }

  .ex-top { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 6px; }
  .ex-num { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--plum); min-width: 20px; margin-top: 2px; }
  .ex-name { font-size: 14px; font-weight: 700; color: var(--text); flex: 1; }
  .ex-badges { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
  .ex-badge { font-family: 'DM Mono', monospace; font-size: 11px; padding: 2px 9px; border-radius: 8px; }
  .badge-sets { background: var(--plum-pale); color: var(--plum); }
  .badge-reps { background: var(--rose-pale); color: var(--rose); }
  .badge-rest { background: #f5f0f5; color: var(--text-soft); }

  .ex-cue { font-size: 12px; color: var(--text-soft); line-height: 1.6; margin-left: 30px; }
  .ex-cue b { color: var(--sage); }

  .ex-prog { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; margin-left: 30px; }
  .prog-easy { background: var(--sage-pale); border: 1px solid #c0d4c3; border-radius: 7px; padding: 7px 10px; font-size: 11.5px; }
  .prog-hard { background: var(--rose-pale); border: 1px solid #f5c5c0; border-radius: 7px; padding: 7px 10px; font-size: 11.5px; }
  .prog-lbl { font-family: 'DM Mono', monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 3px; font-weight: 500; }
  .prog-easy .prog-lbl { color: var(--sage); }
  .prog-hard .prog-lbl { color: var(--rose); }
  .prog-easy p, .prog-hard p { color: var(--text-soft); }

  .warmup-box { background: var(--sage-pale); border: 1px solid #c0d4c3; border-radius: 9px; padding: 11px 14px; margin-bottom: 14px; font-size: 12.5px; color: #3a5e40; line-height: 1.7; }
  .warmup-box b { color: var(--sage); font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; display: block; margin-bottom: 5px; }

  .cooldown-box { background: var(--plum-pale); border: 1px solid #d4b8cf; border-radius: 9px; padding: 11px 14px; margin-top: 14px; font-size: 12.5px; color: var(--plum); line-height: 1.7; }
  .cooldown-box b { color: var(--plum); font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; display: block; margin-bottom: 5px; }

  .week-phase-header { border-radius: 12px; padding: 14px 18px; margin-bottom: 10px; margin-top: 22px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: all 0.2s; }
  .week-phase-header h3 { font-family: 'Playfair Display', serif; font-size: 20px; flex: 1; }
  .week-phase-header p { font-size: 12px; opacity: 0.75; }

  /* ── TRACKER ── */
  .week-tabs { display: flex; gap: 6px; margin-bottom: 16px; flex-wrap: wrap; }
  .week-tab { background: var(--card-bg); border: 1px solid var(--border); color: var(--text-soft); font-size: 11px; font-weight: 600; padding: 5px 13px; border-radius: 16px; cursor: pointer; transition: all 0.2s; }
  .week-tab:hover { border-color: var(--plum); color: var(--plum); }
  .week-tab.active { background: var(--plum); color: white; border-color: var(--plum); }

  .tracker-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 14px 0; }
  .tracker-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 10px; padding: 12px; }
  .tracker-card label { display: block; font-family: 'DM Mono', monospace; font-size: 10px; color: var(--text-soft); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }
  .tracker-card input { width: 100%; background: var(--cream); border: 1px solid var(--border); border-radius: 6px; color: var(--plum); font-family: 'Playfair Display', serif; font-size: 20px; padding: 6px 9px; outline: none; transition: border-color 0.2s; }
  .tracker-card input:focus { border-color: var(--rose); }

  .save-btn { background: linear-gradient(135deg, var(--rose), var(--plum)); color: white; border: none; font-family: 'Playfair Display', serif; font-size: 16px; font-style: italic; padding: 10px 26px; border-radius: 22px; cursor: pointer; margin-top: 12px; transition: all 0.2s; box-shadow: 0 3px 12px rgba(232,112,106,0.3); }
  .save-btn:hover { transform: translateY(-1px); }
  .save-msg { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--sage); margin-top: 8px; letter-spacing: 1px; }

  /* MISC */
  .divider { height: 1px; background: var(--border); margin: 26px 0; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .food-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(185px, 1fr)); gap: 10px; margin: 12px 0; }
  .food-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 10px; padding: 13px; }
  .food-card h4 { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--plum); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 9px; }
  .food-card ul { list-style: none; }
  .food-card li { font-size: 12.5px; color: var(--text); padding: 3px 0; border-bottom: 1px solid var(--border); }
  .food-card li:last-child { border-bottom: none; }
  .food-card li::before { content: "♡ "; color: var(--rose); font-size: 11px; }

  .caution-item { background: var(--warn-pale); border: 1px solid #fbbf24; border-left: 3px solid var(--warn); border-radius: 10px; padding: 12px 15px; margin-bottom: 10px; }
  .caution-title { font-weight: 700; color: var(--warn); margin-bottom: 4px; font-size: 13.5px; }
  .caution-item p { font-size: 12.5px; color: #7c4a00; }

  .mindset-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 17px 18px; margin-bottom: 12px; }
  .mindset-week { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--rose); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
  .mindset-theme { font-family: 'Playfair Display', serif; font-size: 17px; margin-bottom: 7px; color: var(--text); }
  .mindset-card p { font-size: 13px; color: var(--text-soft); line-height: 1.75; }

  @media (max-width: 600px) {
    .two-col { grid-template-columns: 1fr; }
    .ex-prog { grid-template-columns: 1fr; }
    .day-letter { font-size: 36px; min-width: 40px; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// WORKOUT DATA — 3 days, 8 weeks, superset format
// Each phase has 3 workout days × 2-week blocks
// Rest: 30–45s within superset, 60s between supersets
// ─────────────────────────────────────────────────────────────────────────────

const phases = [
  // ── PHASE 1: Weeks 1–2 ──────────────────────────────────────────────────
  {
    id: "p1",
    label: "Phase 1",
    weeks: "Weeks 1–2",
    title: "Foundation & Re-Ignition",
    desc: "Re-establish movement quality, build superset habit, first real sweat sessions",
    bgColor: "#fde8e6", borderColor: "var(--rose)", textColor: "var(--rose)",
    days: [
      {
        id: "p1-A",
        letter: "A",
        letterColor: "var(--rose)",
        title: "Legs & Glutes",
        subtitle: "Lower body fat burn + glute shaping",
        duration: "42 min",
        warmup: "5 min: 20 leg swings front/back → 20 side leg swings → 10 hip circles each side → 20 bodyweight squats slow → 10 glute bridges",
        cooldown: "5 min: Pigeon pose 40s each side → Butterfly stretch 30s → Kneeling hip flexor stretch 30s each → Lying glute stretch 30s each",
        supersets: [
          {
            label: "Superset 1", note: "3 rounds · 45s rest after round",
            exercises: [
              { num: "1a", name: "Dumbbell Goblet Squat", sets: 3, reps: "15 reps", cue: "Hold one dumbbell by one end at chest (goblet). Feet hip-width+, toes out slightly. Squat deep — thighs parallel or below. Drive knees out. Power through heels. Dumbbells make this significantly harder than bodyweight.", easier: "Bodyweight squat, less depth", harder: "Slow 4-sec descent + 2-sec hold at bottom" },
              { num: "1b", name: "Dumbbell Romanian Deadlift", sets: 3, reps: "12 reps", cue: "Hold both dumbbells in front of thighs. Hinge at hips — push them backward. Lower weights along your legs until you feel a hamstring stretch (mid-shin level). Drive hips forward to stand. Back stays flat throughout.", easier: "Less range (lower to knees only)", harder: "Single-leg version, one dumbbell" },
            ]
          },
          {
            label: "Superset 2", note: "3 rounds · 45s rest after round",
            exercises: [
              { num: "2a", name: "Reverse Lunge with Dumbbells", sets: 3, reps: "10 each leg", cue: "Hold one dumbbell in each hand. Step one foot back, lower rear knee near floor. Front shin stays vertical. Drive through front heel to return. Alternate legs. Constant tension on working leg.", easier: "No dumbbells, use wall for balance", harder: "Add a knee drive at the top (lift rear knee to hip height)" },
              { num: "2b", name: "Sumo Squat + Dumbbell", sets: 3, reps: "15 reps", cue: "Hold one dumbbell vertically between both hands. Feet wide, toes pointed 45° out. Squat deep. Inner thighs and glutes fire hard. At the top — squeeze glutes together for 1 second.", easier: "Bodyweight only, narrower stance", harder: "Pulse 3 times at bottom before rising" },
            ]
          },
          {
            label: "Superset 3 — Glute Isolation", note: "3 rounds · 30s rest after round",
            exercises: [
              { num: "3a", name: "Single-Leg Glute Bridge", sets: 3, reps: "12 each side", cue: "Lie on back. One foot flat near glutes, other leg extended up. Drive through grounded heel. Squeeze glute HARD at top. Hold 1 second. Lower slowly (3 sec). Other leg stays straight throughout.", easier: "Both-leg bridge, hold 2 sec at top", harder: "Add a dumbbell on the working hip" },
              { num: "3b", name: "Side-Lying Hip Abduction with Dumbbell", sets: 3, reps: "15 each side", cue: "Lie on side, body in straight line. Rest dumbbell on outer thigh. Raise top leg to hip height, lower in 3 sec. Slow controlled movement. Outer glutes — creates the hip curve.", easier: "No dumbbell", harder: "Add 2-sec hold at top of each rep" },
            ]
          },
          {
            label: "Finisher — No rest", note: "2 rounds · 60s rest between rounds",
            exercises: [
              { num: "F", name: "Glute Bridge Hold Pulses", sets: 2, reps: "25 small pulses", cue: "Both feet flat. Drive hips up to top position — stay there. Do 25 small pulses (barely drop, immediately back up). Glutes should be completely burning by rep 20. That's perfect.", easier: "15 pulses, lower height", harder: "Single-leg pulses, 15 each side" },
            ]
          },
        ]
      },
      {
        id: "p1-B",
        letter: "B",
        letterColor: "var(--plum)",
        title: "Upper Body + Arms",
        subtitle: "Chest, back, shoulders, biceps, triceps",
        duration: "45 min",
        warmup: "5 min: 20 arm circles forward + back → 10 shoulder rolls → 10 push-up to downdog → 10 cat-cow → 15 arm swings across chest",
        cooldown: "5 min: Doorframe chest stretch 30s → Shoulder cross-body 25s each → Tricep overhead stretch 20s each → Child's pose 40s",
        supersets: [
          {
            label: "Superset 1 — Push", note: "3 rounds · 45s rest after round",
            exercises: [
              { num: "1a", name: "Incline Push-Up (chair height)", sets: 3, reps: "12–15 reps", cue: "Hands on chair seat. Body diagonal, core tight. Full range — chest to chair edge. 2-sec lowering. Work toward floor push-up this phase.", easier: "Hands on table (higher = easier)", harder: "Hands on floor — full push-up" },
              { num: "1b", name: "Dumbbell Shoulder Press", sets: 3, reps: "12 reps each arm", cue: "Seated on chair. One dumbbell at shoulder height, palm forward. Press overhead — don't lock elbow fully. Lower in 3 sec. Do all reps one arm, then switch. 3 kg is a solid working weight here.", easier: "Both arms together, lighter", harder: "Standing, both arms simultaneously" },
            ]
          },
          {
            label: "Superset 2 — Pull", note: "3 rounds · 45s rest after round",
            exercises: [
              { num: "2a", name: "Dumbbell Bent-Over Row", sets: 3, reps: "12 reps each arm", cue: "One hand on chair for support. Hinge at hips 45°. Dumbbell hanging. Pull elbow to ceiling — elbow goes past your back. Squeeze shoulder blade at top. Lower in 3 sec. Best back exercise with dumbbells.", easier: "Less hinge angle (more upright)", harder: "Rotate torso slightly toward dumbbell at top" },
              { num: "2b", name: "Dumbbell Lateral Raise", sets: 3, reps: "12 reps", cue: "Both dumbbells. Stand, arms by sides. Raise both arms to shoulder height — 2 sec up, 3 sec down. Elbows have a slight bend. Don't shrug shoulders. Creates shoulder width + waist-narrowing visual effect.", easier: "One arm at a time, lighter", harder: "Lean forward 15° (more rear delt activation)" },
            ]
          },
          {
            label: "Superset 3 — Arms", note: "3 rounds · 30s rest after round",
            exercises: [
              { num: "3a", name: "Dumbbell Bicep Curl", sets: 3, reps: "12 reps each arm", cue: "Seated or standing. Elbow pinned to ribs. Curl up fully, squeeze hard at top (1 sec). Lower in 3 sec. Strict — no swinging. With 3 kg, the slow lowering (eccentric) creates real stimulus.", easier: "Both arms together, faster", harder: "Hammer grip (thumb up), 4-sec lowering" },
              { num: "3b", name: "Tricep Overhead Extension", sets: 3, reps: "12 reps each arm", cue: "Hold one dumbbell overhead, one arm. Elbow points to ceiling. Lower behind head — only the forearm moves. Return to straight. Other hand can support the working elbow. Targets the long head of tricep.", easier: "Both hands holding one dumbbell", harder: "4-sec lowering, 1-sec pause at bottom" },
            ]
          },
          {
            label: "Finisher", note: "2 rounds · 60s rest between rounds",
            exercises: [
              { num: "F", name: "Dumbbell Chest Press (floor)", sets: 2, reps: "15 reps", cue: "Lie on back, knees bent. Both dumbbells held together or one at a time. Press toward ceiling, lower until elbows nearly touch floor. 3-sec lowering. Chest gets the full range it can't get from push-ups alone.", easier: "Lighter, smaller range", harder: "Single-arm alternating (core works harder)" },
            ]
          },
        ]
      },
      {
        id: "p1-C",
        letter: "C",
        letterColor: "var(--sage)",
        title: "Abs + Core + Full Body Burn",
        subtitle: "Deep core, obliques, compound burn — fat loss focus",
        duration: "40 min",
        warmup: "5 min: 20 jumping jacks (or step jacks) → 10 hip circles → 10 cat-cow → 20 high knees marching → 10 inchworms",
        cooldown: "5 min: Supine twist 30s each side → Child's pose 40s → Cat-cow 10 reps → Deep belly breathing 5 cycles",
        supersets: [
          {
            label: "Superset 1 — Core Foundation", note: "3 rounds · 30s rest after round",
            exercises: [
              { num: "1a", name: "Dead Bug", sets: 3, reps: "10 each side", cue: "Lie on back, arms up, knees at 90°. Lower opposite arm + leg toward floor. Lower back MUST stay pressed into floor — if it lifts, don't go that low. 3-sec lowering. Best deep core activator.", easier: "Only move arms (keep knees bent)", harder: "Fully extend leg to 2 inches from floor, slow" },
              { num: "1b", name: "Plank Hold", sets: 3, reps: "25–30 sec", cue: "Forearms down. Body straight head-to-heels. Squeeze abs. Squeeze glutes. Breathe. Don't let hips sag. This is where the core endurance is built that makes everything else easier.", easier: "Knees down (start here if needed)", harder: "Extend to 40s, add shoulder taps" },
            ]
          },
          {
            label: "Superset 2 — Obliques & Side Core", note: "3 rounds · 30s rest after round",
            exercises: [
              { num: "2a", name: "Dumbbell Side Bend", sets: 3, reps: "15 each side", cue: "Stand, one dumbbell in one hand at side. Bend directly sideways toward the dumbbell — feel the opposite oblique stretch. Return by contracting that oblique. Slow and controlled. Switch sides.", easier: "No dumbbell, bodyweight only", harder: "Slow 3-sec bend, 3-sec return" },
              { num: "2b", name: "Bicycle Crunch", sets: 3, reps: "15 each side", cue: "On back, hands behind head. Rotate elbow to opposite knee. Fully extend other leg. Slow — 2 full seconds per rotation. Feel the oblique twist, not a neck crunch. Obliques = waist tapering.", easier: "Feet higher off ground, less range", harder: "3-sec hold at peak rotation" },
            ]
          },
          {
            label: "Superset 3 — Lower Abs + Compound", note: "3 rounds · 45s rest after round",
            exercises: [
              { num: "3a", name: "Lying Leg Raise", sets: 3, reps: "12 reps", cue: "On back, hands under lower back. Raise both legs to 90°. Lower slowly (4 sec) until just above floor — don't rest them. Back stays flat. This targets the lower abs and hip flexors — the area most visible from the front.", easier: "Bent-knee raises", harder: "Lower legs to 2 inches from floor, 5-sec down" },
              { num: "3b", name: "Dumbbell Squat to Press", sets: 3, reps: "12 reps", cue: "Hold both dumbbells at shoulder height. Squat down. As you rise, press both dumbbells overhead. Lower dumbbells back to shoulders as you squat again. Compound movement — burns the most calories, works legs + shoulders + core together.", easier: "Squat only (no press), or press only (no squat)", harder: "Add 1-sec hold at top of press" },
            ]
          },
          {
            label: "Core Finisher — Continuous", note: "2 rounds · 60s rest between rounds",
            exercises: [
              { num: "F", name: "Hollow Body Hold", sets: 2, reps: "20–25 sec", cue: "On back. Arms overhead, legs raised 6 inches from floor. Lower back pressed into floor the whole time. This is gymnastic-level core work. Entire anterior core fires. It should feel very uncomfortable by 15 seconds — that's right.", easier: "Arms by sides, legs higher (45°)", harder: "Arms overhead, legs 4 inches from floor" },
            ]
          },
        ]
      },
    ]
  },

  // ── PHASE 2: Weeks 3–4 ──────────────────────────────────────────────────
  {
    id: "p2",
    label: "Phase 2",
    weeks: "Weeks 3–4",
    title: "Load & Volume Increase",
    desc: "Heavier dumbbell use, more reps, shorter rest, floor push-up progression begins",
    bgColor: "#f0e6ed", borderColor: "var(--plum)", textColor: "var(--plum)",
    days: [
      {
        id: "p2-A",
        letter: "A",
        letterColor: "var(--rose)",
        title: "Legs & Glutes — More Load",
        subtitle: "Heavier goblet squat, split squat introduced, extended finisher",
        duration: "45 min",
        warmup: "5 min: 20 leg swings → 20 hip circles → 15 deep squat holds (2 sec each) → 15 glute bridges → 10 sumo squat holds",
        cooldown: "5 min: Pigeon pose 45s each → Butterfly 35s → Quad standing stretch 30s each → Supine figure-4 stretch 30s each",
        supersets: [
          {
            label: "Superset 1", note: "4 rounds · 45s rest after round",
            exercises: [
              { num: "1a", name: "Bulgarian Split Squat", sets: 4, reps: "10 each leg", cue: "Rear foot on chair. Hold both dumbbells at sides. Lower until rear knee nearly touches floor — front shin stays vertical. Drive through front heel. Each leg gets its own full set of reps before switching. Hardest leg exercise in this plan.", easier: "No dumbbells, foot lower (on a step or book)", harder: "Add a 2-sec pause at the bottom" },
              { num: "1b", name: "Dumbbell Sumo Deadlift", sets: 4, reps: "12 reps", cue: "Both dumbbells held between legs (or one held vertically). Wide stance. Push hips back and down. Keep chest up. Drive through heels to stand, squeeze glutes hard at top. Inner thighs + glutes + hamstrings.", easier: "One dumbbell only, lighter", harder: "Slow 4-sec lowering, slight pause at bottom" },
            ]
          },
          {
            label: "Superset 2", note: "3 rounds · 45s rest after round",
            exercises: [
              { num: "2a", name: "Dumbbell Goblet Squat (Deeper)", sets: 3, reps: "15 reps", cue: "Deeper than Phase 1 — thighs past parallel. Elbows brush inside of knees at bottom. Hold bottom position 1 sec each rep. More glute activation at deeper range.", easier: "Parallel depth only", harder: "Slow 4s down, hold 2s, fast up" },
              { num: "2b", name: "Lateral Lunge with Dumbbell", sets: 3, reps: "10 each side", cue: "Hold one dumbbell at chest. Step wide to one side. Bend that knee and sit into it — other leg stays straight. Feel inner thigh stretch. Push back to standing. Works the plane of movement squats miss.", easier: "No dumbbell, smaller step", harder: "Add a knee drive at the top" },
            ]
          },
          {
            label: "Superset 3 — Glute Isolation", note: "3 rounds · 30s rest after round",
            exercises: [
              { num: "3a", name: "Donkey Kick with Dumbbell (behind knee)", sets: 3, reps: "15 each leg", cue: "On all fours. Tuck one dumbbell behind the knee (hold it with leg bend). Kick leg up and back until thigh is parallel to floor. Squeeze glute at top. Don't swing — pure glute contraction.", easier: "No dumbbell, bodyweight donkey kick", harder: "Add 1-sec squeeze at top every rep" },
              { num: "3b", name: "Curtsy Lunge", sets: 3, reps: "12 each side", cue: "Stand with dumbbells at sides. Step one foot diagonally behind and to the outside of the other foot (like a curtsy). Bend both knees. Return. This hits outer glutes and creates the hip curve shape.", easier: "No dumbbells, smaller range", harder: "Add dumbbells at chest" },
            ]
          },
          {
            label: "Finisher — Continuous Burn", note: "2 rounds · 60s rest",
            exercises: [
              { num: "F", name: "Wall Sit + Dumbbell Hold", sets: 2, reps: "40 sec", cue: "Back flat to wall, thighs parallel to floor. Hold both dumbbells on your thighs (don't push with hands). The weight adds challenge to an already brutal position. Quads should be screaming by 30 seconds.", easier: "No dumbbells, 30 sec", harder: "Single leg raised, 25 sec each side" },
            ]
          },
        ]
      },
      {
        id: "p2-B",
        letter: "B",
        letterColor: "var(--plum)",
        title: "Upper Body + Arms — Volume Push",
        subtitle: "More volume, floor push-ups attempted, heavier arm work",
        duration: "45 min",
        warmup: "5 min: 20 arm circles → 10 push-up to downdog → 10 inchworms → 15 band-free rows in air → 20 jumping jacks",
        cooldown: "5 min: Chest doorframe stretch 35s → Shoulder cross-body 25s each → Bicep wall stretch 20s each → Downward dog hold 45s",
        supersets: [
          {
            label: "Superset 1 — Push (Floor attempt)", note: "4 rounds · 45s rest after round",
            exercises: [
              { num: "1a", name: "Floor Push-Up (attempt) + Incline Drop", sets: 4, reps: "Max floor + drop to incline", cue: "Start on the floor. Do as many full push-ups as possible with perfect form (chest 1 inch from floor). The moment form breaks — immediately move to chair height and continue for 5 more reps. Track your floor push-up count — it will grow.", easier: "All incline, work toward floor", harder: "Slow 4-sec descent on every floor rep" },
              { num: "1b", name: "Dumbbell Arnold Press", sets: 4, reps: "10 reps each arm", cue: "Hold dumbbell at shoulder, palm facing you. As you press upward, rotate the arm so palm faces forward at the top. Reverse on the way down. Works all three shoulder heads — more complete than regular press.", easier: "Regular shoulder press, no rotation", harder: "Both arms simultaneously, standing" },
            ]
          },
          {
            label: "Superset 2 — Pull + Rear Delt", note: "3 rounds · 45s rest after round",
            exercises: [
              { num: "2a", name: "Dumbbell Bent-Over Row (both arms)", sets: 3, reps: "12 reps", cue: "Hinge forward ~45°. Both dumbbells hanging. Pull both elbows back simultaneously, squeezing shoulder blades together at top. Hold 1 sec. Lower in 3 sec. Both sides at once = heavier overall load.", easier: "Single-arm version (less balance required)", harder: "Increase hinge angle (more horizontal torso)" },
              { num: "2b", name: "Dumbbell Bent-Over Reverse Fly", sets: 3, reps: "12 reps", cue: "Hinge forward at hips, arms hanging. Raise both arms out to the sides like wings — rear deltoids do the work. Lower in 3 sec. Excellent for posture and back width. 3 kg will feel heavy here — that's fine.", easier: "One arm at a time, less hinge", harder: "Hold 2 sec at top, squeeze shoulder blades" },
            ]
          },
          {
            label: "Superset 3 — Arms Superset", note: "3 rounds · 30s rest after round",
            exercises: [
              { num: "3a", name: "Dumbbell 21s Curl", sets: 3, reps: "21 total", cue: "7 reps bottom-half (waist to 90°) → 7 reps top-half (90° to shoulder) → 7 full reps. No rest between segments. Maximum bicep time-under-tension. With 3 kg this will completely exhaust the bicep.", easier: "Regular curls 12 reps, slower", harder: "Add 4-sec lowering on full reps" },
              { num: "3b", name: "Tricep Kickback", sets: 3, reps: "12 reps each arm", cue: "One hand on chair. Hinge forward. Upper arm pinned to side, parallel to floor. Extend forearm backward until arm is straight. Lower in 3 sec. Pure tricep isolation — harder than it looks.", easier: "Less hinge angle", harder: "Hold 2 sec fully extended" },
            ]
          },
          {
            label: "Finisher", note: "2 rounds · 60s rest",
            exercises: [
              { num: "F", name: "Plank to Push-Up", sets: 2, reps: "8–10 reps", cue: "Start in forearm plank. Press one hand up to straight arm, then the other (full plank). Lower back down one arm at a time. Keep hips level throughout — don't rotate. This builds both core and pushing endurance.", easier: "Just hold plank, skip push-up", harder: "Add a push-up at the top of each rep" },
            ]
          },
        ]
      },
      {
        id: "p2-C",
        letter: "C",
        letterColor: "var(--sage)",
        title: "Abs + Core + Full Body Burn",
        subtitle: "Harder core work, dumbbell compound circuits, metabolic finish",
        duration: "42 min",
        warmup: "5 min: 30 jumping jacks → 10 inchworms → 20 high knees → 10 torso rotations → 5 squat hold + reach",
        cooldown: "5 min: Supine twist 35s each → Cat-cow 10 reps → Child's pose 45s → Seated forward fold 30s → Deep breathing",
        supersets: [
          {
            label: "Superset 1 — Anti-Rotation Core", note: "3 rounds · 30s rest after round",
            exercises: [
              { num: "1a", name: "Dumbbell Woodchop (low to high)", sets: 3, reps: "12 each side", cue: "Hold one dumbbell with both hands. Start at outside of one knee. Rotate and raise diagonally across body to above opposite shoulder. Like chopping wood upward. Core, obliques, and shoulders. Full rotation.", easier: "No dumbbell, arms only", harder: "Slower 3-sec rotation each direction" },
              { num: "1b", name: "Side Plank", sets: 3, reps: "25 sec each side", cue: "Forearm down, hips stacked and lifted. Body straight. Hold. Obliques and hip abductors fire continuously. Progress from knees to full side plank this phase.", easier: "Knee on floor", harder: "Hip dips: lower hip 3 inches, raise back up, 12 reps each side" },
            ]
          },
          {
            label: "Superset 2 — Lower Abs + Compound", note: "3 rounds · 45s rest after round",
            exercises: [
              { num: "2a", name: "V-Sit Hold", sets: 3, reps: "20–25 sec", cue: "Sit, lean back 45°, raise legs 45°. Body forms a V-shape. Arms straight forward for balance. Breathe. Entire anterior core fires. Much harder than it looks — shaking is progress.", easier: "Bent knees version (less lever arm)", harder: "Extend arms overhead, lower legs to 35°" },
              { num: "2b", name: "Dumbbell Reverse Lunge to Knee Drive", sets: 3, reps: "10 each leg", cue: "Hold dumbbells at sides. Lunge back. As you come forward to stand — drive that knee up to hip height. Balance for 1 sec. This combines glute, core, and coordination. Burns significantly more than a regular lunge.", easier: "Reverse lunge only, no knee drive", harder: "Add an overhead press at the knee drive" },
            ]
          },
          {
            label: "Superset 3 — Full Burn Circuit", note: "3 rounds · 45s rest after round",
            exercises: [
              { num: "3a", name: "Mountain Climber", sets: 3, reps: "20 each leg", cue: "High plank. Drive knees toward chest alternately. Keep hips level — no bouncing. The faster you go, the more cardio. Start controlled and build speed set-by-set.", easier: "Step in and out slowly", harder: "Knee to opposite elbow for oblique twist" },
              { num: "3b", name: "Dumbbell Squat to Curl to Press", sets: 3, reps: "10 reps", cue: "Squat with dumbbells at sides. Stand up, immediately curl both dumbbells to shoulders, then press overhead. Lower dumbbells. That's one rep. Three exercises in one — maximum calorie burn per rep.", easier: "Squat + press only (skip curl)", harder: "Add a lateral raise at the top" },
            ]
          },
          {
            label: "Finisher — Tabata-style", note: "20 sec work / 10 sec rest × 4 rounds",
            exercises: [
              { num: "F", name: "Low-Impact Jumping Jacks OR Step Jacks", sets: 4, reps: "20 sec max effort", cue: "Alternate if you prefer: step side-to-side instead of jumping (lower impact, better for PCOS cortisol management). 4 rounds of 20 sec on / 10 sec rest. Short and effective cardio burst to end the session.", easier: "Step jacks only, moderate pace", harder: "Full jumping jacks, arms above head" },
            ]
          },
        ]
      },
    ]
  },

  // ── PHASE 3: Weeks 5–6 ──────────────────────────────────────────────────
  {
    id: "p3",
    label: "Phase 3",
    weeks: "Weeks 5–6",
    title: "Intensity & Definition",
    desc: "Full floor push-ups, complex movements, shorter rest, body composition visibly shifting",
    bgColor: "#fdf0db", borderColor: "var(--gold)", textColor: "var(--gold)",
    days: [
      {
        id: "p3-A",
        letter: "A",
        letterColor: "var(--rose)",
        title: "Legs & Glutes — Peak Load",
        subtitle: "Jump variations, max depth, glute isolation extended",
        duration: "48 min",
        warmup: "5 min full dynamic: 20 jumping jacks → 20 leg swings → 10 deep squat holds → 15 glute bridges → 5 inchworms",
        cooldown: "5 min: Pigeon 45s each → Lying figure-4 35s each → Kneeling hip flexor 35s each → Forward fold 30s",
        supersets: [
          {
            label: "Superset 1", note: "4 rounds · 40s rest after round",
            exercises: [
              { num: "1a", name: "Dumbbell Goblet Squat (max depth + tempo)", sets: 4, reps: "15 reps — 3s down, 1s hold", cue: "Maximum depth with flat heels. 3-sec controlled descent. Hold 1 sec at deepest point. Explode upward. The tempo is what creates intensity with lighter dumbbells — time under tension forces adaptation.", easier: "No tempo, normal squat", harder: "Add a calf raise at the top of every rep" },
              { num: "1b", name: "Romanian Deadlift — Single Leg", sets: 4, reps: "10 each leg", cue: "Stand on one leg, dumbbell in opposite hand. Hinge forward, dumbbell lowers along standing leg. Back stays flat. Feel deep hamstring stretch. Return by driving standing hip forward. Hold wall if needed.", easier: "Both legs, standard RDL", harder: "No wall, slow 4-sec lowering" },
            ]
          },
          {
            label: "Superset 2", note: "3 rounds · 40s rest after round",
            exercises: [
              { num: "2a", name: "Bulgarian Split Squat (heavier / more reps)", sets: 3, reps: "12 each leg", cue: "More reps than Phase 2. Focus on going lower — rear knee should graze the floor each rep. If 3 kg feels manageable, hold both dumbbells. Full depth = more glute activation.", easier: "10 reps, lighter", harder: "Slow 4-sec descent" },
              { num: "2b", name: "Sumo Squat + Dumbbell Pulse", sets: 3, reps: "15 reps + 10 pulses", cue: "15 full sumo squats. On rep 15 — stay at bottom and pulse 10 times (barely rise, come back down). Continuous tension. Inner thighs and glutes under maximum sustained load.", easier: "15 reps, no pulses", harder: "20 full + 15 pulses" },
            ]
          },
          {
            label: "Superset 3 — Advanced Glute", note: "3 rounds · 30s rest",
            exercises: [
              { num: "3a", name: "Fire Hydrant + Kickback Combo", sets: 3, reps: "15 fire hydrant + 15 kickback (each side)", cue: "On all fours. 15 fire hydrants (knee out to side) then immediately 15 donkey kicks (leg back). No rest between the two moves. Stay on one side for all 30 reps before switching. Glute medius + maximus together.", easier: "10 of each, rest between", harder: "Add dumbbell behind knee for both" },
              { num: "3b", name: "Hip Thrust (shoulders on chair)", sets: 3, reps: "15 reps", cue: "Shoulders on chair seat, feet flat on floor, knees bent. Drive hips up — body from knees to shoulders should be straight at the top. Hold 2 sec. Lower slowly. This is a proper hip thrust — the best glute builder available at home. Place one dumbbell on hip for resistance.", easier: "Glute bridge on floor, no chair", harder: "Single-leg hip thrust, 12 each" },
            ]
          },
          {
            label: "Finisher", note: "2 rounds · 60s rest",
            exercises: [
              { num: "F", name: "Squat Jump (or fast step squat)", sets: 2, reps: "12 reps", cue: "Squat down, explode upward and jump. Land soft with bent knees. If joints are uncomfortable — fast step squats instead (squat, rise on toes quickly). Explosive movement burns significantly more fat in less time.", easier: "Fast squat, rise on toes only", harder: "Pause at bottom before jumping" },
            ]
          },
        ]
      },
      {
        id: "p3-B",
        letter: "B",
        letterColor: "var(--plum)",
        title: "Upper Body + Arms — Strength Push",
        subtitle: "Full floor push-ups, complex arm supersets, rear delt focus",
        duration: "46 min",
        warmup: "5 min: 20 arm circles → 15 push-up to downdog → 10 inchworms → 20 jumping jacks → 10 scapular retractions",
        cooldown: "5 min: Doorframe pec stretch 35s → Shoulder cross-body 25s each → Tricep stretch 20s each → Downward dog 45s",
        supersets: [
          {
            label: "Superset 1 — Floor Push-Up Focus", note: "4 rounds · 40s rest after round",
            exercises: [
              { num: "1a", name: "Full Floor Push-Up", sets: 4, reps: "8–12 reps", cue: "Hands slightly wider than shoulders. Chest to 1 inch from floor. Full lockout. Core tight — no sagging hips. By now the strength is there. If form breaks at rep 8, stop at 8 and add reps next session.", easier: "Drop to chair height for final reps", harder: "Slow 4-sec descent, 1-sec pause at bottom" },
              { num: "1b", name: "Dumbbell Arnold Press (standing)", sets: 4, reps: "10 each arm", cue: "Standing version — more core activation. Rotate from palm-in at shoulder to palm-forward at top of press. Full shoulder development with one movement.", easier: "Seated, one arm", harder: "Both arms simultaneously, standing" },
            ]
          },
          {
            label: "Superset 2 — Back Width + Posture", note: "4 rounds · 40s rest after round",
            exercises: [
              { num: "2a", name: "Dumbbell Renegade Row", sets: 4, reps: "8 each arm", cue: "High plank position, both dumbbells on floor. Row one dumbbell up to hip while balancing on the other. Keep hips level — the anti-rotation is what makes this a core + back exercise simultaneously. Hard but excellent.", easier: "Knees on floor, standard bent-over row", harder: "Add a push-up between each row" },
              { num: "2b", name: "Rear Delt Fly", sets: 4, reps: "15 reps", cue: "Seated, lean forward with chest on thighs. Arms hanging. Raise both arms out like wings — rear delts only. 3-sec lowering. Key for posture improvement and back definition.", easier: "Less lean (more upright)", harder: "Hold 2 sec at top" },
            ]
          },
          {
            label: "Superset 3 — Arm Burnout", note: "3 rounds · 30s rest",
            exercises: [
              { num: "3a", name: "Hammer Curl + Shoulder Press Combo", sets: 3, reps: "10 reps", cue: "Hammer curl (thumb up) both arms to shoulders. Without lowering — press both dumbbells overhead. Lower to shoulders, then lower all the way. Two exercises, no rest between them. Bicep + shoulder in one compound move.", easier: "Do curl and press separately", harder: "Slow 4-sec lowering on both moves" },
              { num: "3b", name: "Tricep Dip (chair)", sets: 3, reps: "12–15 reps", cue: "Hands behind on chair, fingers forward. Legs extended. Lower until elbows hit 90°. Push back up. Back stays close to chair. Full tricep and shoulder contraction at top.", easier: "Knees bent, feet closer to chair", harder: "Legs elevated on second chair" },
            ]
          },
          {
            label: "Finisher", note: "2 rounds · 60s rest",
            exercises: [
              { num: "F", name: "Push-Up Hold (isometric)", sets: 2, reps: "30 sec hold at halfway", cue: "Lower to halfway — 90° elbow angle. Hold there without touching floor. Core braced. This is the hardest part of the push-up range, held. Chest, triceps, and shoulders under sustained load.", easier: "20 sec hold, hands on chair", harder: "35 sec hold at bottom" },
            ]
          },
        ]
      },
      {
        id: "p3-C",
        letter: "C",
        letterColor: "var(--sage)",
        title: "Abs + Core + Full Body Burn",
        subtitle: "Advanced core, complex movements, metabolic compound finish",
        duration: "44 min",
        warmup: "5 min: 30 jumping jacks → 10 inchworms → 20 high knees → 10 woodchop in air → cat-cow 10",
        cooldown: "5 min: Supine twist 35s each → Hollow body stretch 20s → Child's pose 45s → Deep breathing 5 cycles",
        supersets: [
          {
            label: "Superset 1 — Core Stability", note: "3 rounds · 30s rest",
            exercises: [
              { num: "1a", name: "Hollow Body Hold", sets: 3, reps: "25 sec", cue: "Arms overhead, legs 5–6 inches from floor, lower back pressed into floor. The whole body is like a bowl — everything from shoulders to knees is curved off the floor except your lower back. Elite core exercise.", easier: "Arms by sides, legs higher", harder: "Rock forward and back (hollow body rock, 15 rocks)" },
              { num: "1b", name: "Side Plank + Hip Dip", sets: 3, reps: "12 dips each side", cue: "Full side plank. Lower hip to 3 inches from floor, raise back to full height. Oblique and hip work combined. Creates the visual waist taper.", easier: "Static hold 25s", harder: "Raise top leg while dipping" },
            ]
          },
          {
            label: "Superset 2 — Rotational Core", note: "3 rounds · 30s rest",
            exercises: [
              { num: "2a", name: "Dumbbell Russian Twist", sets: 3, reps: "20 each side", cue: "Sit, knees bent, lean back 45°. Hold one dumbbell with both hands. Rotate it from side to side — touch it near the floor on each side. Feet can be grounded or raised (harder). Oblique fire.", easier: "No dumbbell, feet grounded", harder: "Feet raised, heavier dumbbell" },
              { num: "2b", name: "Leg Raise + Hip Lift", sets: 3, reps: "12 reps", cue: "On back. Raise legs to 90°, then push hips off the floor (feet point toward ceiling). Lower hips, then lower legs to 2 inches — don't rest. Lower abs and hip flexors under continuous tension.", easier: "Bent knee raises, skip hip lift", harder: "Slow 5-sec lowering of legs each rep" },
            ]
          },
          {
            label: "Superset 3 — Compound Burn", note: "4 rounds · 45s rest",
            exercises: [
              { num: "3a", name: "Dumbbell Thrusters", sets: 4, reps: "12 reps", cue: "Hold both dumbbells at shoulders. Squat deeply. As you drive up from the squat, press both dumbbells overhead in one continuous movement. Lower as you return to squat. Maximum calorie burn per rep — legs + shoulders + core.", easier: "Squat only, or press only", harder: "Slow 3-sec squat descent, explosive press" },
              { num: "3b", name: "Mountain Climber — Oblique", sets: 4, reps: "20 each side", cue: "High plank. Drive right knee toward LEFT elbow (crossing the body). Alternate sides. This is the oblique version — harder and more effective for waist definition than the straight version.", easier: "Straight mountain climber (knee to same side)", harder: "3-sec hold when knee reaches elbow" },
            ]
          },
          {
            label: "Finisher — AMRAP 5 min", note: "As many rounds as possible in 5 minutes",
            exercises: [
              { num: "F", name: "5-Min AMRAP Circuit", sets: 1, reps: "AMRAP 5 min", cue: "10 step jacks → 8 dumbbell squat + press → 10 bicycle crunches each side → 8 dumbbell rows each arm. Track how many rounds you complete. Try to beat it next week. Rest only when you absolutely must.", easier: "Slow pace, rest as needed", harder: "Include jumping jacks (full jump)" },
            ]
          },
        ]
      },
    ]
  },

  // ── PHASE 4: Weeks 7–8 ──────────────────────────────────────────────────
  {
    id: "p4",
    label: "Phase 4",
    weeks: "Weeks 7–8",
    title: "Peak Output — Final 2 Weeks",
    desc: "Maximum intensity for the available equipment, body composition visibly changed, push to finish",
    bgColor: "#e8f0e9", borderColor: "var(--sage)", textColor: "var(--sage)",
    days: [
      {
        id: "p4-A",
        letter: "A",
        letterColor: "var(--rose)",
        title: "Legs & Glutes — Final Peak",
        subtitle: "Max volume, hip thrust loaded, unilateral emphasis",
        duration: "50 min",
        warmup: "5 min full dynamic",
        cooldown: "5 min: Pigeon 50s each → Figure-4 40s each → Hip flexor deep lunge 35s each → Standing quad 30s each",
        supersets: [
          {
            label: "Superset 1 — Strength Block", note: "4 rounds · 40s rest",
            exercises: [
              { num: "1a", name: "Bulgarian Split Squat (maximum depth + reps)", sets: 4, reps: "14 each leg", cue: "Rear knee should actually graze the floor now. Front thigh past parallel. Both dumbbells. 14 reps at this depth is genuinely hard. Track reps — compare to Week 3.", easier: "12 reps, less depth", harder: "Add 3-sec pause at bottom" },
              { num: "1b", name: "Dumbbell Sumo Deadlift (slow eccentric)", sets: 4, reps: "12 reps — 4s lowering", cue: "Full 4-second lowering on every rep. This eccentric-focus doubles the stimulus with the same weight. Muscles under tension longer = more adaptation = more fat burned post-workout.", easier: "Standard pace, 3-sec lowering", harder: "Pause 2 sec at bottom" },
            ]
          },
          {
            label: "Superset 2", note: "3 rounds · 40s rest",
            exercises: [
              { num: "2a", name: "Hip Thrust (loaded, shoulders on chair)", sets: 3, reps: "15 reps", cue: "Dumbbell on hip. Shoulders on chair. Full hip extension — squeeze glutes maximally at top, hold 2 sec. This is the peak glute exercise. By now the form should be comfortable enough to focus entirely on the contraction.", easier: "Glute bridge on floor", harder: "Single-leg, 12 each side" },
              { num: "2b", name: "Walking Lunge (in place) with Dumbbells", sets: 3, reps: "12 each leg", cue: "Step forward, lunge, come back to standing, alternate legs. Continuous movement. Both dumbbells. This is harder than reverse lunge — forward momentum requires more balance and glute engagement.", easier: "Reverse lunge", harder: "Add knee drive at top" },
            ]
          },
          {
            label: "Superset 3", note: "3 rounds · 30s rest",
            exercises: [
              { num: "3a", name: "Curtsy Lunge + Side Kick", sets: 3, reps: "10 each side", cue: "Curtsy lunge, come back up, then raise same leg directly to the side (abduction kick). That's one rep. Hip and glute simultaneously.", easier: "Curtsy only, no kick", harder: "Add dumbbell at chest" },
              { num: "3b", name: "Glute Bridge 1.5 Rep Method", sets: 3, reps: "12 reps", cue: "Drive hips up fully (count 1). Lower halfway (count 2). Drive back up (count 3). Lower fully (count 4). That's ONE rep. The 1.5 rep method doubles time under tension without needing more weight.", easier: "Standard full reps", harder: "Dumbbell on hip" },
            ]
          },
          {
            label: "Finisher", note: "2 rounds · 60s rest",
            exercises: [
              { num: "F", name: "Squat + Lateral Raise Combo", sets: 2, reps: "12 reps", cue: "Hold one dumbbell in each hand. Squat down. As you rise, raise both arms laterally to shoulder height. Lower arms as you squat again. Legs + shoulders + cardio in one. Final burnout.", easier: "Squat only, or lateral raise only", harder: "Slow 3-sec squat descent" },
            ]
          },
        ]
      },
      {
        id: "p4-B",
        letter: "B",
        letterColor: "var(--plum)",
        title: "Upper Body + Arms — Final Strength",
        subtitle: "Floor push-up max, renegade rows, full arm complex",
        duration: "46 min",
        warmup: "5 min full dynamic",
        cooldown: "5 min: Full upper body stretch sequence",
        supersets: [
          {
            label: "Superset 1 — Push Max", note: "4 rounds · 40s rest",
            exercises: [
              { num: "1a", name: "Full Floor Push-Up (max reps)", sets: 4, reps: "Max reps perfect form", cue: "Don't cap the reps. Go to failure with perfect form. Track your number. This is your final push-up benchmark. Compare to your Week 1 attempt.", easier: "Add incline drop-set after failure", harder: "Slow 5-sec descent every rep" },
              { num: "1b", name: "Push-Up to Side Plank", sets: 4, reps: "6 each side", cue: "Do a push-up. At the top, rotate into a full side plank — raise one arm to ceiling. Hold 2 sec. Return. Another push-up. Other side. Integration of push, core, and stability in one movement.", easier: "Just push-up, skip rotation", harder: "Raise top leg during side plank" },
            ]
          },
          {
            label: "Superset 2 — Back + Rear Shoulder", note: "4 rounds · 40s rest",
            exercises: [
              { num: "2a", name: "Dumbbell Renegade Row", sets: 4, reps: "10 each arm", cue: "More reps than Phase 3. Body stays completely rigid — no rotation. This is as close to a 'gym row' as you can get at home. Each set should feel challenging.", easier: "Knees on floor", harder: "Push-up between each row" },
              { num: "2b", name: "Rear Delt Fly + Shrug at top", sets: 4, reps: "12 reps", cue: "Standard bent-over fly. At the top of each rep — add a shoulder shrug. Traps and rear delts together. Upper back and posture.", easier: "No shrug, standard fly", harder: "Hold 2 sec at top" },
            ]
          },
          {
            label: "Superset 3 — Final Arm Complex", note: "3 rounds · 30s rest",
            exercises: [
              { num: "3a", name: "Bicep Curl 21s + 10 full reps", sets: 3, reps: "31 total reps", cue: "Complete the full 21s (7+7+7). Then without rest — do 10 regular full curls. 31 total reps. Complete bicep exhaustion. With 3 kg this is extremely challenging.", easier: "Just 21s", harder: "Add slow 5-sec lowering on the 10 full reps" },
              { num: "3b", name: "Tricep Overhead + Kickback Superset", sets: 3, reps: "10 + 10 each arm", cue: "10 overhead extensions (dumbbell behind head). Immediately 10 kickbacks (hinge forward, extend back). No rest. Both tricep exercises back-to-back. Full tricep exhaustion.", easier: "10 overhead only", harder: "Slow 4-sec lowering on both" },
            ]
          },
          {
            label: "Finisher", note: "2 rounds · 60s rest",
            exercises: [
              { num: "F", name: "Dumbbell Complex (no put-down)", sets: 2, reps: "8 each", cue: "Don't put the dumbbells down: 8 curls → 8 shoulder press → 8 lateral raise → 8 bent-over rows. One full round without resting the dumbbells. This is an upper body metabolic complex — burns fat, builds endurance.", easier: "Rest between exercises", harder: "10 reps each, add tricep kickback at end" },
            ]
          },
        ]
      },
      {
        id: "p4-C",
        letter: "C",
        letterColor: "var(--sage)",
        title: "Abs + Core + Full Body Burn — FINAL",
        subtitle: "Peak core difficulty, 6-min AMRAP, everything at once",
        duration: "45 min",
        warmup: "5 min full dynamic",
        cooldown: "5 min: Full body stretch + 5 min deep breathing — final session celebration",
        supersets: [
          {
            label: "Superset 1 — Elite Core", note: "3 rounds · 30s rest",
            exercises: [
              { num: "1a", name: "Hollow Body Rock", sets: 3, reps: "20 rocks", cue: "Hollow body position. Use your body's curve to rock forward and back. Keep the shape — don't break it during the rocking. Gymnastic core standard. Should feel very hard.", easier: "Static hollow hold 25 sec", harder: "Arms fully overhead, legs lower (4 inches)" },
              { num: "1b", name: "Side Plank + Rotation", sets: 3, reps: "10 each side", cue: "Side plank on forearm. Reach top arm under your body in a rotation. Bring it back to the sky. Thoracic rotation + oblique hold simultaneously. The rotation makes it significantly harder.", easier: "Static side plank hold", harder: "Hip dips + rotation combined" },
            ]
          },
          {
            label: "Superset 2 — Loaded Core", note: "3 rounds · 30s rest",
            exercises: [
              { num: "2a", name: "Dumbbell Russian Twist (elevated feet)", sets: 3, reps: "20 each side", cue: "Feet raised off floor (harder than grounded). One dumbbell both hands. Rotate side to side, touching dumbbell near floor. The raised feet mean your core works harder to stabilise the whole position.", easier: "Feet on floor", harder: "Slow 2-sec rotation each side" },
              { num: "2b", name: "Leg Raise + Hip Lift + Lower (slow)", sets: 3, reps: "10 reps", cue: "Raise legs to 90°. Push hips up (hip lift). Lower hips. Lower legs over 5 full seconds to 2 inches from floor. Do not rest at bottom. Back to up. The 5-second lowering is what makes it hard.", easier: "Skip hip lift, slower lowering", harder: "Lower legs to 1 inch from floor" },
            ]
          },
          {
            label: "Superset 3 — Maximum Burn", note: "4 rounds · 40s rest",
            exercises: [
              { num: "3a", name: "Dumbbell Thrusters (max pace)", sets: 4, reps: "15 reps", cue: "Final phase — push the pace. Squat deep, drive up explosively, press overhead hard. 15 reps means the last 3–4 should feel very challenging. This is your primary fat-burning movement.", easier: "10 reps, controlled pace", harder: "Slow eccentric on squat, explosive press" },
              { num: "3b", name: "Plank + Mountain Climber Oblique", sets: 4, reps: "15 each side", cue: "High plank, then 15 knee-to-opposite-elbow mountain climbers. Core is already pre-exhausted from plank position. This compound ends every session with maximum calorie burn.", easier: "10 each side, straight mountain climber", harder: "3-sec hold each time knee reaches elbow" },
            ]
          },
          {
            label: "Final Finisher — 6 Min AMRAP", note: "Track rounds — your final benchmark",
            exercises: [
              { num: "F", name: "6-Min AMRAP — Final Score", sets: 1, reps: "As many rounds as possible", cue: "10 step jacks → 10 dumbbell thrusters → 10 bicycle crunches each side → 10 dumbbell rows each arm → 20 mountain climbers. Count your rounds. This is your Day 60 fitness test. Compare to your Week 5 AMRAP score.", easier: "5-min AMRAP, 8 reps each", harder: "Full jumping jacks, 12 reps each" },
            ]
          },
        ]
      },
    ]
  },
];

// ─── WEEKLY SCHEDULE ─────────────────────────────────────────────────────────
const weeklySchedule = [
  ["Mon", "Day A — Legs & Glutes", "var(--rose)"],
  ["Tue", "Rest / 20-min walk", "var(--sage)"],
  ["Wed", "Day B — Upper Body + Arms", "var(--plum)"],
  ["Thu", "Rest / yoga / walk", "var(--sage)"],
  ["Fri", "Day C — Abs + Core + Full Burn", "var(--gold)"],
  ["Sat", "Active rest — 30-min walk", "var(--sage)"],
  ["Sun", "Full Rest", "#ccc"],
];

// ─── DIET ────────────────────────────────────────────────────────────────────
const meals = [
  { time: "7:30 AM — Breakfast", items: ["2–3 whole eggs any style (14–18g protein)", "1 jowar/bajra roti OR half cup oats with milk", "1 tsp flaxseed ground (add to oats/roti dough — PCOS essential)", "Warm methi water or spearmint tea (before meal if possible)"], protein: "~18–24g", note: "Eat within 1 hr of waking" },
  { time: "10:30 AM — Mid-Morning", items: ["1 cup roasted chana or mixed nuts (15g protein)", "1 guava, apple, or pear — low GI only", "NO banana/mango/grapes at this time"], protein: "~10–15g", note: "Stabilises blood sugar before lunch" },
  { time: "1:00 PM — Lunch", items: ["Salad FIRST (cucumber + tomato + onion + lemon)", "1 cup dal + 100g paneer OR soy chunks (25g protein)", "1–2 jowar roti OR half cup brown rice", "1 cup any sabzi"], protein: "~25–30g", note: "Eat salad before carbs — reduces glucose spike" },
  { time: "3:30 PM — Craving Window ♡", items: ["♡ MOST IMPORTANT PCOS MEAL — do not skip", "Option A: Curd + 1 tsp chia + 1 tsp honey (sweet craving)", "Option B: Peanut butter on jowar roti (1 tbsp)", "Option C: Makhana (fox nuts) — a big bowl, guilt-free"], protein: "~8–12g", note: "Prevents dinner binge — PCOS cortisol peak hour" },
  { time: "7:00 PM — Post-Workout Dinner", items: ["2 eggs OR 150g paneer OR 1.5 cup rajma/chole (20–28g protein)", "1 roti only (or skip if not hungry)", "Large sabzi + salad", "No rice at dinner — single biggest insulin improvement"], protein: "~22–28g", note: "Eat within 60 min post-workout" },
  { time: "9:00 PM — Night Craving Fix ♡", items: ["1 cup warm milk with haldi + black pepper", "OR: spearmint tea with 2 dates + 1 tsp peanut butter", "1 piece 85%+ dark chocolate if craving is strong"], protein: "~8–10g", note: "Spearmint tea = natural testosterone reducer for PCOS" },
];

// ─── TRACKER ─────────────────────────────────────────────────────────────────
const trackerWeeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8", "Day 60"];
const trackerMetrics = ["Weight (kg)", "Waist (cm)", "Hips (cm)", "Push-ups", "Plank (sec)", "Energy (1-10)"];

// ─── MINDSET ─────────────────────────────────────────────────────────────────
const mindset = [
  { week: "Week 1–2", theme: "Three Days Is Enough — If You Show Up", text: "Three focused sessions done properly create more change than five half-hearted ones. Your only job these two weeks is to show up all three days, every week, and do the full session. Not perfect — just present." },
  { week: "Week 3–4", theme: "Track What The Scale Won't Show You", text: "PCOS makes the scale unreliable in the short term. Track these instead: waist tighter? Energy better? Cravings less intense? Skin clearer? These are happening before fat loss shows up on the scale. They are real progress." },
  { week: "Week 5–6", theme: "The Body Is Changing — Stay The Course", text: "By now the compound effect is working. Your metabolism is faster than it was on Day 1. Your muscles are more metabolically active. Your insulin sensitivity is better. Every session this week is compounding the ones before it." },
  { week: "Week 7–8", theme: "Finish Like It Matters — Because It Does", text: "These are the weeks most people coast. Don't. The final two weeks are where the real definition comes from. Push hardest now. Day 60 photos will show someone who pushed all the way to the end." },
];

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("overview");
  const [openPhase, setOpenPhase] = useState("p1");
  const [openDay, setOpenDay] = useState(null);
  const [trackerData, setTrackerData] = useState({});
  const [activeWeek, setActiveWeek] = useState(0);
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "workout", label: "Workouts" },
    { id: "schedule", label: "Schedule" },
    { id: "diet", label: "Diet" },
    { id: "tracker", label: "Tracker" },
    { id: "mindset", label: "Mindset" },
  ];

  const saveTracker = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <>
      <style>{style}</style>
      <div className="app">

        <div className="hero">
          <div className="hero-chip">♡ PCOS-Aware · 3 Days/Week · 2×3kg Dumbbells</div>
          <h1>Stronger,<br /><em>Leaner, Shaped</em></h1>
          <p className="hero-sub">3 focused sessions a week. 40–50 minutes each. Designed around 2×3kg dumbbells and bodyweight — upgraded to match your level.</p>
        </div>

        <div className="stats-row">
          {[["3", "Days/Week"],["40–50", "Min/Session"],["2×3kg", "Dumbbells"],["8", "Weeks"],["A+B+C", "Split"],["PCOS", "Aware"]].map(([v,l]) => (
            <div className="stat-card" key={l}>
              <div className="stat-val" style={{fontSize: v.length > 4 ? "16px" : "", color: v==="PCOS" ? "var(--rose)" : ""}}>{v}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>

        <nav className="nav">
          {tabs.map(t => <button key={t.id} className={`nav-btn${tab===t.id?" active":""}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
        </nav>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div>
            <div className="section-title">The <em>3-Day Plan</em></div>
            <p className="section-sub">What it is, how it works, and what to expect at your level.</p>

            <div className="alert alert-rose">
              <div className="alert-title">♡ Why 3 Days Works for PCOS</div>
              <p>For insulin-resistant PCOS, <b>3 well-structured strength sessions per week is optimal</b> — not a compromise. More sessions raise cortisol, which directly worsens PCOS symptoms and fat storage. Three hard sessions with full recovery between them produces better hormonal outcomes and fat loss than 5 moderate sessions. The key is: those 3 sessions must be <b>done completely and consistently</b>.</p>
            </div>

            <div className="two-col">
              <div className="card">
                <div className="card-title" style={{fontSize:15}}>Day A — Legs & Glutes</div>
                <p style={{fontSize:13, color:"var(--text-soft)", lineHeight:1.7}}>The biggest muscle groups = highest calorie burn per session. Hip thrusts, split squats, goblet squats, RDL, isolation glute work. This is your <b style={{color:"var(--rose)"}}>hardest and most important</b> session each week.</p>
              </div>
              <div className="card">
                <div className="card-title" style={{fontSize:15}}>Day B — Upper Body + Arms</div>
                <p style={{fontSize:13, color:"var(--text-soft)", lineHeight:1.7}}>Push-ups, dumbbell rows, shoulder press, Arnold press, bicep curls, tricep work. Builds the shoulder width that creates the <b style={{color:"var(--plum)"}}>V-taper illusion</b> — shoulders wider, waist looks narrower.</p>
              </div>
            </div>
            <div className="card">
              <div className="card-title" style={{fontSize:15}}>Day C — Abs + Core + Full Body Burn</div>
              <p style={{fontSize:13, color:"var(--text-soft)", lineHeight:1.7}}>Deep core, obliques, compound dumbbell movements, metabolic finishers. This is your <b style={{color:"var(--sage)"}}>fat-burning session</b> — the AMRAP finishers elevate your metabolic rate for 12–24 hours post-workout.</p>
            </div>

            <div className="divider" />

            <div className="card">
              <div className="card-title">Superset Format — Why It's Intense</div>
              <p style={{fontSize:13, color:"var(--text-soft)", marginBottom:10, lineHeight:1.7}}>Every session uses <b style={{color:"var(--rose)"}}>supersets</b> — two exercises done back-to-back with 30–45s rest only between pairs. This:</p>
              <table>
                <thead><tr><th>Benefit</th><th>What It Means For You</th></tr></thead>
                <tbody>
                  {[
                    ["Higher heart rate throughout", "More calories burned vs traditional sets"],
                    ["Less total time", "40–50 min sessions feel like 60 min of work"],
                    ["Metabolic afterburn (EPOC)", "Body burns extra calories for 12–24 hrs post-session"],
                    ["Muscle fatigue from different angles", "Better shaping than single-exercise sets"],
                    ["PCOS-safe intensity", "Gets heart rate up without cortisol-spiking HIIT"],
                  ].map(([b,w]) => <tr key={b}><td style={{color:"var(--plum)", fontWeight:600}}>{b}</td><td>{w}</td></tr>)}
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="card-title">Realistic 8-Week Expectations</div>
              <table>
                <thead><tr><th>Metric</th><th>Now</th><th>Week 4</th><th>Week 8</th></tr></thead>
                <tbody>
                  {[
                    ["Weight","74 kg","72–73 kg","70–71 kg*"],
                    ["Waist","Measure today","−2 to −3 cm","−4 to −6 cm"],
                    ["Hips/thighs","Measure today","Firmer, same or slightly smaller","−2 to −4 cm"],
                    ["Push-ups (floor)","0–3 floor","5–8 floor","10–14 floor"],
                    ["Energy level","Measure /10 today","+2 from baseline","+3 to +4"],
                    ["Cravings intensity","High (PCOS-driven)","Reducing","Noticeably manageable"],
                  ].map(([m,n,w4,w8]) => <tr key={m}><td style={{color:"var(--rose)", fontWeight:600}}>{m}</td><td>{n}</td><td style={{color:"var(--plum)"}}>{w4}</td><td style={{color:"var(--sage)", fontWeight:600}}>{w8}</td></tr>)}
                </tbody>
              </table>
              <p style={{fontSize:11.5, color:"var(--text-soft)", marginTop:10, fontStyle:"italic"}}>* PCOS weight loss is slower than the average — 3–4 kg in 8 weeks with consistent diet is excellent and clinically meaningful. Focus on waist + photos.</p>
            </div>
          </div>
        )}

        {/* ── WORKOUT ── */}
        {tab === "workout" && (
          <div>
            <div className="section-title">The <em>Workouts</em></div>
            <p className="section-sub">4 phases × 3 days. Expand each phase, then each day. Rest: 30–45s within supersets, 40–60s between supersets.</p>

            {phases.map(phase => (
              <div key={phase.id}>
                <div className="week-phase-header"
                  style={{background: phase.bgColor, border: `1px solid ${phase.borderColor}`, borderLeft: `4px solid ${phase.borderColor}`, color: phase.textColor}}
                  onClick={() => setOpenPhase(openPhase === phase.id ? null : phase.id)}>
                  <div style={{flex:1}}>
                    <h3 style={{color: phase.textColor}}>{phase.label} — {phase.weeks}</h3>
                    <p>{phase.title} · {phase.desc}</p>
                  </div>
                  <span style={{fontSize:22, color: phase.textColor}}>{openPhase === phase.id ? "−" : "+"}</span>
                </div>

                {openPhase === phase.id && phase.days.map(day => {
                  const dkey = day.id;
                  return (
                    <div className="day-card" key={dkey}>
                      <div className="day-card-header" onClick={() => setOpenDay(openDay === dkey ? null : dkey)}>
                        <div className="day-letter" style={{color: day.letterColor}}>{day.letter}</div>
                        <div className="day-info">
                          <h3>{day.title}</h3>
                          <p>{day.subtitle}</p>
                        </div>
                        <div className="day-meta">
                          <div className="time">⏱ {day.duration}</div>
                        </div>
                        <span className="expand-btn">{openDay === dkey ? "−" : "+"}</span>
                      </div>

                      {openDay === dkey && (
                        <div className="day-body">
                          <div className="warmup-box">
                            <b>Warm-Up (5 min)</b>{day.warmup}
                          </div>

                          {day.supersets.map((ss, si) => (
                            <div className="superset-block" key={si}>
                              <div className="superset-label">
                                {ss.label}
                                <span className="superset-rest">{ss.note}</span>
                              </div>
                              {ss.exercises.map((ex, ei) => (
                                <div className="ex-item" key={ei}>
                                  <div className="ex-top">
                                    <span className="ex-num">{ex.num}</span>
                                    <span className="ex-name">{ex.name}</span>
                                    <div className="ex-badges">
                                      <span className="ex-badge badge-sets">{ex.sets}×</span>
                                      <span className="ex-badge badge-reps">{ex.reps}</span>
                                    </div>
                                  </div>
                                  <div className="ex-cue"><b>Form: </b>{ex.cue}</div>
                                  {ex.easier && (
                                    <div className="ex-prog">
                                      <div className="prog-easy"><div className="prog-lbl">↓ Easier</div><p>{ex.easier}</p></div>
                                      <div className="prog-hard"><div className="prog-lbl">↑ Harder</div><p>{ex.harder}</p></div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}

                          <div className="cooldown-box">
                            <b>Cooldown (5 min)</b>{day.cooldown}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* ── SCHEDULE ── */}
        {tab === "schedule" && (
          <div>
            <div className="section-title">Weekly <em>Schedule</em></div>
            <p className="section-sub">Same structure every week — only the content inside each session gets harder phase by phase.</p>

            <div className="card" style={{marginBottom:16}}>
              {weeklySchedule.map(([day, session, color]) => (
                <div key={day} style={{display:"flex", alignItems:"center", gap:14, padding:"11px 0", borderBottom:"1px solid var(--border)"}}>
                  <div style={{fontFamily:"'DM Mono',monospace", fontSize:11, color:"var(--text-soft)", minWidth:28, textTransform:"uppercase"}}>{day}</div>
                  <div style={{width:3, height:32, background:color, borderRadius:2, flexShrink:0}}></div>
                  <div style={{fontSize:14, fontWeight:600, color: color === "#ccc" ? "var(--text-soft)" : "var(--text)"}}>{session}</div>
                </div>
              ))}
            </div>

            <div className="alert alert-sage">
              <div className="alert-title">🚶 Daily Walk (not optional for PCOS)</div>
              <p>A 10–15 min walk <b>after each meal</b> is one of the most powerful tools for insulin-resistant PCOS. It doesn't need to be intense. Even a gentle post-meal walk reduces glucose spikes by 20–30%, directly improving the hormonal cycle that drives weight gain. This is on top of workouts, not instead of them.</p>
            </div>

            <div className="card">
              <div className="card-title">Phase-by-Phase Schedule Overview</div>
              <table>
                <thead><tr><th>Phase</th><th>Weeks</th><th>Intensity Level</th><th>Key Change</th></tr></thead>
                <tbody>
                  {[
                    ["Phase 1","1–2","Moderate-Hard","Supersets established, form priority, 3 rounds most"],
                    ["Phase 2","3–4","Hard","4 rounds on main supersets, heavier dumbbell use, floor push-up attempts"],
                    ["Phase 3","5–6","Hard-Very Hard","Full floor push-ups, renegade rows, AMRAP finishers begin"],
                    ["Phase 4","7–8","Peak","Max reps, complex movements, 6-min AMRAP final benchmark"],
                  ].map(([p,w,i,k]) => <tr key={p}><td style={{color:"var(--rose)", fontWeight:600}}>{p}</td><td>{w}</td><td style={{color:"var(--plum)", fontWeight:600}}>{i}</td><td>{k}</td></tr>)}
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="card-title">Rest Day Activities</div>
              <table>
                <thead><tr><th>Day Type</th><th>Do This</th><th>Why</th></tr></thead>
                <tbody>
                  {[
                    ["Active Rest (Tue/Thu)","20–30 min walk (ideally after a meal)","Insulin sensitivity, cortisol management, recovery"],
                    ["Active Rest (Sat)","30 min walk OR gentle yoga","Active recovery improves next session"],
                    ["Full Rest (Sun)","Nothing — sleep 8 hrs, eat well","Muscle repair, hormonal reset, sustainable long-term"],
                    ["During period (heavy days)","Yoga + walk only","Avoid cortisol spike during hormonal fluctuation"],
                  ].map(([d,a,w]) => <tr key={d}><td style={{color:"var(--sage)", fontWeight:600}}>{d}</td><td>{a}</td><td style={{fontSize:12}}>{w}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── DIET ── */}
        {tab === "diet" && (
          <div>
            <div className="section-title">PCOS <em>Diet Plan</em></div>
            <p className="section-sub">Designed for insulin resistance — low GI, protein-first, craving-aware. Indian foods only.</p>
            <div className="alert alert-plum">
              <div className="alert-title">🎯 Daily Targets</div>
              <p><b style={{color:"var(--plum)"}}>Calories: 1600–1750 kcal</b> (not under 1500 — raises cortisol and worsens PCOS) · <b style={{color:"var(--plum)"}}>Protein: 90–100g</b> · <b style={{color:"var(--plum)"}}>Meal order: Salad → Protein → Carbs</b> · <b style={{color:"var(--plum)"}}>Water: 3 litres/day</b></p>
            </div>
            {meals.map((m, i) => (
              <div className="card" key={i}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10, flexWrap:"wrap", gap:8}}>
                  <div className="card-title" style={{fontSize:15, margin:0}}>{m.time}</div>
                  <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
                    <span className="tag tag-sage">{m.protein}</span>
                    <span className="tag tag-plum">{m.note}</span>
                  </div>
                </div>
                <ul style={{listStyle:"none", fontSize:13}}>
                  {m.items.map(item => (
                    <li key={item} style={{padding:"4px 0", borderBottom:"1px solid var(--border)", color: item.startsWith("♡") || item.startsWith("NO ") ? "var(--rose)" : "var(--text-soft)", fontWeight: item.startsWith("♡") ? "700" : "400"}}>
                      <span style={{color:"var(--rose)"}}>♡ </span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="divider" />
            <div className="food-grid">
              {[
                { title: "PCOS Must-Haves", items: ["Flaxseed 1 tsp daily (grind it)", "Spearmint tea 1–2 cups daily", "Walnuts or almonds daily", "Cinnamon in chai (not sugar)", "85%+ dark chocolate (craving fix)", "Methi/fenugreek water morning"] },
                { title: "Best Protein (affordable)", items: ["Eggs — cheapest complete protein", "Soy chunks 52g/100g dry", "Rajma + dal combo", "Curd/dahi daily", "Paneer 18g/100g", "Peanut butter 8g/2tbsp"] },
                { title: "Low GI Carbs (choose these)", items: ["Jowar / bajra / ragi roti", "Brown rice (half cup max)", "Sweet potato > regular potato", "Oats (steel cut best)", "All legumes freely", "All vegetables freely"] },
                { title: "Reduce / Cut", items: ["Maida — all forms", "White rice large portions", "Sugar in chai (1 tsp jaggery max)", "Packaged biscuits/snacks", "Cold drinks and juices", "Excess dairy (keep to curd + milk)"] },
              ].map(({title,items}) => (
                <div className="food-card" key={title}>
                  <h4>{title}</h4>
                  <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TRACKER ── */}
        {tab === "tracker" && (
          <div>
            <div className="section-title">Progress <em>Tracker</em></div>
            <p className="section-sub">Log every week. With PCOS, waist and energy tell you more than the scale does.</p>
            <div className="week-tabs">
              {trackerWeeks.map((w,i) => <button key={i} className={`week-tab${activeWeek===i?" active":""}`} onClick={() => setActiveWeek(i)}>{w}</button>)}
            </div>
            <div className="tracker-grid">
              {trackerMetrics.map(m => (
                <div className="tracker-card" key={m}>
                  <label>{m}</label>
                  <input type="text" placeholder="—" value={trackerData[`${activeWeek}_${m}`]||""} onChange={e => setTrackerData(p => ({...p, [`${activeWeek}_${m}`]:e.target.value}))} />
                </div>
              ))}
            </div>
            <button className="save-btn" onClick={saveTracker}>Save {trackerWeeks[activeWeek]}</button>
            {saved && <div className="save-msg">♡ saved — you're doing great</div>}
          </div>
        )}

        {/* ── MINDSET ── */}
        {tab === "mindset" && (
          <div>
            <div className="section-title">60-Day <em>Mindset</em></div>
            <p className="section-sub">PCOS asks for patience. Consistency asks for discipline. These two together create transformation.</p>
            {mindset.map((m,i) => (
              <div className="mindset-card" key={i}>
                <div className="mindset-week">{m.week}</div>
                <div className="mindset-theme">{m.theme}</div>
                <p>{m.text}</p>
              </div>
            ))}
            <div className="divider" />
            <div className="card">
              <div className="card-title">Non-Scale Victories to Track Weekly</div>
              <table>
                <thead><tr><th>Victory</th><th>What It Actually Signals</th></tr></thead>
                <tbody>
                  {[
                    ["Energy is better this week","Insulin sensitivity improving — metabolism waking up"],
                    ["Cravings feel less intense","Blood sugar more stable — PCOS hormonal cycle improving"],
                    ["Waist measurement reduced","Visceral fat (deep belly fat) reducing — most meaningful PCOS win"],
                    ["Skin clearer or less oily","Androgens reducing — direct PCOS improvement"],
                    ["Workout felt easier than last week","Cardiovascular and muscular adaptation — you are fitter"],
                    ["Didn't binge this week","Meal timing and protein intake working — blood sugar stable"],
                  ].map(([v,s]) => <tr key={v}><td style={{color:"var(--rose)", fontWeight:600, fontSize:13}}>{v}</td><td style={{fontSize:12}}>{s}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
