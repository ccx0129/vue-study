export function getCurrentAuthority() {
  return ["user"];
}

//校验用户是否有权限
export function check(authority) {
  //获取当前拥有权限的用户
  const current = getCurrentAuthority();
  //some方法用于检测数组中的元素是否满足指定条件（函数提供），some() 方法会依次执行数组的每个元素
  //如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
  // 如果没有满足条件的元素，则返回false。
  //includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false
  return current.some(item => authority.includes(item));
}

export function isLogin() {
  const current = getCurrentAuthority();
  //当前用户权限不等于guest就已经登录了
  return current && current[0] != "guest";
}
