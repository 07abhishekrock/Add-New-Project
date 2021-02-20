import React,{useEffect} from 'react';
export default function FormComponentTextField(props){
	return(
		<div view={props.visible}>
		<input className="main-form-textfield" type="text" value={props.title} placeholder={props.curr_page['placeholder_text']} onChange = {(e)=>{
			props.set_title(e.target.value);
		}}/>
		<div className = "main-form-cover-image" style={{backgroundImage : `url(${props.cover_photo.url})`}} onClick = {(e)=>{
			e.target.parentNode.children[2].click();
		}}></div>

		<input type="file" className = "file" onChange={(e)=>{
			let file = e.target.files[0];
			if(file.type === 'image/png' || file.type === 'image/svg+xml' || file.type === 'image/jpeg' || file.type === 'image/jpg'){
					if(props.cover_photo.url){
						//revoke url		
						console.log('revoked');
						URL.revokeObjectURL(props.cover_photo.url);
					}
			let url = URL.createObjectURL(file);
			let photo_file = {
				file_obj : file,
				url : url
			}
			props.set_cover_photo(photo_file);
			}
		}}/>
		</div>
	);	
}