interface Comic {
  last_crawl_time?: string
  created_time?: string
  update_time?: string
  id: number
  cover: string
  source: string
  title: string
  author: string
  status: string
  desc: string
  popularity_number: number
  collection_number: number
  score_number: number
  score: number
  class_id?: number
  class_name?: string
  index?: number
}
interface ImageSize {
  width: number
  height: number
}
declare namespace Comic {
  interface ContentItem {
    id: number
    url: string
    index: number
    size?: ImageSize
  }
  interface CategoryItem {
    id: number
    name: string
    data: ChapterItem[]
  }
  interface ChapterItem {
    id: number
    title: string
  }
  interface ClassItem {
    id: number
    name: string
    cover: string
  }

}
