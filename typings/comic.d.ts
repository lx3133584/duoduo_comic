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
  interface ChapterItem {
    id: number
    title: string
    category_id: number
    name: string
  }
  interface ClassItem {
    id: number
    name: string
    cover: string
  }

}
