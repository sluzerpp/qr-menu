initialize();

async function initialize() {
  const myLatlng = new google.maps.LatLng(-34.397, 150.644);
  const myOptions = {
    zoom: 0,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  const map = new google.maps.Map(document.getElementById("address-map"), myOptions); 

  // const {Geocoder} = await google.maps.importLibrary("geocoding")

  // let marker = null;
  // let address = {
  //   city: '',
  //   address: '',
  //   country: '',
  //   postalCode: ''
  // }

  // const geocoder = new Geocoder();

  // geocoder.geocode({address: 'Пинск, 2-я северная 18-а'}, (res) => {
  //   console.log(res)
  // })
}


