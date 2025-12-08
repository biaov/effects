export interface ListItem {
  title: string
  coverUrl: string
  link: string
  tags: string[]
}
export interface Item {
  title: string
  link: string
  items: ListItem[]
}
