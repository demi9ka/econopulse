import { ICalculatorItem } from 'interface'
export default (name: string, color = '#E9ECEF'): ICalculatorItem => {
    return { color, name, data: [{ id: 0, action_id: undefined }], reverse: false }
}
