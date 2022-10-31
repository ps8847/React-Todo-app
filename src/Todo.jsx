import React , {useState , useEffect} from 'react'
import Logo from './Logo.png';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';


// to get the data fom local storage

const getLocalItems = () => {
	let list = localStorage.getItem('lists');
	
	if(list){
		return JSON.parse(localStorage.getItem('lists'));
	} else {
		return [];
	}
}
const Todo = () => {
	const [inputData , setInputData] = useState("");
	const [items, setItems] = useState(getLocalItems());
	const [toggleSubmit , setToggleSubmit] = useState(true);
	const [isEditItem, setIsEditItem] = useState(null);

	const addItem = () => {
		if(!inputData){
			alert("please fill the data");
		}else if(inputData && !toggleSubmit){
			setItems(items.map((element) => {
					if(element.id === isEditItem){
						return {...element , name:inputData};
					}
					return element;
				})
			)
			setToggleSubmit(true);
			setInputData('');
			setIsEditItem(null);
		}else{
			const allInputData = { id : new Date().getTime().toString() , name : inputData}
			setItems([...items, allInputData]);
			setInputData('');
		}
	}

	const deleteItem = (index) =>{
		const updatedItems = items.filter((element) => {
			return index !== element.id;
		})
		setItems(updatedItems);
	}

	/* 
	when user click on edit button 

	1. get the id and name of the data which user clicked to edit
	2. set the toggle node to change the submit button into edit button
	3. now update the value of the setInput with the new updated value to edit
	4. to pass the current elemeent id to new state variable for reference

	*/
	const editItem = (id) => {
		let newEditItem = items.find((element) => {
			return element.id === id
		})
		setToggleSubmit(false);
		setInputData(newEditItem.name);
		setIsEditItem(id);

	}

	const removeAll = () => {
		setItems([]);
	}

	//add data data to localstorage
	useEffect(() => {
		localStorage.setItem('lists' , JSON.stringify(items))
	} , [items]);
	
  return (
	<>
	<div className="main-div">
		<div className="child-div">
		
			<figure>
				<img src={Logo} alt="logo" />
				<figcaption>Add your List Here</figcaption>
			</figure>

			<div className="addItems">
				<input type="text" placeholder="Add items...." value={inputData} onChange={(e) => {
					setInputData(e.target.value);
				}}/>
				{
					toggleSubmit ? <AddIcon className="fa fa-plus" title="Add Items" onClick={addItem}/> : <EditIcon className="fa fa-edit " title="Update Items" onClick={addItem}/>
				}
				
			</div>

			<div className="showItems">

				{
					items.map((element) => {
						return <div className="eachItem" key={element.id}>
							<h3>{element.name}</h3>

							<div className="todo-btn">
							<EditIcon className="fa fa-edit " title="Edit Items" onClick={() => editItem(element.id)}/>

							<DeleteIcon className="fa fa-trash-alt" title="Remove Items" onClick={() => deleteItem(element.id)}/>
							</div>
							</div>
					})
				}
			</div>

			<div className="showItems">
				<button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>  <span> CHECK LIST </span></button>
			</div>
		</div>
	</div>
	</>
  )
}

export default Todo