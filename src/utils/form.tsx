export const FormHandler = (e: any, arr: string[]): { [key: string]: any } => {
  e.preventDefault();
  let obj: any = {};
  arr.forEach((v) => {
    obj[v] = e.target[v]?.value;
  });
  return obj;
};

export const FormClear = (event: any, fieldsArray: string[]) => {
  event?.preventDefault();
  for (let i = 0; i < fieldsArray.length; i++) {
      try {
          event.target[fieldsArray[i]].value = '';
      } catch (error) { }
  }
}