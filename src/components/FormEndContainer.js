import React from 'react';
export default function(props){
	return(
		<div className = "main-form-submit-container" view={props.visible}>

			<div className = "main-form-submit-component">
				<span className = "heading">One Final Thing ... </span>
				<span className="label">GITHUB</span>
				<input type="text" value={props.github_link} onChange={(e)=>{
					props.set_github_link(e.target.value);
				}}/>
				<span className="label">LIVE-PREVIEW</span>
				<input type="text" value={props.live_link} onChange={(e)=>{
					props.set_live_link(e.target.value);
				}}/>
			</div>

			<button onClick = {()=>{
				props.set_form_completed(2);
			}}>Done</button>

			<div>
				<span>{props.completion_status}</span>
				<div style={{transform:`translateY(calc(100% - ${props.completion_status}%))`}}></div>
			</div>	
			<span></span>
		</div>	
	);
}