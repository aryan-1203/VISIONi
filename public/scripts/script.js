function initMap() {
	// Update MAP_ID with custom map ID
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 22.952279,
			lng: 76.039673,
		},
		zoom: 13,
		mapId: 'b2c293e7b7d8dc17',
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
	});

	// Name
	// Latitude, Longitude
	// Image URL
	// scaledSize width, height
	const markers = [
		[
			"Guru Kripa Traders",
			22.963604,
			76.034518,
			'/image/farmer.svg',
			29,
			28,
		],
		[
			'Dewas Agro Sales',
			22.974079,
			76.055773,
			'/image/farmer.svg',
			29,
			28,
		],
		[
			'Rajesh Agro Sales',
			22.989242,
			76.082957,
			'/image/farmer.svg',
			29,
			28,
		],
		[
			'Shree Gayatri Traders',
			22.981404,
			76.036018,
			'/image/farmer.svg',
			29,
			28,
		],
		[
			'SAnkit Agro Sales',
			22.965921,
			76.058218,
			'/image/farmer.svg',
			29,
			28,
		],
	];

	for (let i = 0; i < markers.length; i++) {
		const currMarker = markers[i];
		
		const marker = new google.maps.Marker({
			position: { lat: currMarker[1], lng: currMarker[2] },
			map,
			title: currMarker[0],
			icon: {
				url: currMarker[3],
				scaledSize: new google.maps.Size(currMarker[4], currMarker[5]),
			},
			animation: google.maps.Animation.DROP,
		});

		const infowindow = new google.maps.InfoWindow({
			content: currMarker[0],
		});

		marker.addListener('click', () => {
			infowindow.open(map, marker);
		});
	}
}


