const app = Vue.createApp({
    data() {
      return {
        user: {
          name: '',
          age: '',
          photo: ''
        },
        weather: {
          city: 'London',
          province: 'Ontario',
          country: 'Canada'
        },
        weatherResult: {
          temperature: '',
          wind: '',
          description: ''
        },
        dictionary: {
          word: ''
        },
        definition: {
          word: '',
          phonetic: '',
          definition: ''
        }
      };
    },
  
    methods: {
      fetchUser() {
        fetch('https://comp6062.liamstewart.ca/random-user-profile')
          .then(response => response.json())
          .then(data => {
            this.user.name = data.first_name + ' ' + data.last_name;
            this.user.age = data.age;
            this.user.photo = data.profile_picture;
          });
      },
  
      fetchWeather() {
        const url = `https://comp6062.liamstewart.ca/weather-information?city=${this.weather.city}&province=${this.weather.province}&country=${this.weather.country}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.weatherResult.temperature = data.temperature;
            this.weatherResult.wind = data.wind_speed;
            this.weatherResult.description = data.weather_description;
          });
      },
  
      fetchDefinition() {
        const url = `https://comp6062.liamstewart.ca/define?word=${this.dictionary.word}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              this.definition.word = data[0].word;
              this.definition.phonetic = data[0].phonetic;
              this.definition.definition = data[0].definition;
            } else {
              this.definition.word = this.dictionary.word;
              this.definition.phonetic = 'N/A';
              this.definition.definition = 'No definition found.';
            }
          });
      }
    },
  
    created() {
      this.fetchUser();
      this.fetchWeather();
    }
  });
  
  app.mount('#app');
  