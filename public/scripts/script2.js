function initMap() {
	// Update MAP_ID with custom map ID
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 22.952279,
			lng: 76.039673,
		},
		zoom: 7,
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
			"Krishi Upaj Mandi",
			22.973514,
			76.067980,
			'/image/silo.jfif',
			29,
			28,
		],
		[
			'Kisan Mandi Bichrod',
			23.361874,
			76.966186,
			'/image/silo.jfif',
			29,
			28,
		],
		[
			'M/S Sachdev Rice and Pulse Mills,',
			22.718285,
			75.845041,
			'/image/silo.jfif',
			29,
			28,
		],
		[
			'Shree Gayatri Traders',
			22.969977,
			76.049153,
			'/image/silo.jfif',
			29,
			28,
		]
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


