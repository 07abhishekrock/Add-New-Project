import React from 'react';
function FormAlert(props){
	return(
		<div className="main-form-alert" view={props.visible} type={props.alert_type}>
			<div>
			<span>{props.alert_info}</span>
			<span onClick={()=>{
				props.set_is_alert(0);
			}}></span>
			<button view={props.button_visible} onClick={()=>{
				props.set_is_alert(0);
				props.button_function();
			}}>{props.button_text}</button>
			</div>
		</div>
	)

}
export default FormAlert;