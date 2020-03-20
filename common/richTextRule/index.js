//富文本过滤规则
// 正则变量
let graceRichTextReg;

// 批量替换的样式 [ 根据项目需求自行设置 ]
let GRT = [
	// div 样式
	['div', "line-height:2em;"],
	// h1 样式
	['h1', "font-size:3em; line-height:1.5em;"],
	// h2 样式
	['h2', "font-size:2em; line-height:1.8em;"],
	// h3 样式
	['h3', "font-size:1.6em; line-height:2em;"],
	// h4 样式
	['h4', "font-size:1.2em; line-height:2em;"],
	// h5 样式
	['h5', "font-size:1em; line-height:2em;"],
	// h6 样式
	['h6', "font-size:0.9em; line-height:2em;"],
	// p 样式
	['p', "font-size:1em; line-height:2em;"],
	// b 样式
	['b', "font-size:1em; line-height:2em;"],
	// strong 样式
	['strong', "font-size:1em; line-height:2em;"],
	// code 样式
	['code', "font-size:1em; line-height:1.2em; background:#F6F7F8; padding:8px 2%; width:96%;"],
	// img 样式
	['img', "width:100%; margin:8px 0;"],
	// blockquote
	['blockquote', "font-size:1em; border-left:3px solid #D1D1D1; line-height:2em; border-radius:5px; background:#F6F7F8; padding:8px 2%;"],
	// li 样式
	['ul', "padding:5px 0; list-style:none; padding:0; margin:0;"],
	['li', "line-height:1.5em; padding:5px 0; list-style:none; padding:0; margin:0; margin-top:10px;"],
	// table
	['table', "width:100%; border-left:1px solid #F2F3F4; border-top:1px solid #F2F3F4;"],
	['th', "border-right:1px solid #F2F3F4; border-bottom:1px solid #F2F3F4;"],
	['td', "border-right:1px solid #F2F3F4; border-bottom:1px solid #F2F3F4; padding-left:5px;"]
];


export const richTextRule = html => {
	// let newT = 
	// `<div style="width:100%;overflow:hidden">
	// 	${text.replace(/style="[^=]*?"([(\s+\w+=)|>])/g, '$1').replace(/img/g,"img style=\"width:100%;\"")}
	// <div>`;
	// return newT;
	
	html = html.replace(/<pre.*pre>?/gis, (word) => {
		word =  word.replace(/[\n]/gi,'<br />');
		word =  word.replace(/    /gi,'<span style="padding-left:2em;"></span>');
		return word.replace(/[\t]/gi, '<span style="padding-left:2em;"></span>');
	});
	html = html.replace(/<pre/gi, '<p style="font-size:1em; margin:12px 0; line-height:1.2em; background:#F6F7F8; border-radius:5px; padding:8px 4%; width:92%;"');
	html = html.replace(/<\/pre/gi,"</p");
	html = html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
		if(capture.includes('.jpg')){
			return `<img src="${ capture }${ capture.includes('.jpg?') ? '&' : '?' }x-oss-process=image/format,jpg"> </img>`	
		}
		return `<img src="${capture}></img>`
	});
	for(let i = 0; i < GRT.length; i++){
		graceRichTextReg = new RegExp('<'+GRT[i][0]+'>|<'+GRT[i][0]+' (.*?)>', 'gi');
		html = html.replace(graceRichTextReg , function(word){
			// 分析 dom 上是否带有 style=""
			if(word.indexOf('style=') != -1){
				var regIn = new RegExp('<' + GRT[i][0] + '(.*?)style="(.*?)"(.*?)(/?)>', 'gi');
				return word.replace(regIn, '<'+ GRT[i][0] +'$1style="$2 ' + GRT[i][1] +'"$3$4>');
			}else{
				var regIn = new RegExp('<' + GRT[i][0] + '(.*?)(/?)>', 'gi');
				return word.replace(regIn, '<'+ GRT[i][0] +'$1 style="' + GRT[i][1] +'$2">');
			}
		});
	}
	return html;
}
