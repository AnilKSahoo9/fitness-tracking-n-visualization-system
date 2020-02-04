const btns = document.querySelectorAll('button');
const form = document.querySelector('form');
const formAct = document.querySelector('form span');
const input = document.querySelector('input');
const error = document.querySelector('.error');

var activity = 'cycling';//as default activity is cycling,,whenever we click on a button,that activity variable is updated eith the dataset activity value

btns.forEach(btn => {

	btn.addEventListener('click', e => {

      //get activity,,means the button contains which activity,,e is event parametre
	  activity = e.target.dataset.activity;//as we've used data keyword in html ,,see so used dataset prop

	  //remove nd add active class
	  btns.forEach(btn => btn.classList.remove('active'));

	  //apply active class to the button we clicked on
	  e.target.classList.add('active');

     //set id of i/p field
	  input.setAttribute('id',activity);

    //set text of form span
	  formAct.textContent = activity;

	// call the update function
    update(data);

	})
});
//form submit
form.addEventListener('submit' , e => {
	//prevent default action or afer submit,reloading of page
	e.preventDefault();

	//get the distance that user has typed in
    //value prop returns the value of i/p typed in
	const distance = parseInt(input.value);

	//has someone typed in the distance field ?
	//if yes,create a collec act in the db for storing
	//the object has prop of distance,act and date
	if(distance){
		db.collection('activities').add({
			distance,
			activity,
			date: new Date().toString()
		}).then(() => {
			error.textContent = '';
			input.value = '';//reset i/p n error value
		}).catch(err => console.log(err));
	} else {
		error.textContent = 'please enter a valid distance'
	}
});

