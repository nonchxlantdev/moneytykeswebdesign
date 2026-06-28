export interface MarketplaceItem {
  id: string
  name: string
  category: string
  price: number
  emoji: string
  color: string
}

export const marketplaceItems: MarketplaceItem[] = [
  { id: 'toy', name: 'Toy Store', category: 'Toys', price: 150, emoji: '🧸', color: 'from-pink-400 to-rose-500' },
  { id: 'ice-cream', name: 'Ice Cream', category: 'Treats', price: 25, emoji: '🍦', color: 'from-cyan-300 to-blue-400' },
  { id: 'gaming', name: 'Gaming Time', category: 'Entertainment', price: 50, emoji: '🎮', color: 'from-purple-400 to-indigo-500' },
  { id: 'movie', name: 'Movie Night', category: 'Entertainment', price: 75, emoji: '🎬', color: 'from-red-400 to-orange-500' },
  { id: 'pizza', name: 'Pizza Party', category: 'Food', price: 100, emoji: '🍕', color: 'from-yellow-400 to-orange-400' },
  { id: 'supplies', name: 'School Supplies', category: 'Education', price: 80, emoji: '📚', color: 'from-green-400 to-teal-500' },
]
