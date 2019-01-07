interface IData {
  [key: string]: any;
}
interface IItem extends IData {
  id: number;
}
interface IResponse<T = any> {
  status: boolean;
  message: string;
  data?: T
}