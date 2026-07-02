export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'What is MoneyTykes?',
    answer: 'MoneyTykes is a Belizean fintech platform that helps parents teach children financial responsibility through chores, virtual wallets, savings goals, challenges, and parent-guided experiences with local partner vendors.',
  },
  {
    id: '2',
    question: 'Is MoneyTykes free to use?',
    answer: 'Yes! Parents can create a free account and start assigning chores and rewards immediately. Premium features and sponsor programs offer additional benefits.',
  },
  {
    id: '3',
    question: 'What age groups is MoneyTykes designed for?',
    answer: 'MoneyTykes serves children ages 5–17 through four learning levels: Tykers (5–7), Questers (8–10), Pathfinders (11–13), and Master Tykes (14–17).',
  },
  {
    id: '4',
    question: 'How does the virtual wallet work?',
    answer: 'Kids earn virtual coins by completing chores and challenges. Parents approve every wallet action. Coins can be saved toward goals or used for parent-approved rewards with verified partner vendors. When a parent approves spending, the amount is deducted from the parent wallet.',
  },
  {
    id: '5',
    question: 'Can I set spending limits?',
    answer: 'Absolutely. Parents have full control over spending limits, approval requirements, chore assignments, and reward structures for each child.',
  },
  {
    id: '6',
    question: 'How do vendor partnerships work?',
    answer: 'Local businesses join our marketplace as verified partners. Kids can use earned virtual coins toward parent-approved rewards, with every request reviewed by a parent first. When spending is approved, the deduction is made from the parent wallet.',
  },
]
