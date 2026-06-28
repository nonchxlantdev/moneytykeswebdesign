import { projectBelizeCoords } from './belizeMap'

export interface Vendor {
  id: string
  name: string
  category: string
  city: string
  lon: number
  lat: number
  x: number
  y: number
  description: string
}

function vendor(
  id: string,
  name: string,
  category: string,
  city: string,
  lon: number,
  lat: number,
  description: string,
): Vendor {
  const { x, y } = projectBelizeCoords(lon, lat)
  return { id, name, category, city, lon, lat, x, y, description }
}

export const vendors: Vendor[] = [
  vendor('1', 'Belize Toy World', 'Toys', 'Belize City', -88.196, 17.499, 'Premium toys and educational games'),
  vendor('2', 'Island Scoops', 'Food', 'San Pedro', -87.965, 17.922, 'Artisan ice cream on Ambergris Caye'),
  vendor('3', 'Capital Books', 'Education', 'Belmopan', -88.767, 17.251, 'School supplies and learning materials'),
  vendor('4', 'Orange Arcade', 'Entertainment', 'Orange Walk', -88.563, 18.081, 'Gaming and entertainment center'),
  vendor('5', 'Placencia Pizza', 'Food', 'Placencia', -88.366, 16.514, 'Family-friendly dining'),
  vendor('6', 'Cayo Cinema', 'Entertainment', 'San Ignacio', -89.069, 17.156, 'Movie tickets and snacks'),
]
