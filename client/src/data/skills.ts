interface Skill {
  name: string;
  percentage: number;
  label?: string;
  code?: string;
}

export const programmingSkills: Skill[] = [
  {
    name: "JavaScript",
    percentage: 90
  },
  {
    name: "Python",
    percentage: 80
  },
  {
    name: "R",
    percentage: 80
  },
  {
    name: "SQL",
    percentage: 50
  },
  {
    name: "PHP",
    percentage: 25
  }
];

export const humanLanguages: Skill[] = [
  {
    name: "English",
    percentage: 100,
    label: "Professional working proficiency",
    code: "EN"
  },
  {
    name: "Kiswahili",
    percentage: 100,
    label: "Native",
    code: "SW"
  },
  {
    name: "Kipsigis",
    percentage: 100,
    label: "Native",
    code: "KIP"
  }
];
