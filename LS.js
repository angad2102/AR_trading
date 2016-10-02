var differences[];

function add(a, b) {
    a + b;
}

function prediction(differences){
	var sum = differences.reduce(add, 0);
	return sum/sizeof(differences);
}

