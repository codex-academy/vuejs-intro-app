// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
let regNumberApp = new Vue({

    el: '.regNumberApp',
    data: {
        regNumbers: [],
        regNumber: '',
        towns: []
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
                        alert('ooops something went wrong!');
                        console.log(result.data.error);
                    }
                });

            // if (this.regNumber !== '') {
            //     this.regNumbers.push(this.regNumber);
            //     this.regNumber = '';
            // }
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
                self.regNumbers = regNumbers.map(reg => reg.full_reg_number);
                //  = re;
                // );
            });
    }
});
