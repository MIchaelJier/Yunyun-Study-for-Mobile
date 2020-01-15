/*
*	比较两个时间相差的天数
*	@param startDate 较小的时间
*   @param endDate 较大的时间
* */
export const monthDayDiff = (startDate, endDate) => {
	  let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
	    let start = new Date(startDate);
	    let end = new Date(endDate);
	    let year = end.getFullYear() - start.getFullYear();
	    let month = end.getMonth() - start.getMonth();
	    let day = end.getDate() - start.getDate();
	    if (month < 0) {
	        year--;
	        month = end.getMonth() + (12 - start.getMonth());
	    }
	    if (day < 0) {
	        month--;
	        let index = flag.findIndex((temp) => {
	            return temp === start.getMonth() + 1
	        });
	        let monthLength;
	        if (index <= 6) {
	            monthLength = 31;
	        } else if (index > 6 && index <= 10) {
	            monthLength = 30;
	        } else {
	            monthLength = 28;
	        }
	        day = end.getDate() + (monthLength - start.getDate());
	    }
		console.log(`${12 * year + month}月${day}天`);
		//不考虑瑞年情况
		return {year,month,day}
}

/*
*	判断时间是否大于当前时间
* 	@param time 格式:xxxx-xx-xx xx:xx
* */
export const TimeDiff = time => {
	  let otime=new Date(Date.parse(time .replace(/-/g,"/")+':00')),
		  curtime=new Date();
	  if(otime > curtime) return true
	  else return false
}

/*
*	格式化Data
* */
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
