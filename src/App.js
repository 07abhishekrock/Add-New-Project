import './style/main.css';
import React,{useEffect,useState} from 'react';
import name_image from './icons/projects.svg';
import idea_image from './icons/idea.svg';
import features_image from './icons/features.svg';
import gallery_image from './icons/gallery.svg';
import tools_image from './icons/tools.svg';
import thoughts_image from './icons/thoughts.svg';
import FormContainer from './components/FormContainer';

function App() {
    let pages_info = [
        {
            title:'Give the Project a Name ...',
            index:0,
            type:0,
            placeholder_text:'Enter Name',
            icon:name_image
        },
        {
            title:'What is the Idea',
            index:1,
            type:1,
            placeholder_text:'Your Idea here',
            icon:idea_image
        },
        {
            title:'Project Thoughts',
            index:2,
            type:1,
            placeholder_text:'Thoughts about your project',
            icon:thoughts_image
        },
        {
            title:'Tools Used',
            index:3,
            type:2,
            placeholder_text:'Enter Tool here',
            icon:tools_image
        },
        {
            title:'Features',
            index:4,
            type:2,
            placeholder_text:'Enter Feature here',
            icon:features_image
        },
        {
            title:'Gallery',
            index:5,
            type:3,
            icon:gallery_image
        }];
    let [current_page, set_current_page] = useState(0);


  return (
    <React.Fragment>
        <h1 className = "heading">Add Projects</h1>
        <FormContainer curr_page = {pages_info[current_page]} set_curr_page = {set_current_page}/>
    </React.Fragment>
  );
}

export default App;
