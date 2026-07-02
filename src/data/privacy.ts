export interface PrivacySection {
  title: string
  body: string
}

export const privacyIntro =
  "Your family's privacy matters to us. This policy explains how MoneyTykes Ltd. (Belize) collects, uses, and protects your information when you use our app or website. We keep things simple, transparent, and safe—especially for kids."

export const privacySections: PrivacySection[] = [
  {
    title: 'What we Collect',
    body: 'We collect only what we need to help families use MoneyTykes effectively: parent contact details, child first names and ages, chore and challenge progress, spending approvals, and app usage data. Vendors and sponsors share basic business information for verification.',
  },
  {
    title: 'How We Use Information',
    body: 'Information helps us run the platform—tracking progress, managing coins, processing approvals, and improving the learning experience. We never sell or rent your data.',
  },
  {
    title: 'Sharing with Trusted Partners',
    body: 'We may share limited information with trusted partners such as financial institutions or digital wallet providers, only to process payments or transactions approved by parents. All partners must follow strict privacy and security requirements.',
  },
  {
    title: 'Parental Control and Child Privacy',
    body: 'Parents remain in full control of their child\'s account. Children cannot register or complete financial actions without parental setup or consent. We comply with child privacy standards and do not display personal information publicly.',
  },
  {
    title: 'Data Security',
    body: 'We use encryption, secure servers, and other safeguards to protect your data. While no system is 100% secure, we do everything we can to keep your family\'s information safe.',
  },
  {
    title: 'Cookies and Analytics',
    body: 'The MoneyTykes website may use cookies or analytics tools to understand how visitors interact with our content and improve your experience. You can disable cookies in your browser if preferred.',
  },
  {
    title: 'Your Rights',
    body: 'We may update this policy occasionally to reflect improvements or legal changes. When we do, we\'ll post the revised version on our website.',
  },
]

export const privacyFooter =
  '© MoneyTykes Ltd. All Rights Reserved. MoneyTykes® is a registered trademark in Belize.'
