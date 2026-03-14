export type AgeGroup = "6-9" | "10-12" | "13-15" | "16-18";

export interface SleepRecommendation {
  ageGroup: AgeGroup;
  label: string;
  hours: string;
  tips: string[];
}

export const sleepRecommendations: SleepRecommendation[] = [
  {
    ageGroup: "6-9",
    label: "Ages 6–9",
    hours: "9–12 hours",
    tips: [
      "Set a consistent bedtime by 8:00–8:30 PM",
      "Read a book together as a wind-down ritual",
      "Avoid screens at least 1 hour before bed",
      "Keep the bedroom cool, dark, and quiet",
    ],
  },
  {
    ageGroup: "10-12",
    label: "Ages 10–12",
    hours: "9–11 hours",
    tips: [
      "Aim for lights-out by 9:00 PM on school nights",
      "Limit evening screen time — blue light delays melatonin",
      "Encourage a short wind-down routine (stretching, reading)",
      "Keep weekend wake times within 1 hour of weekday times",
    ],
  },
  {
    ageGroup: "13-15",
    label: "Ages 13–15",
    hours: "8–10 hours",
    tips: [
      "Teens' circadian clocks shift later — but still need 8+ hours",
      "Set a phone curfew at least 30 minutes before bed",
      "Use dim, warm lighting in the evening",
      "Avoid caffeine after 2:00 PM",
    ],
  },
  {
    ageGroup: "16-18",
    label: "Ages 16–18",
    hours: "8–10 hours",
    tips: [
      "Prioritize sleep even with busy schedules — it's a performance tool",
      "Naps of 20–30 minutes can help but shouldn't replace nighttime sleep",
      "Keep a consistent schedule, especially during competitive seasons",
      "Avoid late-night training sessions when possible",
    ],
  },
];

export const whyItMattersContent = {
  intro:
    "Sleep is one of the most powerful — and most overlooked — tools for young athletes. During deep sleep, the body releases growth hormone, repairs muscle tissue, and consolidates the skills learned during practice.",
  points: [
    {
      text: "Growth hormone is primarily released during deep sleep, making it essential for young athletes who are still developing physically.",
      citation: "halson-2014",
    },
    {
      text: "Sleep deprivation impairs reaction time, decision-making, and sprint performance — all critical in soccer.",
      citation: "fullagar-2015",
    },
    {
      text: "Stanford athletes who extended sleep to 10 hours saw faster sprint times, better reaction times, and improved mood.",
      citation: "mah-2011",
    },
    {
      text: "Memory consolidation during sleep helps athletes retain tactical and motor skills learned during training.",
      citation: "fullagar-2015",
    },
  ],
};

export const sleepHygieneContent = {
  intro:
    "Good sleep hygiene means building habits and an environment that promote consistent, quality sleep every night.",
  tips: [
    {
      text: "Set a screen curfew: blue light from phones and tablets suppresses melatonin production, especially in adolescents whose circadian systems are still maturing.",
      citation: "carskadon-2011",
    },
    {
      text: "Keep the bedroom cool (65–68°F / 18–20°C), dark, and quiet. Consider blackout curtains for early-morning light.",
      citation: "halson-2014",
    },
    {
      text: "Maintain a consistent sleep-wake schedule, even on weekends. Irregular schedules fragment sleep quality.",
      citation: "halson-2014",
    },
    {
      text: "Create a 20–30 minute wind-down routine: stretching, reading, or breathing exercises signal the body to prepare for sleep.",
      citation: "halson-2014",
    },
  ],
};

export const gameDayContent = {
  intro:
    "Sleep strategy around match days can give your young athlete a real performance edge.",
  tips: [
    {
      text: "Bank sleep in the days leading up to a big match. Even one extra hour per night for a week can improve performance.",
      citation: "mah-2011",
    },
    {
      text: "A short pre-match nap (20–30 minutes, ending 2+ hours before kickoff) can boost alertness without causing grogginess.",
      citation: "halson-2014",
    },
    {
      text: "After evening matches, avoid screens and heavy meals. A light snack and calm environment help the body wind down from competition adrenaline.",
      citation: "fullagar-2015",
    },
    {
      text: "For travel matches, bring familiar sleep items (pillow, eye mask) and allow extra time for settling in.",
      citation: "halson-2014",
    },
  ],
};

export const warningSigns = {
  intro:
    "Chronic sleep deprivation often shows up in subtle ways before it becomes a bigger problem. Watch for these signs:",
  signs: [
    {
      text: "Adolescent athletes who slept fewer than 8 hours per night were 1.7× more likely to suffer an injury.",
      citation: "milewski-2014",
    },
    {
      text: "Persistent fatigue, difficulty waking up, or falling asleep during school or car rides.",
      citation: "fullagar-2015",
    },
    {
      text: "Mood changes — increased irritability, anxiety, or loss of motivation for training.",
      citation: "fullagar-2015",
    },
    {
      text: "Declining performance despite consistent training — slower times, more mistakes, poor decision-making on the field.",
      citation: "fullagar-2015",
    },
  ],
};

export const quickTakeaways = [
  "Sleep is when growth hormone is released and muscles repair — it's not optional for young athletes.",
  "Most youth players need 9–11 hours; teens need at least 8–10 hours per night.",
  "Screens before bed suppress melatonin — set a phone curfew.",
  "Athletes who sleep less than 8 hours are significantly more likely to get injured.",
  "Consistent sleep schedules matter more than occasional long sleep-ins.",
];
