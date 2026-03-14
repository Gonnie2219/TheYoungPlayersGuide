import { type AgeGroup } from "./sleep-content";

// ── Training volume by age ──

export interface TrainingByAge {
  ageGroup: AgeGroup;
  label: string;
  sessionsPerWeek: string;
  sessionDuration: string;
  matchesPerWeek: string;
  focusSplit: string;
  tips: string[];
}

export const trainingByAge: TrainingByAge[] = [
  {
    ageGroup: "6-9",
    label: "Ages 6–9",
    sessionsPerWeek: "2–3",
    sessionDuration: "45–60 min",
    matchesPerWeek: "1",
    focusSplit: "70% play/fun, 30% structured",
    tips: [
      "Keep sessions game-based — small-sided games and activities with a ball",
      "Avoid repetitive drills; variety and fun are the priority",
      "Include multi-sport play to build general athleticism",
      "No formal fitness training — physical development comes through play",
    ],
  },
  {
    ageGroup: "10-12",
    label: "Ages 10–12",
    sessionsPerWeek: "3–4",
    sessionDuration: "60–75 min",
    matchesPerWeek: "1",
    focusSplit: "60% play/games, 40% structured training",
    tips: [
      "Introduce basic technical skills (passing, dribbling, shooting) through guided practice",
      "Begin teaching simple tactical concepts like positioning and spacing",
      "Include coordination and agility activities in warm-ups",
      "Encourage continued participation in other sports",
    ],
  },
  {
    ageGroup: "13-15",
    label: "Ages 13–15",
    sessionsPerWeek: "4–5",
    sessionDuration: "75–90 min",
    matchesPerWeek: "1–2",
    focusSplit: "40% play/games, 60% structured training",
    tips: [
      "Increase technical complexity — combination play, weak foot, set pieces",
      "Introduce position-specific tactical training",
      "Begin age-appropriate strength and conditioning (bodyweight, light resistance)",
      "Monitor training load during growth spurts — injury risk increases",
    ],
  },
  {
    ageGroup: "16-18",
    label: "Ages 16–18",
    sessionsPerWeek: "5–6",
    sessionDuration: "90 min",
    matchesPerWeek: "1–2",
    focusSplit: "30% play/games, 70% structured training",
    tips: [
      "Training can closely resemble senior-level sessions in intensity and complexity",
      "Structured strength and conditioning programs are appropriate",
      "Include periodization — vary intensity across the season",
      "Ensure adequate rest days (at least 1–2 per week)",
    ],
  },
];

// ── LTAD stages ──

export interface LtadStage {
  ageGroup: AgeGroup;
  stageName: string;
  focus: string;
  keyPrinciples: string[];
}

export const ltadStages: LtadStage[] = [
  {
    ageGroup: "6-9",
    stageName: "FUNdamentals",
    focus: "Develop physical literacy through fun and play",
    keyPrinciples: [
      "ABCs of movement: Agility, Balance, Coordination, Speed",
      "Unstructured play and games should dominate",
      "Exposure to multiple sports is ideal — avoid early specialization",
      "Focus on enjoyment and building a love for physical activity",
      "No competitive pressure — winning is not the goal at this stage",
    ],
  },
  {
    ageGroup: "10-12",
    stageName: "Learn to Train",
    focus: "Build foundational sport skills during the optimal learning window",
    keyPrinciples: [
      "Peak motor skill development window — this is the best time to learn techniques",
      "Introduce structured skill practice alongside game-based activities",
      "Develop all-around athleticism: speed, flexibility, endurance",
      "Begin teaching basic tactics and decision-making",
      "Multi-sport participation is still encouraged",
    ],
  },
  {
    ageGroup: "13-15",
    stageName: "Train to Train",
    focus: "Build an aerobic base and consolidate sport-specific skills",
    keyPrinciples: [
      "Emphasis on aerobic conditioning and building endurance",
      "Consolidate and refine technical skills under pressure",
      "Introduce strength training with proper technique (bodyweight first)",
      "Increase tactical understanding and game awareness",
      "Monitor growth spurts — adjust training intensity accordingly",
    ],
  },
  {
    ageGroup: "16-18",
    stageName: "Train to Compete",
    focus: "Optimize fitness, tactics, and mental preparation for competition",
    keyPrinciples: [
      "Position-specific training becomes a priority",
      "Advanced tactical and set-piece work",
      "Structured strength and power development",
      "Mental performance skills: visualization, pressure management",
      "Periodized training across the competitive season",
    ],
  },
];

// ── Sample activities ──

export interface ActivityCategory {
  category: "technical" | "tactical" | "physical" | "coordination";
  label: string;
  activities: { name: string; description: string; ageGroups: AgeGroup[] }[];
}

export const activityCategories: ActivityCategory[] = [
  {
    category: "technical",
    label: "Technical Skills",
    activities: [
      {
        name: "Ball mastery circuits",
        description: "Dribbling through cones with various surfaces of the foot",
        ageGroups: ["6-9", "10-12", "13-15", "16-18"],
      },
      {
        name: "Passing pairs",
        description: "Two-player passing drills focusing on accuracy and weight of pass",
        ageGroups: ["6-9", "10-12", "13-15", "16-18"],
      },
      {
        name: "Shooting technique",
        description: "Striking from different angles with laces, instep, and side-foot",
        ageGroups: ["10-12", "13-15", "16-18"],
      },
      {
        name: "Combination play",
        description: "Wall passes, overlaps, and quick give-and-go sequences",
        ageGroups: ["13-15", "16-18"],
      },
      {
        name: "Weak foot development",
        description: "All drills repeated with the non-dominant foot",
        ageGroups: ["10-12", "13-15", "16-18"],
      },
    ],
  },
  {
    category: "tactical",
    label: "Tactical Awareness",
    activities: [
      {
        name: "Small-sided games (3v3, 4v4)",
        description: "Games that force quick decisions, support play, and spatial awareness",
        ageGroups: ["6-9", "10-12", "13-15", "16-18"],
      },
      {
        name: "Positional play grids (rondos)",
        description: "Keep-ball exercises teaching shape, angles, and movement off the ball",
        ageGroups: ["10-12", "13-15", "16-18"],
      },
      {
        name: "Pressing and defensive shape",
        description: "Group exercises on when and how to press as a unit",
        ageGroups: ["13-15", "16-18"],
      },
      {
        name: "Set-piece rehearsals",
        description: "Corners, free kicks, and throw-ins with planned routines",
        ageGroups: ["13-15", "16-18"],
      },
      {
        name: "Video analysis sessions",
        description: "Review match footage to understand positioning and decision-making",
        ageGroups: ["16-18"],
      },
    ],
  },
  {
    category: "physical",
    label: "Physical Development",
    activities: [
      {
        name: "Tag and chase games",
        description: "Fun speed and agility games that develop acceleration",
        ageGroups: ["6-9", "10-12"],
      },
      {
        name: "Bodyweight circuits",
        description: "Squats, lunges, push-ups, planks for foundational strength",
        ageGroups: ["10-12", "13-15", "16-18"],
      },
      {
        name: "Interval running with the ball",
        description: "Aerobic conditioning combined with dribbling to build match fitness",
        ageGroups: ["13-15", "16-18"],
      },
      {
        name: "Resistance training",
        description: "Light weights with proper technique, supervised by qualified coaches",
        ageGroups: ["16-18"],
      },
      {
        name: "Sprint and deceleration drills",
        description: "Short sprints with controlled stops to improve speed and reduce injury risk",
        ageGroups: ["13-15", "16-18"],
      },
    ],
  },
  {
    category: "coordination",
    label: "Coordination & Movement",
    activities: [
      {
        name: "Obstacle courses",
        description: "Crawling, jumping, balancing — develops general motor skills",
        ageGroups: ["6-9", "10-12"],
      },
      {
        name: "Ladder and hurdle drills",
        description: "Footwork patterns through agility ladders and mini hurdles",
        ageGroups: ["6-9", "10-12", "13-15", "16-18"],
      },
      {
        name: "Balance challenges",
        description: "Single-leg exercises, balance boards, and partner pushes",
        ageGroups: ["10-12", "13-15", "16-18"],
      },
      {
        name: "Multi-directional movement",
        description: "Cutting, shuffling, and backpedaling at various speeds",
        ageGroups: ["10-12", "13-15", "16-18"],
      },
      {
        name: "Reaction drills",
        description: "Respond to visual or auditory cues with quick movements",
        ageGroups: ["13-15", "16-18"],
      },
    ],
  },
];

// ── Plan generator ──

export type TrainingLevel = "recreational" | "club" | "academy";
export type Position = "goalkeeper" | "defender" | "midfielder" | "forward";

export interface PlanProfile {
  ageGroup: AgeGroup;
  level: TrainingLevel;
  sessionsPerWeek: number;
  sessionMinutes: number;
  weeklyPlan: { day: string; focus: string; activities: string[] }[];
}

export const planProfiles: PlanProfile[] = [
  // 6-9
  {
    ageGroup: "6-9",
    level: "recreational",
    sessionsPerWeek: 2,
    sessionMinutes: 45,
    weeklyPlan: [
      { day: "Tuesday", focus: "Ball fun & coordination", activities: ["Ball mastery circuits", "Tag and chase games", "Small-sided games (3v3)"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up games", "Match (4v4 or 5v5)"] },
    ],
  },
  {
    ageGroup: "6-9",
    level: "club",
    sessionsPerWeek: 3,
    sessionMinutes: 50,
    weeklyPlan: [
      { day: "Tuesday", focus: "Movement & ball skills", activities: ["Obstacle courses", "Passing pairs", "Ladder drills"] },
      { day: "Thursday", focus: "Games & creativity", activities: ["Ball mastery circuits", "Small-sided games (3v3, 4v4)"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up games", "Match (5v5 or 7v7)"] },
    ],
  },
  {
    ageGroup: "6-9",
    level: "academy",
    sessionsPerWeek: 3,
    sessionMinutes: 60,
    weeklyPlan: [
      { day: "Tuesday", focus: "Technical foundations", activities: ["Ball mastery circuits", "Passing pairs", "Ladder and hurdle drills"] },
      { day: "Thursday", focus: "Game play", activities: ["Small-sided games (3v3, 4v4)", "Obstacle courses", "Tag and chase games"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up", "Match (7v7)"] },
    ],
  },
  // 10-12
  {
    ageGroup: "10-12",
    level: "recreational",
    sessionsPerWeek: 2,
    sessionMinutes: 60,
    weeklyPlan: [
      { day: "Wednesday", focus: "Skills & games", activities: ["Ball mastery circuits", "Passing pairs", "Small-sided games (4v4)"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up", "Match (7v7 or 9v9)"] },
    ],
  },
  {
    ageGroup: "10-12",
    level: "club",
    sessionsPerWeek: 3,
    sessionMinutes: 70,
    weeklyPlan: [
      { day: "Tuesday", focus: "Technical skills", activities: ["Ball mastery circuits", "Shooting technique", "Weak foot development"] },
      { day: "Thursday", focus: "Tactical play", activities: ["Positional play grids (rondos)", "Small-sided games (4v4)", "Bodyweight circuits"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up", "Match (9v9)"] },
    ],
  },
  {
    ageGroup: "10-12",
    level: "academy",
    sessionsPerWeek: 4,
    sessionMinutes: 75,
    weeklyPlan: [
      { day: "Monday", focus: "Technical mastery", activities: ["Ball mastery circuits", "Passing pairs", "Shooting technique"] },
      { day: "Wednesday", focus: "Tactical & coordination", activities: ["Positional play grids (rondos)", "Ladder and hurdle drills", "Balance challenges"] },
      { day: "Friday", focus: "Physical & skills", activities: ["Bodyweight circuits", "Weak foot development", "Small-sided games (4v4)"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up", "Match (9v9 or 11v11)"] },
    ],
  },
  // 13-15
  {
    ageGroup: "13-15",
    level: "recreational",
    sessionsPerWeek: 3,
    sessionMinutes: 75,
    weeklyPlan: [
      { day: "Tuesday", focus: "Technical development", activities: ["Ball mastery circuits", "Passing pairs", "Shooting technique"] },
      { day: "Thursday", focus: "Games & fitness", activities: ["Small-sided games (4v4)", "Interval running with the ball"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up", "Match (11v11)"] },
    ],
  },
  {
    ageGroup: "13-15",
    level: "club",
    sessionsPerWeek: 4,
    sessionMinutes: 80,
    weeklyPlan: [
      { day: "Monday", focus: "Technical & tactical", activities: ["Combination play", "Positional play grids (rondos)", "Pressing and defensive shape"] },
      { day: "Wednesday", focus: "Physical & coordination", activities: ["Bodyweight circuits", "Sprint and deceleration drills", "Ladder and hurdle drills"] },
      { day: "Friday", focus: "Match preparation", activities: ["Set-piece rehearsals", "Small-sided games", "Shooting technique"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up", "Match (11v11)"] },
    ],
  },
  {
    ageGroup: "13-15",
    level: "academy",
    sessionsPerWeek: 5,
    sessionMinutes: 90,
    weeklyPlan: [
      { day: "Monday", focus: "Technical mastery", activities: ["Combination play", "Weak foot development", "Shooting technique"] },
      { day: "Tuesday", focus: "Tactical work", activities: ["Positional play grids (rondos)", "Pressing and defensive shape", "Set-piece rehearsals"] },
      { day: "Thursday", focus: "Physical development", activities: ["Bodyweight circuits", "Sprint and deceleration drills", "Interval running with the ball"] },
      { day: "Friday", focus: "Match preparation", activities: ["Small-sided games", "Reaction drills", "Set-piece rehearsals"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up", "Match (11v11)"] },
    ],
  },
  // 16-18
  {
    ageGroup: "16-18",
    level: "recreational",
    sessionsPerWeek: 3,
    sessionMinutes: 90,
    weeklyPlan: [
      { day: "Tuesday", focus: "Technical & tactical", activities: ["Combination play", "Positional play grids (rondos)", "Small-sided games"] },
      { day: "Thursday", focus: "Fitness & skills", activities: ["Bodyweight circuits", "Shooting technique", "Sprint and deceleration drills"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up", "Match (11v11)"] },
    ],
  },
  {
    ageGroup: "16-18",
    level: "club",
    sessionsPerWeek: 5,
    sessionMinutes: 90,
    weeklyPlan: [
      { day: "Monday", focus: "Strength & conditioning", activities: ["Resistance training", "Sprint and deceleration drills", "Bodyweight circuits"] },
      { day: "Tuesday", focus: "Technical & tactical", activities: ["Combination play", "Positional play grids (rondos)", "Pressing and defensive shape"] },
      { day: "Thursday", focus: "Match preparation", activities: ["Set-piece rehearsals", "Small-sided games", "Video analysis sessions"] },
      { day: "Friday", focus: "Recovery & light skills", activities: ["Ball mastery circuits", "Passing pairs", "Balance challenges"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up", "Match (11v11)"] },
    ],
  },
  {
    ageGroup: "16-18",
    level: "academy",
    sessionsPerWeek: 6,
    sessionMinutes: 90,
    weeklyPlan: [
      { day: "Monday", focus: "Strength & power", activities: ["Resistance training", "Sprint and deceleration drills"] },
      { day: "Tuesday", focus: "Technical mastery", activities: ["Combination play", "Weak foot development", "Shooting technique"] },
      { day: "Wednesday", focus: "Tactical & team shape", activities: ["Positional play grids (rondos)", "Pressing and defensive shape", "Set-piece rehearsals"] },
      { day: "Thursday", focus: "Physical conditioning", activities: ["Interval running with the ball", "Reaction drills", "Multi-directional movement"] },
      { day: "Friday", focus: "Match preparation", activities: ["Small-sided games", "Video analysis sessions", "Set-piece rehearsals"] },
      { day: "Saturday", focus: "Game day", activities: ["Warm-up", "Match (11v11)"] },
    ],
  },
];

// Position-relevant activity keywords for highlighting
export const positionRelevance: Record<Position, string[]> = {
  goalkeeper: ["Reaction drills", "Balance challenges", "Multi-directional movement"],
  defender: ["Pressing and defensive shape", "Sprint and deceleration drills", "Balance challenges"],
  midfielder: ["Positional play grids (rondos)", "Combination play", "Interval running with the ball"],
  forward: ["Shooting technique", "Sprint and deceleration drills", "Combination play"],
};

// ── Tab content ──

export const ltadStagesContent = {
  intro:
    "The Long-Term Athlete Development (LTAD) model outlines age-appropriate stages of training that maximize development while minimizing burnout and injury risk. Each stage has different priorities.",
  points: [
    {
      text: "The LTAD model identifies key developmental windows where specific types of training have the greatest impact on long-term athletic potential.",
      citation: "balyi-2004",
    },
    {
      text: "Skipping developmental stages or pushing advanced training too early undermines long-term development and increases dropout rates.",
      citation: "ford-2011",
    },
    {
      text: "Physical, cognitive, and emotional maturity all develop at different rates — training should account for biological age, not just chronological age.",
      citation: "balyi-2004",
    },
    {
      text: "Players who follow developmentally appropriate progressions are more likely to reach elite levels and sustain long careers.",
      citation: "ford-2011",
    },
  ],
};

export const trainingVolumeContent = {
  intro:
    "Training volume should increase gradually as young athletes mature. Overloading children with too many sessions too early is one of the leading causes of burnout and overuse injuries in youth soccer.",
  points: [
    {
      text: "A simple guideline: the number of hours of organized sport per week should not exceed the child's age (e.g., a 10-year-old should train no more than 10 hours/week).",
      citation: "lloyd-2014",
    },
    {
      text: "Rest days are not optional — young athletes need at least 1–2 complete rest days per week for recovery and growth.",
      citation: "ford-2011",
    },
    {
      text: "Year-round single-sport training increases overuse injury risk. Off-season breaks and multi-sport participation are protective.",
      citation: "lloyd-2014",
    },
    {
      text: "Monitoring subjective fatigue and mood is as important as tracking objective training load in youth athletes.",
      citation: "ford-2011",
    },
  ],
};

export const sampleActivitiesContent = {
  intro:
    "Well-rounded training includes technical, tactical, physical, and coordination activities. The mix should shift as athletes develop — from play-based in younger ages to more structured in older ones.",
  points: [
    {
      text: "Integrative neuromuscular training — combining strength, agility, balance, and coordination — should begin early and continue through all developmental stages.",
      citation: "myer-2011",
    },
    {
      text: "Youth resistance training is safe and effective when properly supervised and age-appropriate. It reduces injury risk and enhances performance.",
      citation: "faigenbaum-2009",
    },
    {
      text: "Activities should progress from simple to complex and from general to sport-specific as the athlete matures.",
      citation: "myer-2011",
    },
  ],
};

export const planGeneratorContent = {
  intro:
    "Use the plan generator to create a sample weekly training schedule based on age group and competition level. The generated plan provides a starting framework — adjust based on individual needs and the competitive calendar.",
  points: [
    {
      text: "Training frequency and intensity should match the player's developmental stage and competition level.",
      citation: "lloyd-2014",
    },
    {
      text: "Even at higher levels, the training-to-competition ratio should favor training over matches in youth development.",
      citation: "ford-2011",
    },
  ],
};

export const earlySpecializationContent = {
  intro:
    "Early specialization — focusing exclusively on one sport before age 12 — is a growing concern in youth soccer. Research consistently shows it does more harm than good for most young athletes.",
  points: [
    {
      text: "Children who specialize in a single sport before age 12 are at higher risk for overuse injuries, burnout, and psychological stress.",
      citation: "brenner-2007",
    },
    {
      text: "Early specialization does not increase the likelihood of elite success. Most elite athletes played multiple sports as children.",
      citation: "cote-2009",
    },
    {
      text: "Overuse injuries account for up to 50% of all injuries in youth sports. Repetitive single-sport training is the primary driver.",
      citation: "brenner-2007",
    },
    {
      text: "Diversified sport participation in childhood develops a broader movement vocabulary and protects against dropout.",
      citation: "cote-2009",
    },
    {
      text: "Deliberate play and sampling multiple activities in early years builds intrinsic motivation, which is the strongest predictor of long-term participation.",
      citation: "cote-2009",
    },
  ],
};

export const quickTakeaways = [
  "Follow the LTAD model — each age has different training priorities. Don't skip stages.",
  "Training hours per week should not exceed the child's age.",
  "Younger players need more play, older players need more structure — adjust the ratio as they grow.",
  "Multi-sport participation before age 12 builds better athletes and prevents burnout.",
  "Include coordination, strength, and agility work alongside technical and tactical training.",
  "At least 1–2 rest days per week are essential, even for competitive players.",
];
