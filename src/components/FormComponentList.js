import React,{useEffect,useRef,useState} from 'react';
import {v1 as uuidv1} from 'uuid';
export default function FormComponentList(props){

	let parent_ref = useRef(null);

	let [length, set_length] = useState(props.list_items.length);

	useEffect(()=>{
		parent_ref.current.scrollIntoView(false);
	},[length])

	return(
				<div className="main-form-list" view={props.visible} >
				<ul>
				{
					props.list_items.map((element, index)=>{
						return <li key={element.key}>
							<input type="text" className="" onKeyUp= {((e)=>{
								let new_list_items = [...props.list_items];
								new_list_items[index]['text'] = e.target.value;
								props.set_items(new_list_items);
							})}/>
							<button className = "remove-item-btn" onClick={(e)=>{
								//remove item from base
								let new_list_items = [];
								props.list_items.map((c_element,c_index)=>{
									if(c_index != index){
										new_list_items.push(c_element);
									}
								})
								e.target.parentNode.style.opacity = 0;
								setTimeout(()=>{
									props.set_items(new_list_items);
								},200)
							}}></button>
						</li>
					})
				}
				</ul>

				<button className = "add-item-btn" ref={parent_ref} onClick={(e)=>{
					let new_element = {
						key : uuidv1(),
						text : ''
					}

					props.set_items([...props.list_items,new_element]);
					set_length(length + 1);

				}}></button>
			</div>
	);	
}