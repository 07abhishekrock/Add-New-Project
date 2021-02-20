import React, { useEffect, useRef, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import fallback_image from "../icons/fallback_img.svg";
export default function FormComponentImageList(props) {
	let parent_ref = useRef(null);

	let [length, set_length] = useState(props.list_items.length);

	useEffect(() => {
		parent_ref.current.scrollIntoView(false);
	}, [length]);

	return (
		<div className="main-form-list image-list" view={props.visible}>
			<ul>
				{props.list_items.map((element, index) => {
					return (
						<li key={element.key}>
							<input
								type="file"
								onChange={(e) => {
									let file = e.target.files[0];
									if (
										file.type === "image/png" ||
										file.type === "image/svg+xml" ||
										file.type === "image/jpeg" ||
										file.type === "image/jpg"
									) {
										//file type is valid

										if (element.url) {
											//revoke url
											console.log("revoked");
											URL.revokeObjectURL(element.url);
										}

										let items = [...props.list_items];
										items[index].file_obj = file;
										let url = URL.createObjectURL(file);
										items[index].url = url;
										props.set_items(items);
									}
								}}
							/>
							<textarea
								className="image-text"
								onChange={(e) => {
									let items = [...props.list_items];
									items[index].text = e.target.value;
									props.set_items(items);
								}}
								value={element.text}
							></textarea>
							<div
								style={{
									backgroundImage: `url(${element.url})`,
								}}
								onClick={(e) => {
									e.target.parentNode.children[0].click();
								}}
							></div>
							<button
								onClick={() => {
									let items = [...props.list_items];
									let new_items = [];
									items.map((c_element, c_index) => {
										if (c_index != index) {
											new_items.push(c_element);
										}
									});
									props.set_items(new_items);
								}}
							></button>
						</li>
					);
				})}
			</ul>

			<button
				className="add-item-btn"
				ref={parent_ref}
				onClick={(e) => {
					let new_element = {
						key: uuidv1(),
						url: fallback_image,
						file_obj: null,
						text: "",
					};

					props.set_items([...props.list_items, new_element]);
					set_length(length + 1);
				}}
			></button>
		</div>
	);
}
