//定义过滤翻译
const  filter = (data: any,reName:Object) => {
  /*
  @param data 要处理的数据，规定是对象
  @param reName 要更改的值value
  */
  for (let key in data) {
    for (let i in reName) {
      if (data[key] == i) {
        // @ts-ignore
        let filterdData = Object.assign(data, { [key]: reName[i] });
        return filterdData
      }
    }

  }
};
export default filter
