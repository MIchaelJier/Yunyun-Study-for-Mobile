//富文本过滤规则
export const richTextRule = text => {
	let newT = 
	`<div style="width:100%;overflow:hidden">
		${text.replace(/style="[^=]*?"([(\s+\w+=)|>])/g, '$1').replace(/img/g,"img style=\"width:100%;\"")}
	<div>`;
	return newT;
}
