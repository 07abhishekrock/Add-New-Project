import React, { useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import FormComponentTextField from "./FormComponentTextField";
import FormComponentTextArea from "./FormComponentTextArea";
import FormComponentList from "./FormComponentList";
import FormContainerImageList from "./FormComponentImageList";
import FormEndContainer from "./FormEndContainer"
import FormAlert from './FormAlert'
import fallback_image from "../icons/fallback_img.svg";
import {add_text, add_images} from "../utils/firebase";
import arrow_bg from "../icons/next.svg";
import home_bg from "../icons/home.svg";
import trash_bg from "../icons/trash.svg";

const MyContext = React.createContext();

//then create a provider component
function MyProvider(props) {
	let [curr_page, set_curr_page] = useState(props.curr_page);
	return (
		<MyContext.Provider value={curr_page}>
			<div className="main-form-components">{props.children}</div>
		</MyContext.Provider>
	);
}

export default function FormContainer(props) {
	let navigate_link_numbers = [1, 2, 3, 4, 5, 6];

	let [curr_page_number, set_curr_page_number] = useState(0);

	let [features, set_features] = useState([
		{
			key: uuidv1(),
			text: "Enter Your Feature Here",
		},
	]);
	let [tools, set_tools] = useState([
		{
			key: uuidv1(),
			text: "Enter Tool Used Here",
		},
	]);
	let [images, set_images] = useState([
		{
			key: uuidv1(),
			url: fallback_image,
			file_obj: null,
			text: "",
		},
	]);
	let [alert_type, set_alert_type] = useState(0);
	
	let [is_alert, set_is_alert] = useState(0);

	let [alert_info, set_alert_info] = useState('no alert');

	let [cover_photo, set_cover_photo] = useState({ url: "", file_obj: null });

	let [title, set_title] = useState("");

	let [thoughts, set_thoughts] = useState("");

	let [idea, set_idea] = useState("");

	let [completion_status, set_completion_status] = useState(0);

	let [github_link, set_github_link] = useState('');

	let [live_link, set_live_link] = useState('');

	let [form_completed, set_form_completed] = useState(0);

	let [bg_image, set_bg_image] = useState(arrow_bg);

	let [alert_button_visible, set_alert_button_visible] = useState([0,'no alert', dummy]);

	function dummy(){
		console.log('nothing here');
	}

	async function reset_state(){
		let obj = await fetch(fallback_image).then((response)=>response.blob());
		set_curr_page_number(0);
		props.set_curr_page(0);

		set_bg_image(arrow_bg);
		set_cover_photo({
			url:fallback_image,
			file_obj:obj
		})
		set_title('');
		set_idea('');
		set_thoughts('');

		set_completion_status(0);
		set_form_completed(0);
		set_alert_button_visible([0,'no alert']);
		set_live_link('');
		set_github_link('');

		set_features([
			{
				key:uuidv1(),
				text:''
			}
		]);
		set_tools([
			{
				key:uuidv1(),
				text:''
			}
		]);
		set_images([
			{
				key: uuidv1(),
				url: fallback_image,
				file_obj: obj,
				text: ""
			}
		]);
	}



	useEffect(async () => {
		let obj = await fetch(fallback_image).then((response)=>response.blob());
		set_cover_photo({ url: fallback_image, file_obj: obj });
	}, []);

	useEffect(()=>{
		if(form_completed === 2){
			console.log('done pressed');
			add_text(title,idea,thoughts,tools,features,set_completion_status,cover_photo,github_link, live_link, images);
		}
	},[form_completed])

	return (
		<div className="main-form-body">
			<ul className="main-form-navigation">
				{navigate_link_numbers.map((element, index) => {
					let classLabel = "unselected";
					if (props.curr_page.index === index) {
						classLabel = "selected";
					}
					return (
						<li
							className={classLabel}
							onClick={(e) => {
								props.set_curr_page(index);
								set_curr_page_number(index);
							}}
						>
							{element}
						</li>
					);
				})}
			</ul>
			<div
				className="main-form-icon"
				style={{ backgroundImage: `url(${props.curr_page.icon})` }}
			></div>
			<span className="main-form-title">{props.curr_page.title}</span>

			<MyProvider curr_page={props.curr_page}>
				<MyContext.Consumer>
					{(context) => {
						let visible = [0, 0, 0, 0, 0, 0];
						visible[props.curr_page.index] = 1;

						return (
							<React.Fragment>
								<FormComponentTextField
									cover_photo={cover_photo}
									set_cover_photo={set_cover_photo}
									curr_page={props.curr_page}
									visible={visible[0]}
									title={title}
									set_title={set_title}
								/>
								{/*idea input*/}
								<FormComponentTextArea
									curr_page={props.curr_page}
									visible={visible[1]}
									text={idea}
									set_text={set_idea}
								/>
								{/*thoughts input*/}
								<FormComponentTextArea
									curr_page={props.curr_page}
									visible={visible[2]}
									text={thoughts}
									set_text={set_thoughts}
								/>
								{/*list items*/}
								<FormComponentList
									label="tools"
									curr_page={context}
									visible={visible[3]}
									list_items={tools}
									set_items={set_tools}
								/>
								<FormComponentList
									label="features"
									curr_page={context}
									visible={visible[4]}
									list_items={features}
									set_items={set_features}
								/>
								{/*list images*/}
								<FormContainerImageList
									visible={visible[5]}
									list_items={images}
									set_items={set_images}
								/>
							
							</React.Fragment>
						);
					}}
				</MyContext.Consumer>
			</MyProvider>


			<FormEndContainer
				visible={form_completed}
				completion_status = {completion_status}
				github_link = {github_link}
				set_github_link = {set_github_link}
				live_link = {live_link}
				set_live_link = {set_live_link}
				set_form_completed = {set_form_completed}
			/>
			<FormAlert alert_info={alert_info} alert_type={alert_type} visible={is_alert} button_visible={alert_button_visible[0]} button_text={alert_button_visible[1]} button_function={alert_button_visible[2]} set_is_alert={set_is_alert}/>
			<button
				className="main-next-btn"
				style={{
					backgroundImage : `url(${bg_image})`
				}}
				onClick={(e) => {
					if (curr_page_number === 5 && form_completed != 1) {
						//end is here
						if(images.length === 1 && images[0].file_obj === null){
							set_is_alert(1);
							set_alert_info('Caption without Images will not be registered...')
							set_alert_type(1);
							set_alert_button_visible([0, '']);
						}
						set_form_completed(1);
						set_bg_image(home_bg);
						return;
					}
					if(form_completed){
						set_bg_image(arrow_bg);
						set_form_completed(0);
						set_curr_page_number(0);
						props.set_curr_page(0);
						return;
					}
					props.set_curr_page(curr_page_number + 1);
					set_curr_page_number(curr_page_number + 1);
				}}
			></button>
			<button className = "delete-btn" onClick={
				()=>{

					set_is_alert(1);
					set_alert_info('This will delete the form entirely and start over.');
					set_alert_type(0);
					set_alert_button_visible([1,'Delete',reset_state]);

				}

			}></button>
		</div>
	);
}
