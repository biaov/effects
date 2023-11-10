import { linkPrefixURL } from '@/config'
import { viewListData } from './data'
import type { ListItem } from './types'

/**
 * 视图列表 Hook
 */
export const useViewList = () => {
  /**
   * 图片资源
   */
  const assets = import.meta.glob<{ default: string }>('@/assets/view-list/*.png', { eager: true })

  /**
   * 列表数据
   */
  const listData: ListItem[] = viewListData.map(item => ({
    ...item,
    coverUrl: assets[`/src/assets/view-list/${item.link}.png`].default,
    link: linkPrefixURL + item.link
  }))

  /**
   * 跳转到详情页
   */
  const onNavTo = (item: ListItem) => {
    window.open(item.link, '_blank')
  }

  return { listData, onNavTo }
}
