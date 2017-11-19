const app = new Clarifai.App({
 apiKey: 'c83b44da75bd4efbb7c9758c6b1ad4a7'
});

var foods = "Apples,Bananas,Berries,Grapes,Lemons,Lime,Melons,Nectarines,Oranges,Peaches,Pears,Plums,Strawberries,Watermelon,Asparagus,Broccoli,Cabbage,Carrots,Cauliflower,Celery,Corn,Garlic,Lettuce,Mushrooms,Onions,Peppers,Potato,Squash,Sweet-Potato,Tomatoes,Zucchini,Canned-Fruits,Cherries,Mixed-Fruit,Pineapples,Canned-Asparagus,Canned-Carrots,Canned-Corn,Canned-Greenbeans,Canned-Peas,Canned-Potatoes,Canned-Tomatoes,Baked-Beans,Butter-Beans,Green-Beans,Kidney-Beans,Pinto-Beans,PorkNBeans,String-Beans,Dinners,French-Fries,Ice-Cream,Mixed-Vegetables,Peas,Pizza,Tater-Tots,Ground-Beef,Hamburger,Roast-Beef,Steaks,Boneless-Breast,Breast-with-Bone,Legs,Whole-Chicken,Chicken-Wings,Ham,Smoked-Turkey,Turkey,Bacon,Chops,Roast,Sausage,Crabmeat,Fish,Scallops,Shrimp,Chicken,Corned-Beef,Salmon,Tuna,Vienna-Sausage,Celery-Salt,Cinnamon,Garlic-Powder,Garlic-Salt,Ginger,Nutmeg,Onion-Powder,Oregano,Paprika,Parsley,Pepper,Salt,BBQ-Sauce,Honey,Horseradish,Jelly,Ketchup,Mayonnaise,Mustard,Peanut-Butter,Salsa,Soy-Sauce,Syrup,Worcestershire,Cooking-Spray,Olive-Oil,Vegetable-Oil,Blue-Cheese,French,Italian,Ranch,Thousand-Island,Candy,Cookies,Crackers,Nuts,Popcorn,Potato-Chips,Pretzels,Raisins,Chicken-and-Rice,Chicken-Noodle,Cream-of-Broccoli,Cream-of-Celery,Cream-of-Chicken,Cream-of-Mushroom,Tomato,Vegetable,Beef,Vegetable-Chicken,Biscuits,Buns,Hot-Dog,Rolls,Wheat,White,Coffee,Juice,Milk,Orange-Juice,Soft-Drinks,Sports-Drinks,Tea,Water,Butter,Cheese,Cottage-Cheese,Cream-Cheese,Creamer,Eggs,Margarine,Sliced-Cheese,Sour-Cream,Yogurt,Spaghetti-Sauce,Tomato-Paste,Tomato-Sauce,Angel-Hair-Pasta,Elbow-Macaroni,Lasagne-Pasta,Rotelle-Pasta,Shells-Pasta,Spaghetti-Pasta,Vemicelli-Pasta,Green-Chili,Refried-Beans,Spanish-Rice,Tacos,Tortillias-Corn,Tortillias-Flour,Baking-Powder,Baking-Soda,Brown-Sugar,Brownie-Mix,Cake-Mix,Cereal,Cocoa,Cornstarch,Flour,Jello,Oatmeal,Pancake-Mix,Rice,Sugar,Vanilla-Extract".split(",");

var foodSearch = Wade(foods);

var pantry = [];

$("#ingredientInput").on("keyup", inputEventReactor);
//$("#ingredientInput").on("keyup", inputEventReactor);

function inputEventReactor(e){
	var $input = $(this);
	$("#searchList").empty();
	$("#searchList").text("");
	if($input.val() !== ""){
		var found = foodSearch($input.val());
		found.forEach(function(item, idx){
			$("#searchList").append(`
				<li><button onclick="addToPantry('${foods[item.index]}')">${foods[item.index]}</button></li>
			`);
		});
	} else {
		
	}
}

$("#searchButton").click(function(e){
	//search($("#ingredientInput").val());
});

function addToPantry(name){
	pantry.push(name);
	updatePantry();
}

function removeFromPantry(index){
	pantry.splice(index, 1);
	updatePantry();
}

function updatePantry(){
	$("#pantryList").empty();
	$("#pantryList").text("");
	pantry.forEach(function(item, idx){
		$("#pantryList").append(`
			<li><button onclick="removeFromPantry(${idx})">${item}</button></li>
		`);
	});
}

function search(value){
	var query = encodeURIComponent(value);
	var link = `http://food2fork.com/api/search?key=3f3c858614ae5380ddb4f5acff63b224&q=${query}`;
	var $button = $(this);
	$button.attr("disabled", "");
	fetch(`http://streamlyne.stream:88/proxy?link=${encodeURIComponent(link)}`).then(function(raw){
		return raw.json();
	}).then(function(json){
		console.log(json);
		$button.removeAttr("disabled");
		$("#recipeList").empty();
		json.recipes.forEach(function(item, idx){
			$("#recipeList").append(`
				<li><a href="${item.source_url}">${item.title}</a></li>
			`);
		});
	});
}

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
	function(response) {
		console.log(response);
	},
	function(err) {
		console.error(err);
	}
);