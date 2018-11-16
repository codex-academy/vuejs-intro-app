// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
let regNumberApp = new Vue({

    el: '.regNumberApp',
    data: {
        regNumbers: [],
        regNumber: '',
        towns: [],
        error: ''
    },
    methods: {
        addRegNumber: function () {
            var self = this;
            axios
                .post('/api/reg_number', { reg_number: this.regNumber })
                .then(function (result) {
                    if (result.data.status === 'success') {
                        // alert('that worked');
                        self.regNumbers.push(self.regNumber);
                        self.regNumber = '';
                    } else {
                        // alert('ooops something went wrong!');
                        // console.log(result.data.error);
                        self.error = result.data.error;
                    }
                });
        }
    },

    mounted: function () {
        let self = this;
        axios
            .get('/api/towns')
            .then(function (results) {
                self.towns = results.data;
            });
        axios
            .get('/api/reg_numbers')
            .then(function (results) {
                let regNumbers = results.data;
                // convert the list of objects into a list of strings.
                self.regNumbers = regNumbers.map(function (reg) {
                    return reg.full_reg_number;
                });
            });
    }
});
