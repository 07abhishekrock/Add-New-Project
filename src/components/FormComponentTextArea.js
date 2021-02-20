import React from 'react';
export default function FormComponentTextArea(props){
	return(
		<textarea className="main-form-textarea" value={props.text} view={props.visible} placeholder={props.curr_page['placeholder_text']} onChange={(e)=>{
			props.set_text(e.target.value);
		}}/>
	);
}