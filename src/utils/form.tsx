// FormHandler uses internal javascript features of naming to get and structure form input in object form
export const FormHandler = (e: any, arr: string[]): { [key: string]: any } => {
  e.preventDefault();
  let obj: any = {};
  arr.forEach((v) => {
    obj[v] = e.target[v]?.value;
  });
  return obj;
};


// this used javascript inner feature of getting input field by name to clear the inputs of a form, listed in the array
export const FormClear = (event: any, fieldsArray: string[]) => {
  event?.preventDefault();
  for (let i = 0; i < fieldsArray.length; i++) {
      try {
          event.target[fieldsArray[i]].value = '';
      } catch (error) { }
  }
}