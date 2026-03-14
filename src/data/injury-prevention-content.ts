import { type AgeGroup } from "./sleep-content";

// ── Age-specific injury data ──

export interface InjuryPreventionByAge {
  ageGroup: AgeGroup;
  label: string;
  commonInjuries: string[];
  riskFactors: string[];
}

export const injuryPreventionByAge: InjuryPreventionByAge[] = [
  {
    ageGroup: "6-9",
    label: "Ages 6–9",
    commonInjuries: [
      "Minor contusions and bruises from falls",
      "Ankle sprains from uneven surfaces",
      "Wrist and forearm fractures from falling",
      "Mild muscle strains from sudden bursts of activity",
    ],
    riskFactors: [
      "Still developing coordination and balance",
      "Growth plates are open and vulnerable to stress",
      "Limited body awareness during rapid growth",
      "Inadequate warm-up habits at this age",
    ],
  },
  {
    ageGroup: "10-12",
    label: "Ages 10–12",
    commonInjuries: [
      "Ankle sprains — the most common youth soccer injury",
      "Sever's disease (heel pain from growth plate irritation)",
      "Osgood-Schlatter disease (knee pain below the kneecap)",
      "Muscle strains in the quadriceps and hamstrings",
    ],
    riskFactors: [
      "Growth spurts create muscle-tendon tightness",
      "Increasing training volume without adequate recovery",
      "Beginning of sport specialization and year-round play",
      "Muscle imbalances between dominant and non-dominant legs",
    ],
  },
  {
    ageGroup: "13-15",
    label: "Ages 13–15",
    commonInjuries: [
      "ACL and meniscus injuries — risk rises sharply at this age",
      "Ankle sprains with higher severity",
      "Hamstring and groin strains from increased intensity",
      "Concussions from aerial challenges and collisions",
    ],
    riskFactors: [
      "Peak height velocity — rapid bone growth outpaces muscle adaptation",
      "Higher training loads and competitive intensity",
      "Previous injury is the strongest predictor of future injury",
      "Fatigue from multiple teams or tournament overload",
    ],
  },
  {
    ageGroup: "16-18",
    label: "Ages 16–18",
    commonInjuries: [
      "ACL injuries — especially in female players",
      "Chronic ankle instability from repeated sprains",
      "Stress fractures from overuse and under-recovery",
      "Muscle injuries (hamstring, hip flexor, adductor)",
    ],
    riskFactors: [
      "Adult-level training loads on still-maturing bodies",
      "Sport specialization and year-round competition",
      "Inadequate sleep and nutritional deficits (RED-S risk)",
      "Psychological pressure leading to training through pain",
    ],
  },
];

// ── Tab content ──

export const commonInjuriesContent = {
  intro:
    "Youth soccer injuries follow predictable patterns that change as players grow. Understanding the most common injuries at each age helps parents and coaches recognize problems early and seek appropriate care.",
  points: [
    {
      text: "Ankle sprains are the most frequent injury in youth soccer, followed by knee injuries and muscle strains.",
      citation: "le-gall-2006",
    },
    {
      text: "Growth plate injuries are unique to young athletes — the cartilage at the ends of growing bones is weaker than surrounding ligaments and tendons.",
      citation: "read-2016",
    },
    {
      text: "Overuse injuries account for a significant proportion of youth soccer injuries, often resulting from year-round play without adequate rest periods.",
      citation: "le-gall-2006",
    },
    {
      text: "Concussions require special attention in youth players, as developing brains are more vulnerable and take longer to recover.",
      citation: "read-2016",
    },
  ],
};

export const riskFactorsContent = {
  intro:
    "Knowing why injuries happen is the first step in preventing them. Risk factors in youth soccer are a mix of biological development, training decisions, and recoverable factors that coaches and parents can influence.",
  points: [
    {
      text: "Growth spurts are a major risk period — rapid bone growth creates temporary muscle tightness and coordination changes that increase vulnerability.",
      citation: "read-2016",
    },
    {
      text: "Training load errors — sudden increases in volume or intensity — are one of the most modifiable risk factors for youth injury.",
      citation: "soligard-2016",
    },
    {
      text: "A previous injury is the single strongest predictor of future injury, making complete rehabilitation essential before return to play.",
      citation: "read-2016",
    },
    {
      text: "Neuromuscular deficits — poor landing mechanics, knee valgus, and muscle imbalances — are identifiable and correctable risk factors.",
      citation: "read-2016",
    },
  ],
};

export const preventionStrategiesContent = {
  intro:
    "The best injury is the one that never happens. Evidence-based prevention programs like the FIFA 11+ have been shown to significantly reduce injury rates in youth soccer when implemented consistently.",
  points: [
    {
      text: "The FIFA 11+ warm-up program reduced injuries by approximately one-third in young female players in a large cluster-randomized trial.",
      citation: "soligard-2008",
    },
    {
      text: "Neuromuscular training programs that include balance, plyometrics, and strength exercises can reduce youth sport injuries by up to 50%.",
      citation: "emery-2015",
    },
    {
      text: "Exercise-based injury prevention programs are effective across age groups when performed at least two to three times per week.",
      citation: "rossler-2014",
    },
    {
      text: "Proper warm-up and cool-down routines, including dynamic stretching before and static stretching after activity, are foundational prevention habits.",
      citation: "soligard-2008",
    },
    {
      text: "Load management — monitoring training volume and ensuring adequate rest — is critical, especially during growth spurts and competitive seasons.",
      citation: "soligard-2016",
    },
  ],
};

export const sleepNutritionInjuryContent = {
  intro:
    "Injury prevention extends beyond the training pitch. Sleep and nutrition are foundational pillars that directly affect injury risk — tired and under-fueled athletes get hurt more often.",
  points: [
    {
      text: "Adolescent athletes who slept fewer than 8 hours per night were 1.7× more likely to suffer an injury compared to those who slept 8+ hours.",
      citation: "milewski-2014",
    },
    {
      text: "Relative Energy Deficiency in Sport (RED-S) impairs bone health and significantly increases stress fracture risk in young athletes.",
      citation: "mountjoy-2014",
    },
    {
      text: "Adequate hydration reduces muscle cramping and heat-related illness risk, both of which increase injury exposure during training and matches.",
      citation: "soligard-2016",
    },
  ],
};

export const whenInjuredContent = {
  intro:
    "When an injury happens, the response in the first hours and days matters enormously. Modern sports medicine has evolved beyond simple RICE (Rest, Ice, Compression, Elevation) to a more comprehensive approach.",
  points: [
    {
      text: "The PEACE & LOVE framework guides acute and sub-acute injury management: Protect, Elevate, Avoid anti-inflammatories, Compress, Educate — then Load, Optimism, Vascularisation, Exercise.",
      citation: "rossler-2014",
    },
    {
      text: "Return-to-play decisions should follow a graduated, criteria-based protocol — not a fixed timeline. Young athletes need clearance at each stage before progressing.",
      citation: "soligard-2016",
    },
    {
      text: "Seek professional evaluation for any injury involving joint swelling, inability to bear weight, persistent pain beyond 48 hours, or any head impact with symptoms.",
      citation: "emery-2015",
    },
    {
      text: "The psychological impact of injury is significant in young athletes — feelings of isolation, fear of re-injury, and identity disruption should be addressed alongside physical rehabilitation.",
      citation: "rossler-2014",
    },
  ],
};

export const quickTakeaways = [
  "Ankle sprains and knee injuries are the most common in youth soccer — many are preventable.",
  "Growth spurts are a high-risk period — monitor training loads during rapid growth.",
  "The FIFA 11+ warm-up program can reduce injuries by up to 50% when done consistently.",
  "Sleep under 8 hours increases injury risk 1.7× — recovery starts off the pitch.",
  "Previous injury is the #1 predictor of future injury — complete rehab before returning to play.",
  "When injured, follow PEACE & LOVE and use graduated return-to-play protocols.",
];
