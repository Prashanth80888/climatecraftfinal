export type ProductItem = [key: string, name: string, description: string]

export interface ProductCollection {
  title: string
  dir: 'ltr' | 'rtl'
  dur: number
  items: ProductItem[]
}

export interface Testimonial {
  q: string
  n: string
  r: string
  mono: string
  img: string
}
