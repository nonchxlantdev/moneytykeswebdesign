export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  quote: string
  featured?: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 'melissa-g',
    name: 'Melissa G.',
    role: 'Parent, Belize',
    avatar: 'Mel',
    rating: 5,
    featured: true,
    quote:
      'MoneyTykes has been engaging and educational for my family. My 14-year-old struggled with saving habits, but since using the app he is motivated to earn, set goals, and work toward them in ways he never had before. It is simple, innovative, and effective. I believe MoneyTykes is on the right path to teaching Belizean children the value of earning, saving, and making wise financial decisions.',
  },
  {
    id: 'danielle-r',
    name: 'Danielle R',
    role: 'Parent, Belize',
    avatar: 'DR',
    rating: 5,
    featured: true,
    quote:
      'I\'m thrilled my daughters finally have practical tools to understand money, something many of us never received growing up. MoneyTykes makes financial learning fun and interactive, helps me connect chores to rewards, and teaches goal setting, budgeting, and responsibility through real experience. Watching them calculate how many tasks they need before cashing out has been incredible. Our family loves it, and I highly recommend it to every parent.',
  },
  {
    id: '1',
    name: 'Maria Gonzalez',
    role: 'Parent of 2, Belize City',
    avatar: 'MG',
    rating: 5,
    quote: 'MoneyTykes transformed how our family talks about money. My kids actually look forward to chores now!',
  },
  {
    id: '2',
    name: 'James Thompson',
    role: 'Father of 3, San Pedro',
    avatar: 'JT',
    rating: 5,
    quote: 'The approval system gives me peace of mind while teaching my teenagers lasting financial responsibility.',
  },
  {
    id: '3',
    name: 'Lisa Martinez',
    role: 'Elementary Teacher, Belmopan',
    avatar: 'LM',
    rating: 5,
    quote: 'I recommend MoneyTykes to every parent. The learning levels are perfectly designed for each age group.',
  },
  {
    id: '4',
    name: 'David Chen',
    role: 'Vendor Partner, Orange Walk',
    avatar: 'DC',
    rating: 5,
    quote: 'As a local business owner, partnering with MoneyTykes brings young customers who understand the value of money.',
  },
  {
    id: '5',
    name: 'Sarah Williams',
    role: 'Sponsor, Placencia',
    avatar: 'SW',
    rating: 5,
    quote: 'Supporting financial literacy in Belize through MoneyTykes has been one of our most rewarding investments.',
  },
]
