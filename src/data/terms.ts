export interface TermsSection {
  title: string
  body: string
}

export const termsIntro =
  "Welcome to MoneyTykes! We're happy you're here. MoneyTykes Ltd. is a Belize-based company created to help families teach children about money in a fun, safe, and rewarding way. By using our app or website, you agree to these terms. Please read them carefully so we're all on the same page."

export const termsSections: TermsSection[] = [
  {
    title: 'Who Can Use MoneyTykes',
    body: 'MoneyTykes is designed for families. Parents or guardians create and manage their own accounts and invite their children to join. Children can only sign up with a parent\'s code. Vendors, sponsors, and partners may also use the platform under approved agreements with MoneyTykes Ltd.',
  },
  {
    title: 'Parental Consent and Control',
    body: 'Parents stay in control. All spending limits, rewards, and vendor experiences must be approved or preset by the parent. Children never complete wallet actions without parent permission. When spending is approved, the amount is deducted from the parent wallet.',
  },
  {
    title: 'Rewards and Coins',
    body: 'Kids earn virtual coins by completing chores, challenges, or games. Coins exist only inside the MoneyTykes ecosystem and are used for learning, savings goals, and parent-approved rewards.',
  },
  {
    title: 'Parent-Approved Rewards',
    body: 'When a child wants to use earned coins toward a reward or partner vendor experience, the parent reviews and approves each request in the virtual wallet before it is completed. The approved amount is deducted from the parent wallet.',
  },
  {
    title: 'Subscriptions and Payments',
    body: 'Some MoneyTykes features may require a subscription. When you subscribe, you agree to pay the displayed fees. Payments are handled through our approved partners, such as banks or digital wallet providers. We do not store payment card information directly.',
  },
  {
    title: 'Intellectual Property',
    body: 'All content, trademarks, and technology on MoneyTykes — including the MoneyTykes® name and logo — belong to MoneyTykes Ltd. You may not copy, modify, or reuse any part of the platform without written permission.',
  },
  {
    title: 'Safety and Conduct',
    body: "We ask everyone to use MoneyTykes responsibly. Don't share personal information, use the platform for unlawful activity, or attempt to disrupt other users. We aim to keep MoneyTykes a safe space for kids and families.",
  },
  {
    title: 'Termination',
    body: 'We may suspend or close accounts that violate these terms or misuse the platform. You can close your account anytime by contacting us at support@moneytykes.com.',
  },
  {
    title: 'Liability',
    body: "MoneyTykes is built with care, but we can't guarantee it will always be perfect. We are not liable for losses caused by misuse, third-party issues, or technical problems beyond our control.",
  },
  {
    title: 'Disputes and Law',
    body: 'Any disputes related to MoneyTykes will be handled under the laws of Belize. We hope to resolve any issues quickly and fairly through open communication.',
  },
]

export const termsFooter =
  '© MoneyTykes Ltd. All Rights Reserved. MoneyTykes® is a registered trademark in Belize.'
