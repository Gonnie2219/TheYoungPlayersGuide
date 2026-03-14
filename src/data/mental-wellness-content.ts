import { type AgeGroup } from "./sleep-content";

// ── Age-specific mental wellness tips ──

export interface MentalWellnessByAge {
  ageGroup: AgeGroup;
  label: string;
  stressSignals: string[];
  copingStrategies: string[];
}

export const mentalWellnessByAge: MentalWellnessByAge[] = [
  {
    ageGroup: "6-9",
    label: "Ages 6–9",
    stressSignals: [
      "Not wanting to go to practice or games anymore",
      "Frequent stomach aches or headaches before matches",
      "Crying easily or becoming unusually clingy",
      "Regression in behavior (thumb-sucking, bedwetting)",
    ],
    copingStrategies: [
      "Keep it fun — play-based activities with no scoreboard pressure",
      "Use simple breathing exercises ('smell the flower, blow the candle')",
      "Encourage drawing or talking about feelings after games",
      "Praise effort and enjoyment, never results",
    ],
  },
  {
    ageGroup: "10-12",
    label: "Ages 10–12",
    stressSignals: [
      "Comparing themselves negatively to teammates",
      "Loss of enthusiasm for a sport they used to love",
      "Increased anxiety before tryouts or selections",
      "Withdrawal from social interaction with teammates",
    ],
    copingStrategies: [
      "Teach basic positive self-talk ('I can do this' vs 'I'm terrible')",
      "Introduce simple goal-setting — focus on personal improvement",
      "Encourage journaling about what went well after each session",
      "Maintain involvement in multiple activities outside soccer",
    ],
  },
  {
    ageGroup: "13-15",
    label: "Ages 13–15",
    stressSignals: [
      "Perfectionism — harsh self-criticism after mistakes",
      "Social media comparison with peers or older athletes",
      "Mood swings tied to game performance",
      "Overtraining despite fatigue or minor injuries",
    ],
    copingStrategies: [
      "Practice mindfulness or short meditation (5–10 minutes daily)",
      "Develop pre-performance routines to manage nerves",
      "Set process goals (e.g., 'communicate more') instead of outcome goals",
      "Limit social media exposure around competition days",
    ],
  },
  {
    ageGroup: "16-18",
    label: "Ages 16–18",
    stressSignals: [
      "Chronic fatigue unrelated to physical load",
      "Feeling trapped — playing out of obligation, not enjoyment",
      "Anxiety about college recruitment or career decisions",
      "Emotional exhaustion and detachment from the team",
    ],
    copingStrategies: [
      "Use visualization and mental rehearsal before big matches",
      "Build a support network — trusted coach, mentor, or counselor",
      "Schedule regular 'unplugged' time away from soccer",
      "Develop a personal identity narrative that extends beyond sport",
    ],
  },
];

// ── Tab content ──

export const burnoutRecognitionContent = {
  intro:
    "Burnout in youth athletes is more than just tiredness — it's a syndrome of emotional exhaustion, reduced sense of accomplishment, and sport devaluation. Recognizing the signs early is the best prevention.",
  points: [
    {
      text: "Athlete burnout is characterized by three dimensions: emotional/physical exhaustion, reduced sense of accomplishment, and sport devaluation.",
      citation: "gustafsson-2017",
    },
    {
      text: "Burnout is not caused by training volume alone — it stems from a perceived loss of control, one-dimensional identity, and external pressure.",
      citation: "coakley-1992",
    },
    {
      text: "Young athletes who feel they have no say in their sport participation are at significantly higher risk of burnout.",
      citation: "coakley-1992",
    },
    {
      text: "Early detection is critical — burnout develops gradually and is much harder to reverse once entrenched.",
      citation: "gustafsson-2017",
    },
  ],
};

export const stressManagementContent = {
  intro:
    "Stress is a normal part of competition, but young athletes need age-appropriate tools to manage it. The goal is not to eliminate stress but to build resilience and healthy coping habits.",
  points: [
    {
      text: "Mental skills training — including relaxation, imagery, and self-talk — can be introduced as early as age 10 when adapted to the child's developmental level.",
      citation: "vealey-2007",
    },
    {
      text: "Psychological well-being in youth sport depends on the quality of the social environment, not just the athlete's individual skills.",
      citation: "dohme-2017",
    },
    {
      text: "Building psychological resilience requires a supportive environment where mistakes are treated as learning opportunities.",
      citation: "vealey-2007",
    },
    {
      text: "Young athletes benefit most from coping strategies that match their cognitive development — concrete techniques for younger, more abstract for older.",
      citation: "dohme-2017",
    },
  ],
};

export const identityContent = {
  intro:
    "When a young person's entire identity revolves around being a soccer player, a bad game can feel like a personal crisis. Helping athletes develop a whole-person identity is one of the most protective factors against burnout and mental health struggles.",
  points: [
    {
      text: "Athletes whose identity is exclusively tied to sport are more vulnerable to burnout, depression, and difficulty coping with injury or deselection.",
      citation: "coakley-1992",
    },
    {
      text: "Burnout is fundamentally a social problem rooted in how youth sport structures limit young people's ability to develop multidimensional identities.",
      citation: "coakley-1992",
    },
    {
      text: "Encouraging participation in non-sport activities — arts, academics, social groups — builds resilience and protects against over-identification with sport.",
      citation: "gustafsson-2017",
    },
    {
      text: "Athletes with a broader sense of self recover more quickly from setbacks and are more likely to sustain long-term participation.",
      citation: "gustafsson-2017",
    },
  ],
};

export const communicationContent = {
  intro:
    "How adults talk to young athletes about mental health and performance shapes how those athletes experience sport. Open, supportive communication creates safety; pressure and criticism create anxiety.",
  points: [
    {
      text: "Psychological constructs like confidence, motivation, and resilience are deeply influenced by the language and feedback young athletes receive from adults.",
      citation: "dohme-2017",
    },
    {
      text: "Parents who ask 'Did you have fun?' and 'What did you learn?' instead of 'Did you win?' foster healthier sport experiences.",
      citation: "knight-2017",
    },
    {
      text: "Children are highly sensitive to non-verbal cues — body language on the sideline can be as impactful as what is said in the car ride home.",
      citation: "knight-2017",
    },
    {
      text: "Creating a psychologically safe environment means athletes feel comfortable discussing struggles without fear of losing playing time.",
      citation: "dohme-2017",
    },
  ],
};

export const parentsCoachesContent = {
  intro:
    "Parents and coaches are the most influential figures in a young athlete's sport experience. Their behavior, expectations, and emotional responses directly shape whether sport is a source of growth or stress.",
  points: [
    {
      text: "Parental involvement exists on a spectrum — the optimal level is engaged and supportive without being controlling or pressuring.",
      citation: "knight-2017",
    },
    {
      text: "Coaches who emphasize a mastery climate (effort, learning, improvement) over an ego climate (winning, social comparison) produce athletes with better mental health outcomes.",
      citation: "smoll-2011",
    },
    {
      text: "Coach-training programs that teach positive reinforcement, mistake-contingent encouragement, and sound technical instruction significantly improve youth sport experiences.",
      citation: "smoll-2011",
    },
    {
      text: "When a young athlete shows persistent signs of anxiety, depression, or disordered eating, parents and coaches should seek professional support — these issues require more than sport-based interventions.",
      citation: "knight-2017",
    },
  ],
};

export const quickTakeaways = [
  "Burnout is not just being tired — it's emotional exhaustion, reduced accomplishment, and loss of love for the sport.",
  "Athletes whose entire identity is 'soccer player' are more vulnerable to burnout and mental health struggles.",
  "Age-appropriate stress management tools build resilience — start with simple techniques for younger players.",
  "How parents and coaches communicate matters as much as what they say — sideline body language counts.",
  "A mastery-focused coaching climate (effort over winning) produces better mental health outcomes.",
  "If a young athlete shows persistent anxiety, depression, or disordered eating, seek professional help.",
];
