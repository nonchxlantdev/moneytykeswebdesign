export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  quote: string
}

export const testimonials: Testimonial[] = [
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
