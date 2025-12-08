import { viewListData, toolsListData } from './data'
import type { ListItem } from './types'

/**
 * 视图列表 Hook
 */
export const useViewList = () => {
  /**
   * 图片资源
   */
  const assets = import.meta.glob<{ default: string }>('@/assets/view-list/*.png', { eager: true })

  const listData = [
    { title: '工具集合', link: '', key: 'tools', items: toolsListData as ListItem[] },
    { title: '特效集锦', link: '', key: 'pools', items: viewListData as ListItem[] }
  ].map(item => {
    item.link = import.meta.env.VITE_SOURCE_PREFIX_URL + item.key
    item.items = item.items.map(subItem => ({
      ...subItem,
      coverUrl: assets[`/src/assets/view-list/${subItem.link}.png`].default,
      link: `/${item.key}/${subItem.link}`
    }))
    return item
  })

  /**
   * 跳转到详情页
   */
  const onNavTo = (item: ListItem) => {
    window.open(item.link, '_blank')
  }

  return { listData, onNavTo }
}
