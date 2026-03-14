import { type AgeGroup } from "./sleep-content";

export interface NutritionByAge {
  ageGroup: AgeGroup;
  label: string;
  calories: string;
  carbsPerKg: string;
  proteinPerKg: string;
  hydrationMl: string;
  tips: string[];
}

export const nutritionByAge: NutritionByAge[] = [
  {
    ageGroup: "6-9",
    label: "Ages 6–9",
    calories: "1,400–1,800 kcal",
    carbsPerKg: "3–5 g/kg",
    proteinPerKg: "1.0–1.2 g/kg",
    hydrationMl: "1,200–1,500 mL",
    tips: [
      "Focus on whole foods — fruits, vegetables, whole grains, and lean protein",
      "Offer a balanced snack 1–2 hours before practice",
      "Keep water available at all times during training",
      "Avoid restricting food groups; growing bodies need variety",
    ],
  },
  {
    ageGroup: "10-12",
    label: "Ages 10–12",
    calories: "1,600–2,200 kcal",
    carbsPerKg: "4–6 g/kg",
    proteinPerKg: "1.2–1.4 g/kg",
    hydrationMl: "1,500–2,000 mL",
    tips: [
      "Increase portion sizes to match growing energy demands",
      "Include carbohydrate-rich foods at every meal for fuel",
      "Offer a recovery snack with protein and carbs within 30 minutes post-training",
      "Encourage milk or calcium-fortified alternatives for bone development",
    ],
  },
  {
    ageGroup: "13-15",
    label: "Ages 13–15",
    calories: "2,200–3,000 kcal",
    carbsPerKg: "5–7 g/kg",
    proteinPerKg: "1.3–1.6 g/kg",
    hydrationMl: "2,000–2,500 mL",
    tips: [
      "Puberty drives a major increase in caloric needs — don't underfuel",
      "Iron-rich foods (red meat, beans, spinach) are especially important during growth spurts",
      "Teach athletes to listen to hunger cues rather than restrict intake",
      "Avoid energy drinks and excessive caffeine",
    ],
  },
  {
    ageGroup: "16-18",
    label: "Ages 16–18",
    calories: "2,800–3,500 kcal",
    carbsPerKg: "6–8 g/kg",
    proteinPerKg: "1.4–1.7 g/kg",
    hydrationMl: "2,500–3,500 mL",
    tips: [
      "Training volume is high — meals should be planned around sessions",
      "Protein intake should be spread across the day (20–30 g per meal)",
      "Prioritize nutrient-dense foods over supplements",
      "Learn to prepare simple, balanced meals for independence",
    ],
  },
];

export const energyFuelingContent = {
  intro:
    "Young soccer players need significantly more energy than sedentary peers. Growth, development, and high-intensity training create overlapping energy demands that must be met through adequate nutrition.",
  points: [
    {
      text: "Active youth athletes require an additional 500–1,000 calories per day beyond baseline needs to support both growth and training.",
      citation: "desbrow-2014",
    },
    {
      text: "Carbohydrates are the primary fuel source for high-intensity intermittent exercise like soccer. Inadequate carb intake directly impairs sprint speed and endurance.",
      citation: "thomas-2016",
    },
    {
      text: "Energy needs vary widely based on age, sex, body size, and training load — there is no one-size-fits-all calorie target.",
      citation: "desbrow-2014",
    },
    {
      text: "Under-eating is a greater risk than over-eating in youth athletes. Chronic energy deficiency impairs growth, immune function, and performance.",
      citation: "thomas-2016",
    },
  ],
};

export const macronutrientsContent = {
  intro:
    "The three macronutrients — carbohydrates, protein, and fat — each play a distinct role in fueling, recovering from, and adapting to training.",
  points: [
    {
      text: "Carbohydrates should make up 45–65% of total energy intake. They fuel high-intensity efforts and replenish glycogen stores after training.",
      citation: "thomas-2016",
    },
    {
      text: "Protein supports muscle repair and growth. Youth athletes should aim for 1.2–1.7 g per kg of body weight, spread across meals.",
      citation: "desbrow-2014",
    },
    {
      text: "Healthy fats (avocado, nuts, olive oil, oily fish) are essential for hormone production, brain development, and absorbing fat-soluble vitamins.",
      citation: "thomas-2016",
    },
    {
      text: "Timing matters: a carb-and-protein snack within 30–60 minutes after training maximizes glycogen replenishment and muscle recovery.",
      citation: "thomas-2016",
    },
  ],
};

export const micronutrientsContent = {
  intro:
    "Vitamins and minerals don't provide energy directly, but they are essential for bone health, oxygen transport, immune function, and overall growth in young athletes.",
  points: [
    {
      text: "Iron deficiency is one of the most common nutritional issues in young athletes, especially in females. Low iron impairs oxygen delivery and causes fatigue.",
      citation: "desbrow-2014",
    },
    {
      text: "Calcium and vitamin D work together to build strong bones. Youth athletes need 1,300 mg of calcium and 600 IU of vitamin D daily.",
      citation: "rosenbloom-2012",
    },
    {
      text: "Athletes who avoid dairy or eat restrictive diets are at higher risk for calcium and vitamin D deficiency — consider fortified alternatives.",
      citation: "rosenbloom-2012",
    },
    {
      text: "A food-first approach is recommended over supplements. Most micronutrient needs can be met through a varied, balanced diet.",
      citation: "desbrow-2014",
    },
  ],
};

export const hydrationContent = {
  intro:
    "Young athletes are more susceptible to dehydration than adults because they produce more heat relative to body mass and are less efficient at sweating. Proper hydration is critical for both safety and performance.",
  points: [
    {
      text: "Even mild dehydration (1–2% body mass loss) impairs endurance performance, increases perceived effort, and reduces cognitive function.",
      citation: "sawka-2007",
    },
    {
      text: "Youth athletes should drink 400–600 mL of fluid 2–3 hours before exercise, and 150–300 mL every 15–20 minutes during training.",
      citation: "sawka-2007",
    },
    {
      text: "Water is sufficient for sessions under 60 minutes. For longer or intense sessions, a sports drink with electrolytes can help maintain performance.",
      citation: "baker-2015",
    },
    {
      text: "Signs of dehydration include dark urine, headaches, dizziness, and unusual fatigue. Teach athletes to monitor urine color as a simple hydration check.",
      citation: "baker-2015",
    },
  ],
};

export const matchDayContent = {
  intro:
    "What your young athlete eats before, during, and after a match directly affects energy levels, stamina, and recovery speed.",
  points: [
    {
      text: "A carbohydrate-rich meal 3–4 hours before kickoff tops off glycogen stores. Good options: pasta, rice, toast with banana, or oatmeal.",
      citation: "thomas-2016",
    },
    {
      text: "A small, easily digestible snack 1–2 hours before the match (e.g., fruit, a granola bar) provides a final energy boost without stomach discomfort.",
      citation: "thomas-2016",
    },
    {
      text: "During halftime, sip a sports drink or water and have a small carb snack (orange slices, energy chews) to maintain blood sugar.",
      citation: "desbrow-2014",
    },
    {
      text: "Post-match recovery nutrition is crucial: aim for a meal with carbs and protein within 60 minutes to replenish glycogen and kickstart muscle repair.",
      citation: "desbrow-2014",
    },
  ],
};

export const redFlagsContent = {
  intro:
    "Underfueling is a serious risk in youth sports. Coaches and parents should watch for warning signs of inadequate nutrition or disordered eating behaviors.",
  points: [
    {
      text: "Relative Energy Deficiency in Sport (RED-S) occurs when energy intake is insufficient for the demands of training plus growth. It affects hormones, bones, immunity, and mental health.",
      citation: "mountjoy-2014",
    },
    {
      text: "Warning signs include unexplained fatigue, frequent illness or injury, loss of menstrual periods in females, mood changes, and stalled growth.",
      citation: "mountjoy-2014",
    },
    {
      text: "Adolescent athletes are particularly vulnerable to disordered eating. Comments about weight or body shape from coaches or peers can trigger harmful behaviors.",
      citation: "desbrow-2014",
    },
    {
      text: "If you suspect an athlete is underfueling or has an unhealthy relationship with food, seek guidance from a sports dietitian or medical professional early.",
      citation: "desbrow-2014",
    },
  ],
};

export const quickTakeaways = [
  "Young soccer players burn significantly more calories than sedentary peers — underfueling is a bigger risk than overeating.",
  "Carbohydrates are the #1 fuel for soccer. Every meal should include carb-rich foods.",
  "Protein supports recovery — aim for 1.2–1.7 g per kg, spread across meals and snacks.",
  "Hydrate before, during, and after training. Dark urine is a warning sign.",
  "Match-day nutrition starts the night before — plan meals around game time.",
  "Watch for signs of RED-S: fatigue, frequent injuries, mood changes, and stalled growth.",
];
