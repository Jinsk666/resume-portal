export const splitPoint = text => {
    let arr = text.split('.');
    arr.pop();
    return arr.join('.')
}