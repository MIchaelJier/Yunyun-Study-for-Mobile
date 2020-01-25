/*
*	比较两个时间相差的天数
*	@param startDate 较小的时间
*   @param endDate 较大的时间
* */
export const monthDayDiff = (startDate, endDate) => {
		let start = new Date(startDate),
			end = new Date(endDate),
		    Diff = end.getTime() - start.getTime();
		//天&小时
		let days=Math.floor(Diff / (24 * 3600 * 1000))
		let leave1=Diff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
		let hours=Math.floor(leave1 / (3600 * 1000))
		//分
		let leave2=leave1%(3600 * 1000)        //计算小时数后剩余的毫秒数
		let minutes=Math.floor(leave2 / (60 * 1000))
		//秒
		let leave3=leave2%(60 * 1000)      //计算分钟数后剩余的毫秒数
		let seconds=Math.round(leave3 / 1000)
		return {days,hours,minutes,seconds}
}
/*
*	时间增加
* 	@param time 格式:xxxx-xx-xx xx:xx.xx
*   @param {...} days
* */
export const TimeAdd = (time,{...param2}) => {
	  let oldDate = new Date(Date.parse(time.replace(/-|\./g,"/"))),
	      addDate = new Date(oldDate.getTime()+param2.days*24*60*60*1000);
	  return  formatTime(addDate,param2.type)
}
/*
*	判断时间是否大于当前时间
* 	@param time 格式:xxxx-xx-xx xx:xx || xxxx.xx.xx xx:xx
* */
export const TimeDiff = time => {
	  let otime=new Date(Date.parse(time.replace(/-|\./g,"/"))),
		  curtime = new Date();
	  if(otime > curtime) return true
	  else return false
}

/*
*	格式化Data
*   @param type 日期分隔符 
* */
export const formatTime = (date,type = '/') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(type) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
