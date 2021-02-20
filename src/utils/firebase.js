import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import { v1 as uuidv1 } from "uuid";

let firebaseConfig = {
	apiKey: "AIzaSyDLQ2GNcEZ3CYisYB0woWKvWlexbARBqkM",
	authDomain: "myportfolio-196c3.firebaseapp.com",
	projectId: "myportfolio-196c3",
	storageBucket: "myportfolio-196c3.appspot.com",
	messagingSenderId: "716029710944",
	appId: "1:716029710944:web:886fc478f25d72012ea905",
	measurementId: "G-FDCT7P4WC5",
};

firebase.initializeApp(firebaseConfig);

let storage = firebase.storage();
let database = firebase.database();

function add_text(
	title,
	ideas,
	thoughts,
	tools_list,
	features_list,
	set_completion_status,
	cover_photo,
	github,
	live,
	images
) {
	//create id to project
	let project_id = uuidv1();


	database.ref("count/").once('value').then((snapshot)=>{
		let count = snapshot.val();
		if(count === null){
			count = 0;
		}
		let updates = {};

		updates["project_id/" + count] = project_id;
		updates["count/"] = count + 1;
		database.ref().update(updates);

	}).catch((e)=>{
		console.log('error');
	})

	//start adding content
	database.ref("projects/" + project_id).set({
		title,
		ideas,
		thoughts,
		github,
		live,
	});

	let updates = {};

	let tools = [];

	for (const element of tools_list) {
		tools.push(element.text);
	}

	let features = [];

	for (const element of features_list) {
		features.push(element.text);
	}

	updates["projects/" + project_id + "/tools/"] = tools;
	updates["projects/" + project_id + "/features"] = features;

	database.ref().update(updates);

	let extension = cover_photo.file_obj.type.slice(cover_photo.file_obj.type.indexOf('/') + 1);
	let final_ext = extension.substring(0,3);
	//add images

	let storageRef = storage
		.ref()
		.child(
			"projects/" +
				project_id +
				`/cover_photo.${final_ext}`
		);

	storageRef.put(cover_photo.file_obj).then((snapshot) => {
		let updates = {};
		updates["projects/" + project_id + "/cover_photo"] = `cover_photo.${final_ext}`;
		database.ref().update(updates);
	});


	let count = images.length;

	for (let i = 0; i < count; i++) {
		if(images[i].file_obj === null){
			continue;
		}

		extension = images[i].file_obj.type.slice(images[i].file_obj.type.indexOf('/') + 1);
		final_ext = extension.substring(0,3);


		let imageRef = storage
			.ref()
			.child(
				"projects/" +
					project_id +
					`/gallery_${i}.${final_ext}`
			);
		imageRef.put(images[i].file_obj).then((snapshot) => {
			let update_captions = {};
			//check for upload status and other checks
			update_captions["projects/" + project_id + "/image_captions/" + i] =
				images[i].text;
			update_captions["projects/" + project_id + "/image_ids/" + i] = `gallery_${i}.${final_ext}`;
			database.ref().update(update_captions);
			set_completion_status(100);
		});
	}

	// upload

	// add gallery images
}


function add_images(images){
	console.log(images);
	console.log('hello world');
}

export {add_text, add_images};
