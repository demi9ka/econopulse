import { IModel } from 'interface'
export default (name: string, color = '#E9ECEF'): IModel => {
    return { color, name, data: '{0}', reverse: false }
}
