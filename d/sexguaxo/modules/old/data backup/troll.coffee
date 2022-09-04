# Getting Data

config = "artists/troll"

albumModel1 = { 
	title: "Emotional 8"
	year: "2014"
	
	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
	
	image: config + "/albums/0.jpg"
	tintColor: "grey"
	source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
}

albumModel2 = { 
	title: "May 13"
	year: "2014"
	
	songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice",  "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix", "Nevsky Pr", "Bloody Waters", "Knock out"]
	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45", "3:08", "3:08", "3:08"]
	
	image: config + "/albums/1.jpg"
	tintColor: "white"
	source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
}

albumModel3 = { 
	title: "Emotional 8"
	year: "2014"
	
	songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"]
	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"]
	
	image: config + "/albums/2.jpg"
	tintColor: "grey"
	source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
}





exports.albumsData = [albumModel1, albumModel2, albumModel3]
exports.favList = { 	
	songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice",  "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix"]
	source: ["1.m4a", "2.m4a", "1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
	
	time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45"]
	albums: [0, 1, 2, 0, 0, 1, 2, 2, 1, 0]
}


