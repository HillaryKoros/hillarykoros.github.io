interface Skill {
  name: string;
  percentage: number;
  label?: string;
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
    label: "Fluent"
  },
  {
    name: "Kiswahili",
    percentage: 100,
    label: "Ufasaha"
  },
  {
    name: "Kalenjin",
    percentage: 100,
    label: "Amuche Angalal ak Asir"
  },
  {
    name: "Chinese",
    percentage: 10,
    label: "我还是初学者 (Wǒ háishì chūxuézhě.)"
  }
];
