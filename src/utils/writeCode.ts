import { IIndex } from 'interface'

/**
 * { 0 } -> IMOEX
 */
export const decode = (code: string, index: IIndex) => {
    if (!index) return 'null'

    return code
        .replace(/\s+/g, '')
        .replace(/{(\d+)}/g, match => {
            const id = parseInt(match.slice(1, -1))
            return ' ' + index.data.find(el => el.id === id)!.short_name + ' '
        })
        .trim()
}
/**
 * IMOEX -> { 0 }
 */
export const encode = (code: string, index: IIndex) => {
    const regex = new RegExp(index!.data.map(el => el.short_name).join('|'), 'g')
    return code.replace(/\s+/g, '').replace(regex, short_name => {
        const { id } = index!.data.find(el => el.short_name === short_name)!
        return `{${id}}`
    })
}

export const checkValid = (data: string) => {
    return !!data.replace(/\s+/g, '').length
}
