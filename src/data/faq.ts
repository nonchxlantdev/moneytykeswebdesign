export interface FaqItem {
  id: string
  question: string
  paragraphs?: string[]
  listIntro?: string
  bullets?: string[]
  listOutro?: string[]
}

export interface FaqSection {
  id: string
  title: string
  items: FaqItem[]
}

export const faqPageIntro =
  'Answers to common questions about Money Tykes, parent controls, educational rewards, payments, and family safety.'

export const faqSections: FaqSection[] = [
  {
    id: 'about',
    title: 'About Money Tykes',
    items: [
      {
        id: 'what-is-money-tykes',
        question: 'What is Money Tykes?',
        paragraphs: [
          'Money Tykes is a financial literacy platform designed to help children develop lifelong money management skills through interactive learning, educational rewards, savings goals, family activities, and parent engagement.',
          'Our mission is to empower the next generation with the knowledge, habits, and confidence to make informed financial decisions.',
        ],
      },
      {
        id: 'who-is-it-for',
        question: 'Who is Money Tykes designed for?',
        paragraphs: [
          'Money Tykes is designed for children ages 5–17 and their parents or legal guardians. The platform also supports schools, teachers, community organizations, sponsors, and businesses committed to advancing financial literacy among Belizean youth.',
        ],
      },
      {
        id: 'what-does-it-teach',
        question: 'What does Money Tykes teach?',
        listIntro:
          'Money Tykes provides age-appropriate learning experiences that help children develop practical life skills including:',
        bullets: [
          'Saving',
          'Budgeting',
          'Goal Setting',
          'Earning',
          'Entrepreneurship',
          'Responsible Financial Decision-Making',
        ],
      },
    ],
  },
  {
    id: 'parents-safety',
    title: 'Parents & Child Safety',
    items: [
      {
        id: 'parent-permission',
        question: 'Does my child need my permission to use Money Tykes?',
        paragraphs: [
          'Yes.',
          'A parent or legal guardian must create the account and approve their child’s participation before they can access the platform.',
        ],
      },
      {
        id: 'who-controls-account',
        question: 'Who controls my child’s account?',
        listIntro: 'Parents remain in complete control of their child’s account, including:',
        bullets: [
          'Account creation',
          'Purchase approvals',
          'Reward redemption approvals',
          'Account settings',
        ],
      },
      {
        id: 'purchases-without-approval',
        question: 'Can my child make purchases without my approval?',
        paragraphs: [
          'No.',
          'Every purchase request or reward redemption requires approval from the parent or legal guardian before payment can be processed.',
        ],
      },
    ],
  },
  {
    id: 'educational-rewards',
    title: 'Educational Rewards',
    items: [
      {
        id: 'what-are-coins',
        question: 'What are Money Tykes Coins?',
        paragraphs: [
          'Money Tykes Coins are virtual educational reward points earned through learning activities, financial challenges, quizzes, tasks, and other positive achievements within the platform.',
        ],
      },
      {
        id: 'coins-real-money',
        question: 'Are Money Tykes Coins real money?',
        paragraphs: ['No.', 'Money Tykes Coins are educational reward points only.'],
        listIntro: 'They are not:',
        bullets: [
          'Currency',
          'Electronic money',
          'Deposits',
          'Stored value',
          'Bank balances',
          'Financial instruments',
        ],
      },
      {
        id: 'coins-redeem-cash',
        question: 'Can Coins be redeemed for cash?',
        paragraphs: ['No.'],
        listIntro: 'Money Tykes Coins:',
        bullets: [
          'Have no cash value',
          'Cannot be redeemed for cash',
          'Cannot be withdrawn',
          'Cannot be transferred between users',
          'Cannot be sold or exchanged',
        ],
      },
      {
        id: 'educational-reward-equivalent',
        question: 'Why does the app display an Educational Reward Equivalent?',
        paragraphs: [
          'Money Tykes may display an Educational Reward Equivalent to help children understand financial concepts such as budgeting, saving, and making informed financial decisions.',
          'This educational equivalent is provided solely as a learning tool and does not represent actual money, cash value, or a stored balance.',
        ],
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    items: [
      {
        id: 'how-purchases-made',
        question: 'How are purchases made?',
        paragraphs: [
          'When a child requests an eligible purchase or reward redemption, the parent receives a notification to review and approve the request.',
          'Once approved, payment is securely processed through the parent’s DigiWallet account with participating merchants.',
        ],
      },
      {
        id: 'does-store-money',
        question: 'Does Money Tykes store money?',
        paragraphs: [
          'No.',
          'Money Tykes does not hold, store, or maintain customer funds or wallet balances for parents or children.',
        ],
      },
      {
        id: 'child-digiwallet',
        question: 'Does my child have a DigiWallet account?',
        paragraphs: [
          'No.',
          'Payments are made using the parent’s DigiWallet account. Children do not have independent payment accounts through Money Tykes.',
        ],
      },
      {
        id: 'does-process-payments',
        question: 'Does Money Tykes process payments?',
        paragraphs: [
          'Money Tykes facilitates educational activities, parental approvals, and reward requests.',
          'Payment processing is completed through DigiWallet.',
        ],
      },
    ],
  },
  {
    id: 'schools',
    title: 'Schools',
    items: [
      {
        id: 'schools-use',
        question: 'Can schools use Money Tykes?',
        paragraphs: [
          'Yes.',
          'Money Tykes supports classroom learning through interactive financial literacy lessons, teacher resources, classroom challenges, and student engagement tools.',
        ],
      },
      {
        id: 'supports-literacy',
        question: 'Does Money Tykes support financial literacy education?',
        paragraphs: [
          'Yes.',
          'Money Tykes is designed to complement financial literacy initiatives by providing engaging digital experiences that reinforce positive financial behaviors both at school and at home.',
        ],
      },
    ],
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security',
    items: [
      {
        id: 'child-info-secure',
        question: 'Is my child’s information secure?',
        paragraphs: [
          'Yes.',
          'Protecting children’s privacy is one of our highest priorities. Parent consent is required before a child can participate, and we are committed to safeguarding personal information in accordance with applicable laws and our Privacy Policy.',
        ],
      },
      {
        id: 'sponsors-merchant-data',
        question: 'Do sponsors or merchants receive my child’s personal information?',
        paragraphs: [
          'No.',
          'Participating sponsors and merchants do not have access to your child’s personal information unless it is necessary to fulfill an approved reward redemption and is handled in accordance with our Privacy Policy.',
        ],
      },
    ],
  },
  {
    id: 'partners',
    title: 'Partners',
    items: [
      {
        id: 'become-vendor',
        question: 'How can my business become a participating vendor?',
        paragraphs: [
          'Businesses may apply to become participating vendors by offering products, services, or educational rewards that encourage positive financial behaviors.',
        ],
      },
      {
        id: 'organizations-partner',
        question: 'Can organizations partner with Money Tykes?',
        paragraphs: [
          'Yes.',
          'Organizations can support Money Tykes by sponsoring financial literacy initiatives, educational challenges, school programs, rewards, and community events that promote youth financial education.',
        ],
      },
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance',
    items: [
      {
        id: 'is-bank',
        question: 'Is Money Tykes a bank or financial institution?',
        paragraphs: [
          'No.',
          'Money Tykes is an educational technology platform focused on financial literacy.',
        ],
        listIntro: 'Money Tykes does not:',
        bullets: [
          'Accept deposits',
          'Hold customer funds',
          'Provide banking services',
          'Issue electronic money',
          'Allow peer-to-peer money transfers',
          'Allow cash withdrawals',
        ],
        listOutro: ['Parents remain in control of all financial decisions and approvals.'],
      },
      {
        id: 'who-processes-transactions',
        question: 'Who processes financial transactions?',
        paragraphs: [
          'Financial transactions are processed through DigiWallet following parental approval.',
          'Money Tykes provides the educational platform, parental approval workflow, and learning experience, while payment processing is handled through DigiWallet.',
        ],
      },
    ],
  },
]
