/**
 * @description 数组去重
 * @date 2024-07-25
 * @param  array:T[]  源数组
 * @returns T[]  去重后的数组
 */
export function filterNonUnique<T>(array: T[]) {
  return [...new Set(array)];
}

// list根据id获取指定对象
export function listToObjById(list: Array<any>, id: any, key: any) {
  if (list && id) {
    for (let i = 0; i < list.length; i++) {
      const o = list[i]
      if (o[key] === id) return o
    }
  }
  return null
}
// list根据key转map
export function listToMap (list: Array<any>, key: any) {
  const map: any = {}
  if (list && key) list.forEach(obj => { map[obj[key]] = obj })
  return map
}
// 删除元素(删除找到的第一个)
export function listDelByObjFirst (list: Array<any>, obj: any) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === obj) return list.splice(i, 1)
  }
}
// 根据id删除(删除找到的第一个)
export function listDelByIdFirst (list: Array<any>, id: any, key: any) {
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] === id) return list.splice(i, 1)
  }
}
// 删除元素(删除找到的所有)
export function listDelByObj (list: Array<any>, obj: any) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === obj) list.splice(i, 1)
  }
}
// 根据id删除(删除找到的所有)
export function listDelById (list: Array<any>, id: any, key: any) {
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] === id) list.splice(i, 1)
  }
}
/*
 * tree转map，props为配置参数
 * props : {
 *   children: 'children',  // 子集合名称
 *   id: 'id',              // id主键名称
 *   parentIds: 'parentIds' // 父路径集合名称
 * }
*/
export function treeToMap (tree: any, props: any) {
  const map: any = {}
  if (tree == null) {
    return map
  }
  props = Object.assign({
    children: 'children',
    id: 'id',
    parentIds: 'parentIds'
  }, props)
  const toMap = (list: any, pids: any) => {
    list.forEach((obj: { [x: string]: any; }) => {
      const id = obj[props.id]
      map[id] = obj
      const parentIds = pids.concat()
      parentIds.push(id)
      obj[props.parentIds] = parentIds
      const childrenList = obj[props.children]
      if (childrenList != null) {
        toMap(childrenList, parentIds)
      }
    })
  }
  toMap(tree, [])
  return map
}